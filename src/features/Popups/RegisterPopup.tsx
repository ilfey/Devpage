import { useCallback, useEffect, useState } from 'react'
import ActionButton from '../../shared/Buttons/ActionButton'
import { useRegisterMutation } from '../../store/api/users.api'
import TextButton from '../../shared/Buttons/TextButton'
import TextField from '../../shared/TextField'
import { useInput } from '../../hooks/useInput'

interface IProps {
  onLogin: () => void
  onLoading: (isLoading: boolean) => void
}

export default function RegisterPopup({ onLogin, onLoading }: IProps) {
  const [errorMessage, setErrorMessage] = useState('')

  const username = useInput('')
  const password = useInput('')
  const confirm = useInput('')

  const [register, result] = useRegisterMutation()

  useEffect(() => {
    onLoading(result.isLoading)
  }, [result.isLoading])

  const onClickRegister = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      // if entries is empty
      if (username.value.trim().length === 0 || password.value.trim().length === 0 || confirm.value.trim().length === 0) {
        setErrorMessage("Вы ввели не все данные необходимые для создания учетной записи")
        return
      }

      // if passwords is not confirm
      if (password.value !== confirm.value) {
        setErrorMessage("Пароли не совпадают")
        return
      }

      onLoading(true)

      register({
        username: username.value,
        password: password.value,
      })
        .then(res => {
          if ("error" in res) {
            setErrorMessage("Не удалось создать в учетную запись")
            return
          }

          // start login popup
          onLogin()
        })
    },
    [register, password, confirm, username],
  )

  return (
    <div className="rounded-xl p-8 bg-gray-300 dark:bg-gray-900">
      <form className="" action="#register" onSubmit={onClickRegister}>
        <label className="block">Логин</label>
        <TextField
          placeholder='Логин'
          type='text'
          onChange={username.onChange}
        />

        <label className="mt-4 block">Пароль</label>
        <TextField
          placeholder='Пароль'
          type='password'
          onChange={password.onChange}
        />

        <label className="mt-4 block">Повторите пароль</label>
        <TextField
          placeholder='Повторите пароль'
          type='password'
          onChange={confirm.onChange}
        />


        {errorMessage !== '' && (
          <p className="text-red-600 text-center mt-4">
            {errorMessage}
          </p>
        )}

        <ActionButton
          className="mt-6 mx-auto"
          text="Зарегистрироваться"
          type="submit"
        />
      </form>

      <TextButton
        className="mt-6 mx-auto text-sm select-none"
        text="Уже есть аккаунт"
        onClick={onLogin}
      />
    </div>
  )
}

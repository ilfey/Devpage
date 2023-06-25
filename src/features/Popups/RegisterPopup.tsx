import { useCallback, useEffect, useState } from 'react'
import ActionButton from '../../shared/Buttons/ActionButton'
import { useRegisterMutation } from '../../store/api/users.api'
import TextButton from '../../shared/Buttons/TextButton'
import TextField from '../../shared/TextField'

interface IProps {
  onLogin: () => void
  onLoading: (isLoading: boolean) => void
}

export default function RegisterPopup({ onLogin, onLoading }: IProps) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')


  const [register, registerResult] = useRegisterMutation()

  useEffect(() => {
    onLoading(registerResult.isLoading)
  }, [registerResult.isLoading])


  useEffect(() => {
    return () => {
      setUsername('')
      setPassword('')
      setConfirmPassword('')
      onLoading(false)
    }
  }, [])


  const onClickRegister = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      // if entries is empty
      if (username.trim().length === 0 || password.trim().length === 0 || confirmPassword.trim().length === 0) {
        setErrorMessage("Вы ввели не все данные необходимые для создания учетной записи")
        return
      }

      // if passwords is not confirm
      if (password !== confirmPassword) {
        setErrorMessage("Пароли не совпадают")
        return
      }

      onLoading(true)

      register({
        username,
        password,
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
    [register, password, confirmPassword, username],
  )

  let errorContent = (
    <></>
  )

  if (errorMessage !== '') {
    errorContent = (
      <p className="text-red-600 text-center mt-4">
        {errorMessage}
      </p>
    )
  }

  return (
    <div className="rounded-xl p-8 bg-gray-300 dark:bg-gray-900">
      <form className="" action="#register" onSubmit={onClickRegister}>
        <label className="block">Логин</label>
        <TextField
          placeholder='Логин'
          type='text'
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="mt-4 block">Пароль</label>
        <TextField
          placeholder='Пароль'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="mt-4 block">Повторите пароль</label>
        <TextField
          placeholder='Повторите пароль'
          type='password'
          onChange={(e) => setConfirmPassword(e.target.value)}
        />


        {errorContent}

        <ActionButton
          className="mt-6 mx-auto"
          content="Зарегистрироваться"
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

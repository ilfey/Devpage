import { FormEvent, useEffect, useState } from 'react'
import TextButton from '../../shared/Buttons/TextButton'
import { useLoginMutation } from '../../store/api/users.api'
import { saveUsername } from '../../sessionStorage'
import { setToken } from '../../coockie'
import ActionButton from '../../shared/Buttons/ActionButton'
import TextField from '../../shared/TextField'
import { useInput } from '../../hooks/useInput'

interface IProps {
  onRegister: () => void
  onClose: () => void
  onLoading: (isLoading: boolean) => void
}

export default function LoginPopup({ onRegister, onClose, onLoading }: IProps) {
  const [errorMessage, setErrorMessage] = useState('')

  const username = useInput('')
  const password = useInput('')

  const [login, result] = useLoginMutation()


  useEffect(() => {
    onLoading(result.isLoading)
  }, [result.isLoading])

  function onLogin
    (e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // if entries is empty
    if (username.value.trim().length === 0 || password.value.trim().length === 0) {
      setErrorMessage("Вы ввели не все данные, необходимые для входа в учетную запись")
      return
    }

    onLoading(true)

    login({
      username: username.value,
      password: password.value
    })
      .then((res) => {
        if ("error" in res) {
          setErrorMessage("Не удалось войти в учетную запись")
          return
        }

        setToken(res.data.token)
        saveUsername(username.value)
        onClose()
      })
  }

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
      <form className="" action="#login" onSubmit={onLogin}>

        <label className="block">Логин</label>
        <TextField
          placeholder='Логин'
          type='text'
          onChange={username.onChange}
        />

        <label className="mt-4 block" >Пароль</label>
        <TextField
          placeholder='Пароль'
          type='password'
          onChange={password.onChange}
        />

        {errorContent}

        <ActionButton
          className="mt-6 mx-auto"
          text="Войти"
          type="submit"
        />
      </form>

      <TextButton
        className="mt-6 mx-auto text-sm  select-none"
        text="Ещё нет аккаунта"
        onClick={onRegister}
      />

    </div>
  )
}
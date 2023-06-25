import { FormEvent, useEffect, useState } from 'react'
import TextButton from '../../shared/Buttons/TextButton'
import { useLoginMutation } from '../../store/api/users.api'
import { saveUsername } from '../../sessionStorage'
import { setToken } from '../../coockie'
import ActionButton from '../../shared/Buttons/ActionButton'
import TextField from '../../shared/TextField'

interface IProps {
  onRegister: () => void
  onClose: () => void
  onLoading: (isLoading: boolean) => void
}

export default function LoginPopup({ onRegister, onClose, onLoading }: IProps) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const [login, loginResult] = useLoginMutation()


  useEffect(() => {
    onLoading(loginResult.isLoading)
  }, [loginResult.isLoading])


  useEffect(() => {
    return () => {
      setUsername('')
      setPassword('')
      onLoading(false)
    }
  }, [])


  function onLogin
    (e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // if entries is empty
    if (username.trim().length === 0 || password.trim().length === 0) {
      setErrorMessage("Вы ввели не все данные, необходимые для входа в учетную запись")
      return
    }

    onLoading(true)

    login({
      username,
      password
    })
      .then((res) => {
        if ("error" in res) {
          setErrorMessage("Не удалось войти в учетную запись")
          return
        }

        setToken(res.data.token)
        saveUsername(username)
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
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="mt-4 block" >Пароль</label>
        <TextField
          placeholder='Пароль'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />

        {errorContent}

        <ActionButton
          className="mt-6 mx-auto"
          content="Войти"
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
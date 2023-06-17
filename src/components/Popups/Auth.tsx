import { FormEvent, useCallback, useEffect, useState } from "react";
import Popup from "../Popup";
import { setToken } from "../../coockie";
import { saveUsername } from "../../sessionStorage";
import ActionButton from "../buttons/ActionButton";
import TextButton from "../buttons/TextButton";
import Spinner from "../Spinner";
import { useLoginMutation, useRegisterMutation } from "../../store/api/users.api";

export interface LoginPopupProps {
  show?: boolean,
  onClose: () => void,
}

enum State {
  Login,
  Register,
}

enum ErrorState {
  LoginError,
  RegisterError,
  RegisterConfirm,
  EmptyEntry,
}

export default function AuthPopup({ show, onClose }: LoginPopupProps) {
  const [state, setState] = useState(State.Login)
  const [errorState, setErrorState] = useState<ErrorState | null>(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [login, loginResult] = useLoginMutation()
  const [register, registerResult] = useRegisterMutation()

  const isLoading = loginResult.isLoading || registerResult.isLoading

  useEffect(() => {
    setErrorState(null)
  }, [state])

  function clearStates() {
    setState(State.Login)
    setErrorState(null)
    setUsername('')
    setPassword('')
    setConfirmPassword('')
  }

  const _onClose = useCallback(() => {
    clearStates()
    onClose()
  }, [onClose])

  const onClickLogin = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      // if entries is empty
      if (username.trim().length === 0 || password.trim().length === 0) {
        setErrorState(ErrorState.EmptyEntry)
        return
      }

      login({
        username,
        password
      })
        .then((res) => {
          if ("error" in res) {
            setErrorState(ErrorState.LoginError)
            return
          } else {
            setToken(res.data.token)
            saveUsername(username)
            _onClose()
          }

        })

    },
    [_onClose, login, password, username],
  )

  const onClickRegister = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      // if entries is empty
      if (username.trim().length === 0 || password.trim().length === 0 || confirmPassword.trim().length === 0) {
        setErrorState(ErrorState.EmptyEntry)
        return
      }

      // if passwords is not confirm
      if (password !== confirmPassword) {
        setErrorState(ErrorState.RegisterConfirm)
        return
      }

      register({
        username,
        password,
      })
        .then(res => {
          if ("error" in res) {
            setErrorState(ErrorState.RegisterError)
            return
          }

          clearStates()
        })
    },
    [register, password, confirmPassword, username],
  )

  function handleLoginErrorText(e: ErrorState): string {
    switch (e) {
      case ErrorState.EmptyEntry:
        return "Вы ввели не все данные, необходимые для входа в учетную запись"

      default:
        return "Не удалось войти в учетную запись"
    }
  }

  function handleRegisterErrorText(e: ErrorState): string {
    switch (e) {
      case ErrorState.EmptyEntry:
        return "Вы ввели не все данные необходимые для создания учетной записи"

      case ErrorState.RegisterConfirm:
        return "Пароли не совпадают"

      default:
        return "Не удалось создать в учетную запись"
    }
  }

  function renderContent() {

    if (isLoading) {
      return <Spinner className="mx-auto" />
    }

    if (state === State.Login) {
      return <>
        <div className="rounded-xl p-8 bg-gray-300 dark:bg-gray-900">
          <form className="" action="#login" onSubmit={onClickLogin}>
            <label className="block">Логин</label>
            <input className="mt-3 rounded-lg px-4 py-3 w-full outline-none border-none bg-gray-200 dark:bg-gray-800 placeholder:text-gray-600 text-sm"
              type="text"
              placeholder="Логин"
              onChange={(e) => setUsername(e.target.value)}
            />

            <label className="mt-4 block" >Пароль</label>
            <input className="mt-3 rounded-lg px-4 py-3 w-full outline-none border-none bg-gray-200 dark:bg-gray-800 placeholder:text-gray-600 text-sm"
              type="password"
              placeholder="Пароль"
              onChange={(e) => setPassword(e.target.value)}
            />

            {errorState !== null &&
              <p className="text-red-600 text-center mt-4">{handleLoginErrorText(errorState)}</p>
            }

            <ActionButton
              className="mt-6 mx-auto"
              content="Войти"
              type="submit"
            />
          </form>

          <TextButton
            className="mt-6 mx-auto text-sm  select-none"
            text="Ещё нет аккаунта"
            onClick={() => setState(State.Register)}
          />

        </div>
      </>
    }

    return <div className="rounded-xl p-8 bg-gray-300 dark:bg-gray-900">
      <form className="" action="#register" onSubmit={onClickRegister}>
        <label className="block">Логин</label>
        <input className="mt-3 rounded-lg px-4 py-3 w-full outline-none border-none bg-gray-200 dark:bg-gray-800 placeholder:text-gray-600 text-sm"
          type="text"
          placeholder="Логин"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="mt-4 block">Пароль</label>
        <input className="mt-3 rounded-lg px-4 py-3 w-full outline-none border-none bg-gray-200 dark:bg-gray-800 placeholder:text-gray-600 text-sm"
          type="password"
          placeholder="Пароль"
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="mt-4 block">Повторите пароль</label>
        <input className="mt-3 rounded-lg px-4 py-3 w-full outline-none border-none bg-gray-200 dark:bg-gray-800 placeholder:text-gray-600 text-sm"
          type="password"
          placeholder="Повторите пароль"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />


        {errorState &&
          <p className="text-red-600 text-center mt-4">{handleRegisterErrorText(errorState)}</p>
        }

        <ActionButton
          className="mt-6 mx-auto"
          content="Зарегистрироваться"
          type="submit"
        />
      </form>

      <TextButton
        className="mt-6 mx-auto text-sm select-none"
        text="Уже есть аккаунт"
        onClick={() => setState(State.Login)}
      />
    </div>

  }

  return (
    <Popup show={show} onClose={_onClose}>

      {renderContent()}

    </Popup>
  );
}
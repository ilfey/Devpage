import { FormEvent, useCallback, useEffect, useState } from "react";
import Popup from "../Popup";
import { postLogin, postRegister } from "../../api";
import { setToken } from "../../coockie";
import { saveUsername } from "../../sessionStorage";
import ActionButton from "../buttons/ActionButton";
import TextButton from "../buttons/TextButton";
import Spinner from "../Spinner";

export interface LoginPopupProps {
  show?: boolean,
  onClose: () => void,
}

interface LoginData {
  token: string,
}

enum State {
  Loading,
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

  const login = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      // if entries is empty
      if (username.trim().length === 0 || password.trim().length === 0) {
        setErrorState(ErrorState.EmptyEntry)
        return
      }

      setState(State.Loading)

      postLogin(username, password)
        .then(res => {
          setToken((res.data as LoginData).token)
          saveUsername(username)
          _onClose()
        })
        .catch(() => setErrorState(ErrorState.LoginError))
        .finally(() => setState(State.Login))

    },
    [_onClose, password, username],
  )

  const register = useCallback(
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

      setState(State.Loading)

      postRegister(username, password)
        .then(() => clearStates())
        .catch(() => setErrorState(ErrorState.RegisterError))
        .finally(() => setState(State.Register))

    },
    [password, confirmPassword, username],
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

  return (
    <Popup show={show} onClose={_onClose}>

      {/* loader */}

      {state === State.Loading &&
        <Spinner className="mx-auto" />
      }

      {/* Login */}

      {state === State.Login &&
        <div className="rounded-xl p-8 bg-gray-300 dark:bg-gray-900">
          <form className="" action="#login" onSubmit={login}>
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
      }

      {/* Register */}

      {state === State.Register &&
        <div className="rounded-xl p-8 bg-gray-300 dark:bg-gray-900">
          <form className="" action="#register" onSubmit={register}>
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
    </Popup>
  );
}
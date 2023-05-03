import { useCallback, useState } from "react";
import Popup from "../Popup";
import { postLogin, postRegister } from "../../api";
import { setToken } from "../../coockie";
import { saveUsername } from "../../storage";
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
  LoginError,
  RegisterError,
  Login,
  Register,
  Completed,
}

export default function AuthPopup({ show, onClose }: LoginPopupProps) {
  const [state, setState] = useState(State.Login)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const login = useCallback(
    () => {
      setState(State.Loading)
      postLogin(username, password)
        .then(res => {
          setToken((res.data as LoginData).token)
          saveUsername(username)
          onClose()
          setState(State.Completed)
        })
        .catch(() => {
          setState(State.LoginError)
        })
        .finally(() => {
          setTimeout(() => {
            onClose()
          }, 2000)
        })
    },
    [onClose, password, username],
  )

  const register = useCallback(
    () => {
      if (password !== confirmPassword) {
        setState(State.RegisterError)
        return
      }

      setState(State.Loading)

      postRegister(username, password)
        .then(() => {
          onClose()
        })
        .catch(() => {
          setState(State.RegisterError)
        })
        .finally(() => {
          setState(State.Completed)
          setTimeout(() => {
            onClose()
          }, 2000)
        })
    },
    [onClose, password, confirmPassword, username],
  )

  return (
    <Popup show={show} onClose={onClose}>
      {state === State.LoginError &&
        <p>Не удалось войти в аккаунт</p>
      }

      {state === State.RegisterError &&
        <p>Не удалось зарегистрировать аккаунт</p>
      }

      {state === State.Login &&
        <div className="rounded-xl p-8 bg-gray-900">
          <form className="" action="#login" onSubmit={login}>
            <label className="block" htmlFor="login">Логин</label>
            <input className="mt-3 rounded-lg px-4 py-3 w-full outline-none border-none bg-gray-800 placeholder:text-gray-600 text-sm"
              type="text"
              name="login"
              placeholder="Логин"
              required
              onChange={(e) => { setUsername(e.target.value) }}
            />

            <label className="mt-4 block" htmlFor="password">Пароль</label>
            <input className="mt-3 rounded-lg px-4 py-3 w-full outline-none border-none bg-gray-800 placeholder:text-gray-600 text-sm"
              type="password"
              placeholder="Пароль"
              name="password"
              required
              onChange={(e) => { setPassword(e.target.value) }}
            />
            <ActionButton
              className="mt-6 mx-auto"
              text="Войти"
              onClick={login}
            />
          </form>

          <TextButton
            className="mt-6 mx-auto text-sm"
            text="Ещё нет аккаунта"
            onClick={() => setState(State.Register)}
          />

        </div>
      }

      {state === State.Register &&
        <div className="rounded-xl p-8 bg-gray-900">
          <form className="" action="#register" onSubmit={register}>
            <label className="block" htmlFor="login">Логин</label>
            <input className="mt-3 rounded-lg px-4 py-3 w-full outline-none border-none bg-gray-800 placeholder:text-gray-600 text-sm"
              type="text"
              placeholder="Логин"
              name="login"
              required
              onChange={(e) => { setUsername(e.target.value) }}
            />

            <label className="mt-4 block" htmlFor="password">Пароль</label>
            <input className="mt-3 rounded-lg px-4 py-3 w-full outline-none border-none bg-gray-800 placeholder:text-gray-600 text-sm"
              type="password"
              placeholder="Пароль"
              name="password"
              required
              onChange={(e) => { setPassword(e.target.value) }}
            />

            <label className="mt-4 block" htmlFor="confirm-password">Повторите пароль</label>
            <input className="mt-3 rounded-lg px-4 py-3 w-full outline-none border-none bg-gray-800 placeholder:text-gray-600 text-sm"
              type="password"
              name="confirm-password"
              placeholder="Повторите пароль"
              required
              onChange={(e) => { setConfirmPassword(e.target.value) }}
            />

            <ActionButton
              className="mt-6 mx-auto"
              text="Войти"
              onClick={register}
            />
          </form>

          <TextButton
            className="mt-6 mx-auto text-sm"
            text="Уже есть аккаунт"
            onClick={() => setState(State.Login)}
          />
        </div>
      }

      {state === State.Loading &&
        <Spinner className="mx-auto" />
      }

    </Popup>
  );
}
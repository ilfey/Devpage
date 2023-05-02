import { useCallback, useState } from "react";
import Popup from "../Popup";
import SVG from "react-inlinesvg";
import { postLogin, postRegister } from "../../api";
import { Spinner } from "../../Icons";
import { setToken } from "../../coockie";
import { saveUsername } from "../../storage";

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
        <>
          <form className="form form-auth" action="#login" onSubmit={login}>
            <input className="form__entry" type="text" placeholder="Логин" required onChange={(e) => { setUsername(e.target.value) }} />
            <input className="form__entry" type="password" placeholder="Пароль" required onChange={(e) => { setPassword(e.target.value) }} />
            <button className="form__button" type="submit">Войти</button>
          </form>
          <button className="text-button" onClick={() => { setState(State.Register) }} >Зарегистрироваться</button>
        </>
      }

      {state === State.Register &&
        <>
          <form className="form form-auth" action="#register" onSubmit={register}>
            <input className="form__entry" type="text" placeholder="Логин" required onChange={(e) => { setUsername(e.target.value) }} />
            <input className="form__entry" type="password" placeholder="Пароль" required onChange={(e) => { setPassword(e.target.value) }} />
            <input className="form__entry" type="password" placeholder="Повторите пароль" required onChange={(e) => { setConfirmPassword(e.target.value) }} />
            <button className="form__button" type="submit">Зарегистрироваться</button>
          </form>
          <button className="text-button" onClick={() => { setState(State.Login) }} >Уже есть аккаунт</button>
        </>
      }

      {state === State.Loading &&
        <SVG src={Spinner}></SVG>
      }

    </Popup>
  );
}
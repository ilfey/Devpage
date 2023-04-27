import { useCallback, useState } from "react";
import Popup from "../Popup";
import SVG from "react-inlinesvg";
import { API } from "../../api";
import { Spinner } from "../../Icons";
import { setToken } from "../../coockie";

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

export default function LoginPopup({ show, onClose }: LoginPopupProps) {
  const [state, setState] = useState(State.Login)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const login = useCallback(
    () => {
      setState(State.Loading)
      API.post("/user/login", {
        username,
        password,
      })
        .then(res => {
          setToken((res.data as LoginData).token)
          onClose()
        })
        .catch(() => {
          setState(State.LoginError)
        })
        .finally(() => {
          setState(State.Completed)
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

      API.post("/user/register", {
        username,
        password,
      })
        .then(res => {
          setToken((res.data as LoginData).token)
          onClose()
        })
        .catch(() => {
          setState(State.LoginError)
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
          <form className="form form-auth" action="#login">
            <input className="form__entry" type="text" placeholder="Логин" onChange={(e) => { setUsername(e.target.value) }} />
            <input className="form__entry" type="password" placeholder="Пароль" onChange={(e) => { setPassword(e.target.value) }} />
            <button className="form__button" type="submit" onClick={login}>Войти</button>
          </form>
          <button className="text-button" onClick={() => { setState(State.Register) }} >Зарегистрироваться</button>
        </>
      }

      {state === State.Register &&
        <>
          <form className="form form-auth" action="#register">
            <input className="form__entry" type="text" placeholder="Логин" onChange={(e) => { setUsername(e.target.value) }} />
            <input className="form__entry" type="password" placeholder="Пароль" onChange={(e) => { setPassword(e.target.value) }} />
            <input className="form__entry" type="confirm_password" placeholder="Повторите пароль" onChange={(e) => { setConfirmPassword(e.target.value) }} />
            <button className="form__button" type="submit" onClick={register}>Зарегистрироваться</button>
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
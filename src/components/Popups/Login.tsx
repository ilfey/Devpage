import { useCallback, useState } from "react";
import Popup from "../Popup";
import SVG from "react-inlinesvg";
import { API } from "../../api";
import { Spinner } from "../../Icons";

export interface LoginPopupProps {
  show?: boolean,
  onClose: () => void,
}

interface LoginData {
  token: string,
}

export default function LoginPopup({ show, onClose }: LoginPopupProps) {
  const [isLoadingError, setIsLoadingError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const submit = useCallback(
    () => {
      setIsLoading(true)
      API.post("/user/login", {
        username,
        password,
      })
        .then(res => {
          document.cookie = (res.data as LoginData).token
          onClose()
        })
        .catch(() => {
          setIsLoadingError(true)
        })
        .finally(() => {
          setIsLoading(false)
          setTimeout(() => {
            onClose()
          }, 3000)
        })
    },
    [onClose, password, username],
  )

  return (
    <Popup show={show} onClose={onClose}>
      {isLoadingError &&
        <p>Не удалось войти в аккаунт</p>
      }
      {!isLoading && !isLoadingError &&
        <form className="form form-auth" action="#login">
          <input className="form__entry" type="text" placeholder="Логин" onChange={(e) => { setUsername(e.target.value) }} />
          <input className="form__entry" type="password" placeholder="Пароль" onChange={(e) => { setPassword(e.target.value) }} />
          <button className="form__button" type="submit" onClick={submit}>Войти</button>
        </form>
      }
      {isLoading &&
        <SVG src={Spinner}></SVG>
      }

    </Popup>
  );
}
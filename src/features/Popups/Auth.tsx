import { useEffect, useState } from "react";
import Popup from "../../shared/Popup";
import Spinner from "../../shared/Spinner";
import LoginPopup from "./LoginPopup";
import RegisterPopup from "./RegisterPopup";

export interface LoginPopupProps {
  show?: boolean,
  onClose: () => void,
}

export default function AuthPopup({ show, onClose }: LoginPopupProps) {

  const [isLoading, setIsLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {
    return () => {
      setIsLogin(true)
    }
  }, [])


  let content = (
    <RegisterPopup
      onLoading={setIsLoading}
      onLogin={() => setIsLogin(true)} />
  )

  if (isLoading) {
    content = (
      <Spinner className="mx-auto" />
    )
  }

  if (isLogin) {
    content = (
      <LoginPopup
        onClose={onClose}
        onLoading={setIsLoading}
        onRegister={() => setIsLogin(false)} />
    )
  }

  return (
    <Popup
      isShow={show}
      className="w-80"
      onClose={onClose}>

      {content}

    </Popup>
  );
}
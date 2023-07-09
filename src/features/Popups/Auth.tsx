import { useState } from "react";
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

  return (
    <Popup
      isShow={show}
      className="w-80"
      onClose={onClose}>

      {isLoading && (
        <Spinner className="mx-auto" />
      )}

      {!isLoading && isLogin && (
        <LoginPopup
          onClose={onClose}
          onLoading={setIsLoading}
          onRegister={() => setIsLogin(false)} />
      )}
      {!isLoading && !isLogin && (
        <RegisterPopup
          onLoading={setIsLoading}
          onLogin={() => setIsLogin(true)} />
      )}
    </Popup>
  );
}
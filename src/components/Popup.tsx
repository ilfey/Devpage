import SVG from "react-inlinesvg";
import { X } from "../Icons";

export interface PopupProps {
  show?: boolean,
  onClose: () => void,
  children: React.ReactNode,
}


export default function Popup({ show, onClose, children }: PopupProps) {

  const close = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <>
      {show &&
        <div className="popup" onClick={close}>
          <div className="popup__content" >
            <SVG src={X} className="popup__close-button" onClick={() => onClose()} />
            {children}
          </div>
        </div>
      }
    </>
  );
}
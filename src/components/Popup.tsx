// import SVG from "react-inlinesvg";
// import { X } from "../Icons";

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
        <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-40" onClick={close}>
          <div className="w-[360px] relative" >
            {/* <SVG src={X} className="absolute -right-7 -top-7 w-5 h-5" onClick={() => onClose()} /> */}
            {children}
          </div>
        </div>
      }
    </>
  );
}
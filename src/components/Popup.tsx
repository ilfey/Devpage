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
    <div className={show ? "popup" : "popup popup-hidden"} onClick={close}>
      <div className="popup__content" >
        {children}
      </div>
    </div>
  );
}
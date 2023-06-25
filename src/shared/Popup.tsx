
export interface IProps {
  isShow: boolean
  className: string
  onClose: () => void
  children: React.ReactNode
}


export default function Popup({ isShow, className, onClose, children }: IProps) {

  const close = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isShow) {
    return (
      <></>
    )
  }

  return (
    <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-40" onClick={close}>
      <div className={`relative ${className}`} >
        {children}
      </div>
    </div>
  );
}

Popup.defaultProps = {
  isShow: false,
  className: '',
}
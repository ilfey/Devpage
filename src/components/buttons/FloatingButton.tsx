import React from 'react'
import SVG from "react-inlinesvg";

interface Props {
  icon: string,
  className: string,
  onClick: () => void,
}

export default function FloatingButton({icon, className, onClick}: Props) {
  return (
    <div className={`p-2 bg-orange-600 rounded-xl cursor-pointer ${className}`}
      id="fab-top"
      onClick={onClick}
    >
      <SVG className="w-8 h-8 text-white" src={icon} />
    </div>
  )
}

FloatingButton.defaultProps = {
  className: "",
  onClick: () => { },
}
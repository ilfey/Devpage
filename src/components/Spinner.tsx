import InlineSVG from 'react-inlinesvg/esm'
import { Spinner as SpinnerIcon } from "../Icons"

interface Props {
  className: string,
}

export default function Spinner({ className }: Props) {
  return (
    <InlineSVG className={`w-8 h-8 animate-spin text-orange-600 ${className}`} src={SpinnerIcon} />
  )
}

Spinner.defaultProps = {
  className: ""
}
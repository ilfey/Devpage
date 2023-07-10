
interface Props {
  link: string
  classList: string
}

export default function MessageImage({ link, classList }: Props) {
  return (
    <div className={`max-h-64 max-w-64 rounded-md flex flex-col overflow-hidden justify-center ${classList}`}>
      <img src={link} alt="image" />
    </div>
  )
}

MessageImage.defaultProps = {
  classList: ""
}
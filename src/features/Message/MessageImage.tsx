
interface IProps {
  link: string
  classList: string
}

export default function MessageImage({ link, classList }: IProps) {
  return (
    <div className={`max-h-[256px] max-w-[256px] rounded-md flex flex-col overflow-hidden justify-center ${classList}`}>
      <img src={link} alt="image" />
    </div>
  )
}

MessageImage.defaultProps = {
  classList: ""
}

interface Props {
  link: string
  classList: string
}

export default function MessageImage({ link, classList }: Props) {
  const handleImageError = () => {
    console.log('image load error')
  };

  return (
    <div className={`max-h-64 max-w-64 rounded-md flex flex-col overflow-hidden justify-center ${classList}`}>
      <img src={link} alt="image" onError={handleImageError}/>
    </div>
  )
}

MessageImage.defaultProps = {
  classList: ""
}
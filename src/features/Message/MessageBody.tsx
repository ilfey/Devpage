import MessageImage from './MessageImage'

//(http(s)?:\/\/.)[-a-zA-Zа-яА-Я0-9@:%._+~#=]{2,256}\.[a-zа-я]{2,6}\b([-a-zA-Zа-яА-Я0-9@:%_+.~#?&//=]*)/g
const reUrl = /(http[s]?:\/\/[^\s]+)/g


interface IProps {
  content: string
}


export default function MessageBody({ content }: IProps) {

  content = content.trim()
  const links = content.match(reUrl)

  // if content === link
  if (links?.length === 1 && links[0] === content && links[0].match(/\.(jpeg|jpg|gif|png|webp)$/) !== null) {
    return (
      <MessageImage
        link={links[0]}
        classList='mx-auto sm:mx-0'
      />
    )
  }

  // if content contains link
  if (links) {
    const uniqueLinks = Array.from(new Set(links))

    return (
      <>
        <p className="whitespace-pre-wrap overflow-hidden break-words">
          {content.split(reUrl).map((text, index) => {

            let output: string | React.ReactElement = text

            // if text is link
            if (text.match(reUrl)) {
              output = (
                <a className="text-violet-600 font-bold font-nunito"
                  key={`img-${text}-${index}`}
                  href={text}
                  target="_blank"
                  rel="noreferrer" >
                  {text}
                </a>
              )
            }

            return output
          })}
        </p>

        {/* render images */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-4">
          {uniqueLinks.map((link) =>
            link.match(/\.(jpeg|jpg|gif|png|webp|svg)$/) !== null && <MessageImage key={`img-${link}`} link={link} />
          )}
        </div>
      </>
    )
  }

  return (
    <p className="whitespace-pre-wrap overflow-hidden break-words">
      {content}
    </p>
  )
}

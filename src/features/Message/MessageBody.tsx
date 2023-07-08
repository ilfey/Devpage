import LinkTextButton from '../../shared/Buttons/LinkTextButton'
import MessageImage from './MessageImage'

//(http(s)?:\/\/.)[-a-zA-Zа-яА-Я0-9@:%._+~#=]{2,256}\.[a-zа-я]{2,6}\b([-a-zA-Zа-яА-Я0-9@:%_+.~#?&//=]*)/g
const imgRegexp = /(!\[.*\]\(http[s]?:\/\/[^\s]+\))/g
const linkRegexp = /(\[.*\]\(http[s]?:\/\/[^\s]+\))/g
const urlRegexp = /(http[s]?:\/\/[^\s]+)/g
const hrRegexp = /(\n---\n)/g
//                                           im               link                        link                    hr
const handleRegexp = /(!\[.*\]\(http[s]?:\/\/[^\s]+\))|(\[.*\]\(http[s]?:\/\/[^\s]+\))|(http[s]?:\/\/[^\s]+)|(\n---\n)/g

interface IProps {
  content: string
}


export default function MessageBody({ content }: IProps) {

  content = content.trim()
  const links = content.match(urlRegexp)

  // if content === link
  if (links?.length === 1 && links[0] === content && links[0].match(/\.(jpeg|jpg|gif|png|webp)$/) !== null) {
    return (
      <MessageImage
        key={links[0]}
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
          {content.split(handleRegexp).map((text, index) => {

            if (!text) {
              return ""
            }

            // if text is image
            if (text.match(imgRegexp)) {
              const [alt, src] = text.split('](')
              return (
                <img
                  src={src.slice(0, -1)}
                  alt={alt.substring(2)}
                  key={text} />
              )
            }
            
            // if text is link
            if (text.match(linkRegexp)) {
              const [alt, src] = text.split('](')
              return (
                <LinkTextButton
                  key={text}
                  text={alt.substring(1)}
                  url={src.slice(0, -1)}
                />
              )
            }

            // if text is url
            if (text.match(urlRegexp)) {
              return (
                <a className="text-violet-600 font-bold font-nunito"
                  key={`img-${text}-${index}`}
                  href={text}
                  target="_blank"
                  rel="noreferrer" >
                  {text}
                </a>
              )
            }

            // if text is ---
            if (text.match(hrRegexp)) {
              return (
                <hr key={Math.random()} className='my-4' />
              )
            }

            return text
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

import { ReactElement } from 'react'
import LinkTextButton from '../../shared/Buttons/LinkTextButton'
import MessageImage from './MessageImage'
import MessageCode from './MessageCode'

//(http(s)?:\/\/.)[-a-zA-Zа-яА-Я0-9@:%._+~#=]{2,256}\.[a-zа-я]{2,6}\b([-a-zA-Zа-яА-Я0-9@:%_+.~#?&//=]*)/g
const imgRegexp = /(!\[.*\]\(http[s]?:\/\/[^\s]+\))/g
const linkRegexp = /(\[.*\]\(http[s]?:\/\/[^\s]+\))/g
const urlRegexp = /(http[s]?:\/\/[^\s]+)/g
const codeRegexp = /```.+```/s
const imgUrlRegexp = /(?<!\]\()http[s]?:\/\/[^\s]+\.(png|jpeg|jpg|gif|webp)/g
const hrRegexp = /(\n---\n)/g

//                                           im               link                        link                    hr     code
const handleRegexp = /(!\[.*\]\(http[s]?:\/\/[^\s]+\))|(\[.*\]\(http[s]?:\/\/[^\s]+\))|(http[s]?:\/\/[^\s]+)|(\n---\n)|(```.+```)/g

interface Props {
  content: string
}


export default function MessageBody({ content }: Props) {

  content = content.trim()
  const links = content.match(urlRegexp)

  // if content === link
  if (links?.length === 1 && links[0] === content && links[0].match(/\.(jpeg|jpg|gif|png|webp)$/) !== null) {
    return (
      <MessageImage
        link={links[0]}
        classList='mx-auto sm:mx-0'
      />
    )
  }

  const message: Array<ReactElement> = []

  const nodes = content.split(handleRegexp)

  for (let index = 0; index < nodes.length; index++) {
    const text = nodes[index]

    if (!text) {
      continue
    }

    // if text is image
    if (text.match(imgRegexp)) {
      const [alt, src] = text.split('](')
      message.push(
        <img
          src={src.slice(0, -1)}
          alt={alt.substring(2)}
          key={`inline-img-${text}`} />
      )
      continue
    }

    // if text is link
    if (text.match(linkRegexp)) {
      const [alt, src] = text.split('](')
      message.push(
        <LinkTextButton
          key={`url-${text}`}
          text={alt.substring(1)}
          url={src.slice(0, -1)}
        />
      )
      continue
    }

    // if text is url
    if (text.match(urlRegexp)) {
      message.push(
        <a className="text-violet-600 font-bold font-nunito"
          key={`img-${index}`}
          href={text}
          target="_blank"
          rel="noreferrer" >
          {text}
        </a>
      )
      continue
    }

    // if text is ---
    if (text.match(hrRegexp)) {
      message.push(
        <hr key={`hr-${index}`} className='border border-gray-500 my-4' />
      )
      continue
    }

    if (text.match(codeRegexp)) {
      const language = text.substring(3, text.indexOf('\n'))
      const code = text.slice(text.indexOf('\n') + 1, text.length - 3)

      message.push(
        <MessageCode
          key={`code-${index}`}
          language={language}>
          {code}
        </MessageCode>
      )

      continue
    }

    message.push(
      <span key={`plain-${index}`}>{text}</span>
    )
  }

  const imageLinks = [...new Set(content.match(imgUrlRegexp))]

  return (
    <div>
      {message}
      {imageLinks.length !== 0 && (
        <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-4" >
          {
            imageLinks.map((link) =>
              link.match(/\.(jpeg|jpg|gif|png|webp|svg)$/) !== null && <MessageImage key={`img-${link}`} link={link} />
            )
          }
        </div>
      )}
    </div >
  )
}

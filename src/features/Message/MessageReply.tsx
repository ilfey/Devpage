import { useGetMessagesQuery } from "../../store/api/messages.api"
import { scrollToElement } from "../../utils/utils"

interface IProps {
  replyId: number
}

export default function MessageReply({ replyId }: IProps) {

  const { data: messages } = useGetMessagesQuery()

  if (replyId === null) {
    return <></>
  }

  const msg = messages?.find((_msg) => _msg.id === replyId)

  if (msg) {
    return (
      <p className="mb-1 text-xs text-ellipsis whitespace-nowrap overflow-hidden" onClick={() => {
        if (msg) {
          const el = document.getElementById(`msg-${msg.id}`) as HTMLElement
          scrollToElement(el, () => {
            el.classList.add("bg-orange-800")
            setTimeout(() => el.classList.remove("bg-orange-800"), 150)
          })
        }
      }}>
        Отвечает <a href="#user" className="text-violet-600 font-nunito font-bold">{msg.username}</a> на:
        <span className="cursor-pointer"> {msg.content}</span>
      </p>
    )
  }

  return <></>
}
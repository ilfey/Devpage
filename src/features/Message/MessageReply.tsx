import { scrollToElement } from "../../utils/utils"
import { useLazyGetMessageQuery } from "../../store/api/messages.api"
import { useEffect } from "react"

interface IProps {
  replyId: number | null
}

export default function MessageReply({ replyId }: IProps) {
  const [getMessage, { data }] = useLazyGetMessageQuery()

  useEffect(() => {
    if (replyId) {
      getMessage(replyId)
    }

  }, [replyId])

  if (!replyId) {
    return (
      <></>
    )
  }

  if (data) {
    return (
      <p className="mb-1 text-xs text-ellipsis whitespace-nowrap overflow-hidden" onClick={() => {
        const el = document.getElementById(`msg-${data.id}`)

        if (el) {
          scrollToElement(el, () => {
            el.classList.add("bg-orange-800")
            setTimeout(() => el.classList.remove("bg-orange-800"), 150)
          })
        }
      }}>
        Отвечает <a href="#user" className="text-violet-600 font-nunito font-bold">{data.username}</a> на:
        <span className="cursor-pointer"> {data.content}</span>
      </p>
    )
  }

  return (
    <></>
  )
}
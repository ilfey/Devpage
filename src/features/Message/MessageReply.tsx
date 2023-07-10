import { scrollToElement } from "../../utils/utils"
import { useLazyGetMessageQuery } from "../../store/api/messages.api"
import Spinner from "../../shared/Spinner"
import { useEffect } from "react"

interface Props {
  replyId: number
}

export default function MessageReply({ replyId }: Props) {
  const [trigger, { status, isFetching, data }] = useLazyGetMessageQuery()

  useEffect(() => {
    if (status === 'uninitialized') {
      trigger(replyId)
    }
  }, [])

  if (status !== 'uninitialized') {
    if (isFetching) {
      return (
        <Spinner className='max-h-4 mb-1 mx-auto' />
      )
    }
    return (
      <>
        <p className="mb-1 text-xs text-ellipsis whitespace-nowrap overflow-hidden" onClick={() => {
          const el = document.getElementById(`msg-${data?.id}`)

          if (el) {
            scrollToElement(el, () => {
              el.classList.add("bg-orange-800")
              setTimeout(() => el.classList.remove("bg-orange-800"), 150)
            })
          }
        }}>
          Отвечает <a href="#user" className="text-violet-600 font-nunito font-bold">{data?.username}</a> на:
          <span className="cursor-pointer"> {data?.content}</span>
        </p>
      </>
    )
  }

  return (
    <></>
  )
}
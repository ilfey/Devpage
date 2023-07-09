import { scrollToElement } from "../../utils/utils"
import { useLazyGetMessageQuery } from "../../store/api/messages.api"
import Spinner from "../../shared/Spinner"

interface IProps {
  replyId: number | null
}

export default function MessageReply({ replyId }: IProps) {
  const [trigger, result] = useLazyGetMessageQuery()

  if (!replyId) {
    return
  }

  if (result.status === 'uninitialized') {
    trigger(replyId)
  } else {
    const { isFetching, data } = result

    if (isFetching) {
      return (
        <Spinner className='max-h-4 mb-1' />
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
}
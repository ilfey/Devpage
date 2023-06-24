import { useCallback, useState } from "react";
import SVG from "react-inlinesvg";
import { Send, X } from "../Icons";
import { getToken } from "../coockie";
import TextButton from "./buttons/TextButton";
import { handleEnterOrEsc, resizeTextArea } from "../utils/utils";
import { loadUsername } from "../sessionStorage";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useCreateMessageMutation } from "../store/api/messages.api";
import { useActions } from "../utils/hooks";

interface MessageFormProps {
  showAuth: () => void,
}

export default function MessageForm({ showAuth }: MessageFormProps) {

  const [createMessage] = useCreateMessageMutation()

  const reply = useSelector((state: RootState) => state.reply.value)
  const { removeReplying } = useActions()

  const [message, setMessage] = useState("")

  const postComment = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | null = null) => {
      e?.preventDefault()

      if (message.trim().length === 0) {
        alert("Нет символов")
        // TODO: make toast is empty
        return
      }

      if (message.trim().length >= 2000) {
        alert("Лимит символов")
        // TODO: make toast max symbols
        return
      }

      if (e?.currentTarget) {
        e.currentTarget.disabled = true
      }

      createMessage({
        text: message.trim(),
        reply_to: reply?.id || null
      })

      removeReplying()

      const form = document.getElementById("send-message") as HTMLFormElement
      form.reset()

      const area = document.getElementById("message-form")
      if (area) {
        resizeTextArea(area)
      }

      // pushMessage()
      // TODO: push message to array
    },
    [removeReplying, createMessage, message, reply?.id],
  )

  const isAuthorized = getToken() !== null && loadUsername() !== null

  if (!isAuthorized) {
    return <div className="message-form-placeholder">
      <p className="message-form-placeholder__text">
        Вам необходимо<TextButton text="войти" className="inline mx-1" onClick={showAuth} />
        чтобы оставить свой комментарий у меня на странице.
      </p>
    </div>
  }

  return <>
    {reply &&
      <div className="flex mr-[52px] justify-between items-center bg-gray-100 dark:bg-gray-700 px-4 rounded-tl-lg rounded-tr-lg">
        <p className="reply-to">Отвечает <a href="#user" className="font-nunito font-bold text-violet-600 cursor-pointer">{reply?.username}</a></p>
        <SVG src={X} className="w-4 h-4" onClick={() => removeReplying()} />
      </div>
    }
    <form className="flex gap-4" action="#send-message" id="send-message">
      <textarea className={`flex-auto p-2 text-sm text-black dark:text-white bg-gray-200 dark:bg-gray-800 resize-none overflow-hidden outline-none ${reply ? "rounded-bl-lg rounded-br-lg" : "rounded-lg"}`}
        id="message-form"
        rows={1}
        placeholder="Ваш комментарий..."
        onInput={e => resizeTextArea(e.currentTarget)}
        onKeyDown={e => handleEnterOrEsc(e, postComment)}
        onChange={e => setMessage(e.target.value)} />
      <button className="w-9 h-9" onClick={postComment}>
        <SVG className="text-orange-600" src={Send} />
      </button>
    </form>
  </>
}
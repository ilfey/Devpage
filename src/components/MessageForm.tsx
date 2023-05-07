import { useCallback, useState } from "react";
import { postMessage } from "../api";
import SVG from "react-inlinesvg";
import { Send, X } from "../Icons";
import IMessage from "../types/message";
import { getToken } from "../coockie";
import TextButton from "./Buttons/TextButton";
import { handleEnterOrEsc, resizeTextArea } from "../Utils";


interface MessageFormProps {
  replyMessage: IMessage | null,
  onReplyCanceled: () => void,
  showAuth: () => void,
  onPost: () => void,
}


export default function MessageForm({ replyMessage, onReplyCanceled, showAuth, onPost }: MessageFormProps) {

  const [message, setMessage] = useState("")

  const postComment = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | null = null) => {
      if (message.length < 1) {
        alert("Нет символов")
        return
      }

      if (message.length >= 2000) {
        alert("Лимит символов")
        return
      }

      if (e?.currentTarget) {
        e.currentTarget.disabled = true
      }

      postMessage(message, replyMessage?.id || null)
        .then(() => {
          onPost()
          const form = document.getElementById("send-message") as HTMLFormElement
          form.reset()

          const area = document.getElementById("message-form")
          resizeTextArea(area!!)
        })
        .catch((res) => {
          console.log(res);
        })

    },
    [message, replyMessage, onPost],
  )

  const token = getToken()

  return (
    <>
      {token === null &&
        <>
          <div className="message-form-placeholder">
            <p className="message-form-placeholder__text">
              Вам необходимо<TextButton text="войти" className="inline mx-1" onClick={showAuth} />
              чтобы оставить свой комментарий у меня на странице.
            </p>
          </div>
        </>
      }
      {token !== null &&
        <>
          {replyMessage &&
            <div className="flex mr-[52px] justify-between items-center bg-gray-100 dark:bg-gray-700 px-4 rounded-tl-lg rounded-tr-lg">
              <p className="reply-to">Отвечает <a href="#user" className="font-nunito font-bold text-violet-600 cursor-pointer">{replyMessage?.username}</a></p>
              <SVG src={X} className="w-4 h-4" onClick={onReplyCanceled} />
            </div>
          }
          <form className="flex gap-4" action="#send-message" id="send-message">
            <textarea className={`flex-auto p-2 text-sm text-black dark:text-white bg-gray-200 dark:bg-gray-800 resize-none overflow-hidden outline-none ${replyMessage ? "rounded-bl-lg rounded-br-lg" : "rounded-lg"}`}
              id="message-form"
              rows={1}
              placeholder="Ваш комментарий..."
              onInput={e => resizeTextArea(e.currentTarget)}
              onKeyDown={e => handleEnterOrEsc(e, postComment)}
              onChange={e => { setMessage(e.target.value) }} />
            <button className="w-9 h-9" onClick={postComment}>
              <SVG className="text-orange-600" src={Send} />
            </button>
          </form>
        </>
      }

    </>
  );
}
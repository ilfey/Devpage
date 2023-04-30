import { useCallback, useState } from "react";
import { postMessage } from "../api";
import SVG from "react-inlinesvg";
import { Send, X } from "../Icons";
import IMessage from "../types/message";
import { getToken } from "../coockie";

interface MessageFormProps {
  msg: IMessage | null,
  cancelReply: () => void,
  showAuth: () => void,
  onPost: () => void,
}


export default function MessageForm({ msg, cancelReply, showAuth, onPost }: MessageFormProps) {

  const [message, setMessage] = useState("")

  const resizeTextArea = useCallback(
    () => {
      const area = document.querySelector(".message-form__entry") as HTMLTextAreaElement

      area.style.height = ''
      area.style.height = `${area.scrollHeight - 20}px`
    },
    [],
  )

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

      postMessage(message, msg?.id || null)
        .then(() => {
          onPost()
          const form = document.querySelector("#send-message") as HTMLFormElement
          form.reset()
          resizeTextArea()
        })
        .catch((res) => {
          console.log(res);
        })

    },
    [message, msg, onPost, resizeTextArea],
  )

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      postComment()

    }
  }

  const token = getToken()

  return (
    <>
      {token === null &&
        <>
          <div className="message-form-placeholder">
            <p className="message-form-placeholder__text">
              Вам необходимо<button className="button-in-text" onClick={showAuth}>войти</button>
              чтобы оставить свой комментарий у меня на странице.
            </p>
          </div>
        </>
      }
      {token !== null &&
        <>
          {msg &&
            <div className="reply-to-container">
              <p className="reply-to">Отвечает <span className="reply-to__username">{msg?.username}</span></p>
              <SVG src={X} className="button-close" onClick={cancelReply} />
            </div>
          }
          <form className="form message-form" action="#send-message" id="send-message">
            <textarea className="form__textarea message-form__entry" rows={1} placeholder="Ваш комментарий..."
              onInput={resizeTextArea} onKeyDown={handleKey} onChange={(e) => { setMessage(e.target.value) }} />
            <button className="form__button button-send" onClick={postComment}>
              <SVG src={Send} className="button-send__logo" />
            </button>
          </form>
        </>
      }

    </>
  );
}
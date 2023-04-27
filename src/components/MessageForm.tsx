import { useCallback, useState } from "react";
import { API } from "../api";
import { getToken } from "../coockie";
import SVG from "react-inlinesvg";
import { Send, X } from "../Icons";
import IMessage from "../types/message";

interface MessageFormProps {
  msg: IMessage | null,
  cancelReply: () => void,
}

export default function MessageForm({ msg, cancelReply }: MessageFormProps) {

  const [message, setMessage] = useState("")

  const postComment = useCallback(
    () => {
      const token = getToken()
      if (!token) {
        alert("Нужно авторизироваться")
        return
      }

      if (message.length < 1) {
        alert("Нет символов")
        return
      }

      if (message.length >= 2000) {
        alert("Лимит символов")
        return
      }

      API.post("/user/message", {
        content: message,
        reply_to: msg?.id || null
      }, {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      })
        .then((res) => {
          console.log(res.status);

        })
        .catch((res) => {
          console.log(res);

        })
        .finally(() => {

        })
    },
    [message, msg],
  )


  function resizeTextArea(e: React.FormEvent<HTMLTextAreaElement>) {
    e.currentTarget.style.height = ""
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`
  }

  return (
    <>
      <div className={msg ? "reply-to-container" : "reply-to-container-hidden"}>
        <p className="reply-to">Отвечает <span className="reply-to__username">{msg?.username}</span></p>
        <SVG src={X} className="button-close" onClick={cancelReply} />
      </div>
      <form className="form message-form" action="#">
        <textarea className="form__textarea message-form__entry" rows={1} placeholder="Ваш комментарий..." onInput={resizeTextArea} onChange={(e) => { setMessage(e.target.value) }}></textarea>
        <SVG src={Send} className="button-send" onClick={postComment} />
      </form>
    </>
  );
}
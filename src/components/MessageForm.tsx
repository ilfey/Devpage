import { useCallback, useEffect, useState } from "react";
import { API } from "../api";
import { getToken } from "../coockie";

export default function MessageForm() {

  const [message, setMessage] = useState("")

  useEffect(() => {
    if (message.length > 2000) {

    }
  }, [message])

  const postComment = useCallback(
    () => {
      const token = getToken()
      if (!token) {
        alert("Нужно авторизироваться")
        return
      }

      API.post("/user/message", {
        content: message,
        // TODO add reply
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
    [message],
  )


  function resizeTextArea(e: React.FormEvent<HTMLTextAreaElement>) {
    e.currentTarget.style.height = ""
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`
  }

  return (
    <form className="form message-form" action="#">
      <textarea className="form__textarea" placeholder="Напишите комментарий..." onInput={resizeTextArea} onChange={(e) => { setMessage(e.target.value) }}></textarea>
      <button className="form__button" type="reset" onClick={postComment}>Отправить</button>
    </form>
  );
}
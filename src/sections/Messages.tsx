import SVG from "react-inlinesvg";
import { Spinner } from "../Icons";
import Message from "../components/Message";
import IMessage from "../types/message";
import { useEffect, useState } from "react";
import { getMessages } from "../api";

interface MessagesProps {
  // messages: Array<IMessage>,
  onReply: (message: IMessage) => void,
  // onDelete: (message: IMessage) => void,
}

enum State {
  Initial,
  Updating,
  ErrorUpdating,
  CompleteUpdate,
}

export default function Messages({ onReply }: MessagesProps) {

  const [messages, setMessages] = useState<Array<IMessage>>([])

  const [state, setState] = useState(State.Initial)

  function updateMessages() {
    setState(State.Updating)
    getMessages()
      .then((res) => {
        setMessages(res.data)
        setState(State.CompleteUpdate)
      })
      .catch(() => {
        setState(State.ErrorUpdating)
      })
  }

  useEffect(() => {
    updateMessages()
  }, [])

  return (
    <section className="part part-messages">
      <h2 className="part__title">Комментарии</h2>
      {state === State.Updating &&
        <SVG src={Spinner} />
      }
      {state === State.ErrorUpdating &&
        <p>Не удалось загрузить комментарии</p>
      }
      {state === State.CompleteUpdate && messages.length !== 0 &&
        <div className="message__container">
          {messages.map(msg =>
            <Message
              key={msg.id} msg={msg}
              reply_msg={findMsg(messages, msg.reply_to)}
              onReply={() => onReply(msg)}
              onDelete={() => updateMessages()}
            />
          )}
        </div>
      }
      {state === State.CompleteUpdate && messages.length === 0 &&
        <p>Комментариев пока нет, станьте первым!</p>
      }

    </section>
  )
}

function findMsg(messages: Array<IMessage>, id: number | null): IMessage | null {
  let value: IMessage | null = null

  for (let msg of messages) {
    if (id === msg.id) {
      value = msg
    }
  }

  return value
}
import Message from "../components/Message";
import IMessage from "../types/message";
import { useEffect, useState } from "react";
import { getMessages } from "../api";
import Section from "../components/Section";
import Spinner from "../components/Spinner";

interface MessagesProps {
  onReply: (message: IMessage) => void,
}

enum State {
  Initial,
  Updating,
  ErrorUpdating,
  CompleteUpdate,
}

export default function Comments({ onReply }: MessagesProps) {

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
    <Section
      id="comments"
      title="Комментарии"
    >
      {state === State.Updating &&
        <Spinner className="mx-auto" />
      }
      {state === State.ErrorUpdating &&
        <p>Не удалось загрузить комментарии</p>
      }
      {state === State.CompleteUpdate && messages.length !== 0 &&
        <div className="flex flex-col gap-4">
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
        <p className="text-center">Комментариев пока нет, станьте первым!</p>
      }
    </Section>
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
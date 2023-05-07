import Message from "../components/Message";
import IMessage from "../types/message";
import { useEffect, useState } from "react";
import { getMessages } from "../api";
import Section from "../components/Section";
import Spinner from "../components/Spinner";
import InlineSVG from "react-inlinesvg/esm";
import { Error } from "../Icons";
import IErrorResponse from "../types/errorResponse";
import ActionButton from "../components/buttons/ActionButton";
import axios from "axios";
import TextButton from "../components/buttons/TextButton";

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
  const [displayError, setDisplayError] = useState(false)
  const [responseError, setResponseError] = useState("")
  const [state, setState] = useState(State.Initial)

  function updateMessages() {
    setState(State.Updating)
    getMessages()
      .then((res) => {
        setMessages(res.data)
        setState(State.CompleteUpdate)
      })
      .catch(e => {
        setState(State.ErrorUpdating)
        if (axios.isAxiosError<IErrorResponse>(e)) {
          setResponseError(`Статус код: ${e.response?.status}\n Ошибка: ${e.response?.data}`)
        }
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
        <div className="flex flex-col items-center gap-4">
          <div className="flex justify-center items-center text-red-600">
            <InlineSVG className="w-8 h-8 " src={Error} />
            <span className="">Не удалось загрузить комментарии</span>
          </div>

          {!displayError ?
            <TextButton className=""
            onClick={() => setDisplayError(true)}
              text="Показать ошибку"
            />
            :
            <p className="whitespace-pre text-center">{responseError}</p>
          }

          <ActionButton className=""
            content="Попробовать снова"
            onClick={() => updateMessages()}
          />
        </div>
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
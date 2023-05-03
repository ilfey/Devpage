
import SVG from "react-inlinesvg";
import { Error, Reply, Trash } from "../Icons";
import IMessage from "../types/message";
import { loadUsername } from "../storage";
import { deleteMessage } from "../api";
import { useCallback, useState } from "react";
import { scrollToElement } from "../Utils";

const today = new Date()
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

const globalOptions: any = {
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
}

interface MessageProps {
  msg: IMessage,
  reply_msg: IMessage | null,
  onReply: () => void,
  onDelete: (id: number) => void,
}

enum State {
  Display,
  Loading,
  Error,
}

export default function Message({ msg, reply_msg, onReply, onDelete }: MessageProps) {

  const [state, setState] = useState(State.Display)

  function getMessageDate(): string {
    const date = new Date(msg.modified_at)

    const hours = date.getHours()
    const minutes = date.getMinutes()

    if (date.toDateString() === today.toDateString()) {
      return `Сегодня, в ${hours}:${minutes}`
    }

    if (date.toDateString() === yesterday.toDateString()) {
      return `Вчера, в ${hours}:${minutes}`
    }

    return date.toLocaleDateString("ru-RU", globalOptions)
  }

  const onClickDelete = useCallback(
    () => {
      setState(State.Loading)
      deleteMessage(msg.id)
        .then(() => {
          onDelete(msg.id)
        })
        .catch(() => {
          setState(State.Error)
        })
    },
    [msg, onDelete],
  )

  const onClickReplyMessage = useCallback(
    () => {
      if (reply_msg) {
        const el = document.getElementById(reply_msg.id.toString()) as HTMLElement
        scrollToElement(el, () => {
          el.classList.add("bg-orange-800")
          setTimeout(() => el.classList.remove("bg-orange-800"), 150)
        })
      }
    },
    [reply_msg],
  )

  const username = loadUsername()

  
  return (
    <div id={msg.id.toString()} className="group flex flex-col hover:bg-gray-800 duration-200 p-4 rounded-xl" onClick={() => setState(State.Display)}>
      {state === State.Error &&
        <div className="message__error">
          <SVG className="message__error__logo" src={Error} />
          <span className="message__error__text">Не удалось удалить сообщение</span>
        </div>
      }
      {state === State.Display &&
        <>
          {reply_msg &&
          <p className="mb-2 text-ellipsis whitespace-nowrap overflow-hidden" onClick={onClickReplyMessage}>
              Отвечает <a href="#user" className="text-violet-600 font-nunito font-bold">{reply_msg?.username}</a> на: <span className="cursor-pointer">{reply_msg?.content}</span>
            </p>
          }
          <div className="mb-2 flex justify-between">
            <div className="flex gap-1 items-baseline">
              <a href="#user" className="text-lg text-violet-600 font-nunito font-bold" >{msg.username}</a>
              <span className="text-xs">{getMessageDate()}</span>
            </div>

            {username &&
              <div className="hidden group-hover:flex text-orange-600 gap-1">
                <SVG className="w-6 h-6 cursor-pointer" src={Reply} onClick={onReply} />
                {username === msg.username &&
                  <SVG className="w-6 h-6 cursor-pointer" src={Trash} onClick={onClickDelete} />
                }
              </div>
            }
          </div>

          <div className="">
            <p className="whitespace-pre-wrap">{msg.content}</p>
          </div>
        </>
      }
    </div>
  );
}
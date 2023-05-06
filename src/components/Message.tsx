
import SVG from "react-inlinesvg";
import { Edit, Error, Reply, Trash } from "../Icons";
import IMessage from "../types/message";
import { loadUsername } from "../storage";
import { deleteMessage, patchMessage } from "../api";
import { useCallback, useEffect, useState } from "react";
import { handleEnterOrEsc, resizeTextArea, scrollToElement } from "../Utils";
import TextButton from "./buttons/TextButton";
import IErrorResponse from "../types/errorResponse";
import axios from "axios";

const today = new Date()
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

const globalOptions: any = {
  year: "numeric",
  month: "numeric",
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
  const [content, setContent] = useState(msg.content)
  const [responseError, setResponseError] = useState("")
  const [displayError, setDisplayError] = useState(false)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    if (editing) {
      const area = document.getElementById("edit-message-form")
      resizeTextArea(area!!)
    }
  }, [editing])


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
        .catch(e => {
          setState(State.Error)
          if (axios.isAxiosError<IErrorResponse>(e)) {
            setResponseError(`Статус код: ${e.response?.status}\nОшибка: ${e.response?.data}`)
          }
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

  function cancelEditing() {
    setContent(msg.content)
    setEditing(false)
  }

  function editMessage() {
    setEditing(false)
    patchMessage(msg.id, content)
      .then(res => {

      })
      .catch(e => {
        console.log("error: " + e)
        setState(State.Error)
        if (axios.isAxiosError<IErrorResponse>(e)) {
          setResponseError(`Статус код: ${e.response?.status}\nОшибка: ${e.response?.data}`)
        }
      })
  }

  const username = loadUsername()


  return (
    <div id={msg.id.toString()} className={`group flex flex-col ${editing ? "bg-gray-800" : "hover:bg-gray-800"} duration-200 p-4 rounded-xl`}
    // onClick={() => setState(State.Display)}
    >
      {state === State.Error &&
        <div className="flex flex-col items-center gap-4">
          <div className="flex justify-center items-center text-red-600">
            <SVG className="w-8 h-8 " src={Error} />
            <span className="">Не удалось выполнить действие</span>
          </div>

          {!displayError ?
            <TextButton className=""
              onClick={() => setDisplayError(true)}
              text="Показать ошибку"
            />
            :
            <p className="whitespace-pre text-center">{responseError}</p>
          }
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
              <div className={`hidden ${editing ? "flex" : "group-hover:flex"} text-orange-600 gap-1`}>
                <SVG className="w-6 h-6 cursor-pointer" src={Reply} onClick={onReply} />
                {username === msg.username &&
                  <>
                    <SVG className="w-6 h-6 cursor-pointer" src={Edit} onClick={() => setEditing(true)} />
                    <SVG className="w-6 h-6 cursor-pointer" src={Trash} onClick={onClickDelete} />
                  </>
                }
              </div>
            }
          </div>

          {editing ?
            <>
              <form action="#edit-message" className="w-full">
                <textarea className="w-full p-2 text-sm text-white bg-gray-900 resize-none overflow-hidden outline-none rounded-lg"
                  id="edit-message-form"
                  name="content"
                  rows={1}
                  onKeyDown={e => handleEnterOrEsc(e, editMessage, cancelEditing)}
                  onInput={e => resizeTextArea(e.currentTarget)}
                  onChange={e => setContent(e.currentTarget.value)}
                  value={content}
                />
              </form>

              <div className="flex gap-2 mt-3">
                <TextButton className="text-sm w-fit"
                  text="Отмена"
                  onClick={cancelEditing}
                />

                <TextButton className="text-sm w-fit"
                  text="Сохранить"
                  onClick={editMessage}
                />
              </div>
            </>
            :
            <div className="">
              <p className="whitespace-pre-wrap">{content}</p>
            </div>
          }
        </>
      }
    </div>
  );
}
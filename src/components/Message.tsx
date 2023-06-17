
import InlineSVG from "react-inlinesvg";
import { Edit, Error, Reply, Trash } from "../Icons";
import IMessage from "../types/message";
import { loadUsername } from "../sessionStorage";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { handleEnterOrEsc, resizeTextArea, scrollToElement } from "../Utils";
import TextButton from "./buttons/TextButton";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import useActions from "../store/useActions";
import { useDeleteMessageMutation, useEditMessageMutation } from "../store/api/messages.api";

const today = new Date()
const yesterday = new Date(today);
const reUrl = /(http(s)?:\/\/.)[-a-zA-Zа-яА-Я0-9@:%._+~#=]{2,256}\.[a-zа-я]{2,6}\b([-a-zA-Zа-яА-Я0-9@:%_+.~#?&//=]*)/g
yesterday.setDate(today.getDate() - 1);



const globalOptions: any = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
}

function getMessageDate(msg: IMessage): string {
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


function parseMessageContent(content: string) {
  const links = content.match(reUrl)

  if (links) {
    let nextIndex = 0

    return <>
      {links.map((link) => {
        // link start
        const index = content.indexOf(link)

        // last link end 
        const prevIndex = nextIndex

        // new link end
        nextIndex = index + link.length
        return <>
          {/* text before link */}

          {content.slice(prevIndex, index)}

          {/* link */}
          <a className="text-violet-600 font-bold font-nunito" href={link} target="_blank" rel="noreferrer" >{link}</a>
        </>
      })}

      {/* if content not end with link */}

      {nextIndex !== content.length &&
        content.slice(nextIndex)
      }
    </>
  }

  return content
}


interface MessageProps {
  msg: IMessage,
}


export default function Message({ msg }: MessageProps) {


  const username = loadUsername()
  const isAdmin = username === process.env.REACT_APP_ADMIN_USERNAME

  const [content, setContent] = useState(msg.content)
  const [editing, setEditing] = useState(false)
  const [displayError, setDisplayError] = useState(false)
  const reply = useSelector((state: RootState) => state.reply.value)
  const { setReplying } = useActions()


  const [deleteMessage, deleteResult] = useDeleteMessageMutation()
  const { isError, error, status } = deleteResult

  const [editMessage] = useEditMessageMutation()


  useEffect(() => {
    if (editing) {
      const area = document.getElementById("edit-message-form")
      resizeTextArea(area!!)
    }
  }, [editing])


  const onClickReplyMessage = useCallback(
    () => {
      if (reply) {
        const el = document.getElementById(reply.id.toString()) as HTMLElement
        scrollToElement(el, () => {
          el.classList.add("bg-orange-800")
          setTimeout(() => el.classList.remove("bg-orange-800"), 150)
        })
      }
    },
    [reply],
  )

  const onClickDelete = useCallback(
    () => deleteMessage(msg.id),
    [deleteMessage, msg.id],
  )

  const onClickEdit = useCallback(
    () => {
      editMessage({
        id: msg.id,
        text: content
      })

      setEditing(false)
    },
    [editMessage, msg.id, content],
  )

  const onClickCancel = useCallback(
    () => {
      setContent(msg.content)
      setEditing(false)
    },
    [msg.content],
  )

  function getEditButtons(msg: IMessage): ReactElement {
    if (username === msg.username || isAdmin) {
      return <>
        <InlineSVG className="w-6 h-6 cursor-pointer" src={Edit} onClick={() => setEditing(true)} />
        <InlineSVG className="w-6 h-6 cursor-pointer" src={Trash} onClick={onClickDelete} />
      </>
    }

    return <></>
  }


  return (
    <div id={msg.id.toString()} className={`group flex flex-col ${editing ? "bg-gray-200 dark:bg-gray-800" : "hover:bg-gray-200 dark:hover:bg-gray-800"} duration-200 p-4 rounded-xl`}
    // onClick={() => setState(State.Display)}
    >
      {isError &&
        <div className="flex flex-col items-center gap-4">
          <div className="flex justify-center items-center text-red-600">
            <InlineSVG className="w-8 h-8 " src={Error} />
            <span className="">Не удалось выполнить действие</span>
          </div>

          {!displayError ?
            <TextButton className=""
              onClick={() => setDisplayError(true)}
              text="Показать ошибку"
            />
            :
            <p className="whitespace-pre text-center">{status} - {error?.toString()}</p>
          }
        </div>
      }

      {reply &&
        <p className="mb-2 text-ellipsis whitespace-nowrap overflow-hidden" onClick={onClickReplyMessage}>
          Отвечает <a href="#user" className="text-violet-600 font-nunito font-bold">{reply?.username}</a> на: <span className="cursor-pointer">{reply?.content}</span>
        </p>
      }

      <div className="mb-2 flex justify-between">
        <div className="flex gap-1 items-baseline">
          <a href="#user" className="text-lg text-violet-600 font-nunito font-bold" >{msg.username}</a>
          <span className="text-xs">{getMessageDate(msg)}</span>
        </div>

        {username &&
          <div className={`hidden ${editing ? "flex" : "group-hover:flex"} text-orange-600 gap-1`}>
            <InlineSVG className="w-6 h-6 cursor-pointer" src={Reply} onClick={() => setReplying(msg)} />
            {getEditButtons(msg)}
          </div>
        }
      </div>

      {editing ?
        <>
          <form action="#edit-message" className="w-full">
            <textarea className="w-full p-2 text-sm text-black dark:text-white bg-gray-300 dark:bg-gray-900 resize-none overflow-hidden outline-none rounded-lg"
              id="edit-message-form"
              name="content"
              rows={1}
              onKeyDown={e => handleEnterOrEsc(e, onClickEdit, onClickCancel)}
              onInput={e => resizeTextArea(e.currentTarget)}
              onChange={e => setContent(e.currentTarget.value)}
              value={content}
            />
          </form>

          <div className="flex gap-2 mt-3">
            <TextButton className="text-sm w-fit"
              text="Отмена"
              onClick={onClickCancel}
            />

            <TextButton className="text-sm w-fit"
              text="Сохранить"
              onClick={onClickEdit}
            />
          </div>
        </>
        :
        <>
          <p className="whitespace-pre-wrap overflow-auto">{parseMessageContent(content)}</p>
        </>
      }
    </div>
  );
}
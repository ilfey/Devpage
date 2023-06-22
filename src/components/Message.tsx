
import InlineSVG from "react-inlinesvg";
import { Edit, Error, Reply, Trash } from "../Icons";
import IMessage from "../types/message";
import { loadUsername } from "../sessionStorage";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { handleEnterOrEsc, resizeTextArea, scrollToElement } from "../utils/utils";
import TextButton from "./buttons/TextButton";
import { useDeleteMessageMutation, useEditMessageMutation, useGetMessagesQuery } from "../store/api/messages.api";
import { useActions } from "../utils/hooks";

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

function makeImage(link: string, classList: string = "") {
  return (
    <div className={`h-64 max-w-[256px] rounded-md flex flex-col overflow-hidden justify-center ${classList}`}>
      <img src={link} alt="image" />
    </div>
  )
}

function parseMessageContent(content: string) {
  content = content.trim()
  const links = content.match(reUrl)

  // if content === link
  if (links?.length === 1 && links[0] === content && links[0].match(/\.(jpeg|jpg|gif|png|webp)$/) !== null) {
    return makeImage(links[0], "mx-auto sm:mx-0")
  }

  // if content contains link
  if (links) {
    const uniqueLinks = Array.from(new Set(links))

    let nextIndex = 0

    return (
      <>
        <p className="whitespace-pre-wrap overflow-hidden break-words">
          {links.map((link) => {
            // link start
            const index = content.indexOf(link)

            // link end 
            const prevIndex = nextIndex

            // new link end
            nextIndex = index + link.length
            return (
              <>
                {/* text before link */}

                {content.slice(prevIndex, index)}

                {/* link */}
                <a className="text-violet-600 font-bold font-nunito" href={link} target="_blank" rel="noreferrer" >{link}</a>
              </>
            )
          })}

          {/* if content not end with link */}

          {nextIndex !== content.length &&
            content.slice(nextIndex)
          }

        </p>

        {/* render images */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-4">
          {uniqueLinks.map((link) =>
            link.match(/\.(jpeg|jpg|gif|png|webp|svg)$/) !== null ? makeImage(link) : <></>
          )}
        </div>
      </>
    )
  }

  return (
    <p className="whitespace-pre-wrap overflow-hidden break-words">
      {content}
    </p>
  )
}


interface MessageProps {
  msg: IMessage,
}


export default function Message({ msg }: MessageProps) {

  const username = loadUsername()
  const isAdmin = username === import.meta.env.VITE_APP_ADMIN_USERNAME

  const [content, setContent] = useState(msg.content)
  const [editing, setEditing] = useState(false)
  const [displayError, setDisplayError] = useState(false)
  const { setReplying } = useActions()

  const { data: messages } = useGetMessagesQuery()
  const [deleteMessage, deleteResult] = useDeleteMessageMutation()
  const { isError, error, status } = deleteResult

  const [editMessage] = useEditMessageMutation()

  const reply_msg = messages?.find((_msg) => _msg.id === msg.reply_to)


  useEffect(() => {
    const area = document.getElementById("edit-message-form")
    if (editing && area) {
      resizeTextArea(area)
    }
  }, [editing])


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

  const onClickDelete = useCallback(
    () => deleteMessage(msg.id),
    [deleteMessage, msg.id],
  )

  const onClickEdit = useCallback(
    () => {
      editMessage({
        id: msg.id,
        text: content.trim()
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


  let editButtons: ReactElement = <></>

  if (isAdmin || username === msg.username) {
    editButtons = <>
      <InlineSVG className="w-6 h-6 cursor-pointer" src={Edit} onClick={() => setEditing(true)} />
      <InlineSVG className="w-6 h-6 cursor-pointer" src={Trash} onClick={onClickDelete} />
    </>
  }


  let msgDate: string

  const date = new Date(msg.modified_at)
  const hours = date.getHours()
  const minutes = date.getMinutes()

  switch (date.toDateString()) {
    case today.toDateString():
      msgDate = `Сегодня, в ${hours}:${minutes}`
      break;

    case yesterday.toDateString():
      msgDate = `Вчера, в ${hours}:${minutes}`
      break;

    default:
      msgDate = date.toLocaleDateString("ru-RU", globalOptions)
      break;
  }


  return (
    <div id={msg.id.toString()} className={`group flex flex-col ${editing ? "bg-gray-200 dark:bg-gray-800" : "hover:bg-gray-200 dark:hover:bg-gray-800"} duration-200 p-4 rounded-xl`}>
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

      {reply_msg &&
        <p className="mb-2 text-ellipsis whitespace-nowrap overflow-hidden" onClick={onClickReplyMessage}>
          Отвечает <a href="#user" className="text-violet-600 font-nunito font-bold">{reply_msg.username}</a> на: <span className="cursor-pointer">{reply_msg.content}</span>
        </p>
      }

      <div className="mb-2 flex justify-between">
        <div className="flex gap-1 items-baseline">
          <a href="#user" className="text-lg text-violet-600 font-nunito font-bold" >{msg.username}</a>
          <span className="text-xs">{msgDate}</span>
        </div>

        {username &&
          <div className={`hidden ${editing ? "flex" : "group-hover:flex"} text-orange-600 gap-1`}>
            <InlineSVG className="w-6 h-6 cursor-pointer" src={Reply} onClick={() => setReplying(msg)} />
            {editButtons}
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
          {parseMessageContent(content)}
        </>
      }
    </div>
  );
}
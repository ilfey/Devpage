import React from 'react'
import { loadUsername } from '../../sessionStorage'
import { useActions } from '../../utils/hooks'
import InlineSVG from 'react-inlinesvg'
import IMessage from '../../types/message'
import { Edit, Reply, Trash } from '../../Icons'

interface IProps {
  msg: IMessage
  isEditing: boolean
  onEdit: (isEditng: boolean) => void
  onDelete: (msgId: number) => void
}

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

const globalOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
}

export default function MessageHeader({ msg, isEditing, onEdit, onDelete }: IProps) {

  const { setReplying } = useActions()

  const username = loadUsername()
  const isAdmin = username === import.meta.env.VITE_APP_ADMIN_USERNAME

  let msgDate: string

  const isEdited = !(msg.modified_at == msg.created_at)
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


  let editButtons = <></>

  if (isAdmin || msg.username === username) {
    editButtons = <>
      <InlineSVG className="w-6 h-6 cursor-pointer" src={Edit} onClick={() => onEdit(true)} />
      <InlineSVG className="w-6 h-6 cursor-pointer" src={Trash} onClick={() => onDelete(msg.id)} />
    </>
  }

  return (
    <div className="mb-1 flex justify-between">
      <div className="flex gap-1 items-baseline">
        <a href="#user" className="text-lg text-violet-600 font-nunito font-bold" >{msg.username}</a>

        <span className='text-xs text-gray-400'>
          {isEdited &&
            "Изменено: "
          }
          {msgDate}
        </span>

      </div>

      {username &&
        <div className={`hidden ${isEditing ? "flex" : "group-hover:flex"} text-orange-600 gap-1`}>
          <InlineSVG className="w-6 h-6 cursor-pointer" src={Reply} onClick={() => setReplying(msg)} />
          {editButtons}
        </div>
      }
    </div>
  )
}

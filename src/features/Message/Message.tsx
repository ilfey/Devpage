import IMessage from "../../entities/Message";
import { useCallback, useState } from "react";
import { useDeleteMessageMutation, useEditMessageMutation } from "../../store/api/messages.api";
import MessageHeader from "./MessageHeader";
import MessageBody from "./MessageBody";
import MessageEdit from "./MessageEdit";
import MessageError from "./MessageError";
import MessageReply from "./MessageReply";


interface IProps {
  msg: IMessage,
}


export default function Message({ msg }: IProps) {

  const [content, setContent] = useState(msg.content)
  const [isEditing, setIsEditing] = useState(false)

  const [deleteMessage, deleteResult] = useDeleteMessageMutation()
  const { isError, error, status } = deleteResult

  const [editMessage] = useEditMessageMutation()

  const onClickEdit = useCallback(
    (newContent: string) => {
      const newTrimContent = newContent.trim()
      
      // TODO: handle error
      editMessage({
        id: msg.id,
        text: newTrimContent
      })

      setContent(newTrimContent)
      setIsEditing(false)
    },
    [editMessage, msg.id, setContent],
  )

  const onClickCancel = useCallback(
    () => {
      setContent(msg.content)
      setIsEditing(false)
    },
    [msg.content],
  )

  let body

  if (isError) {
    body = (
      <MessageError
        error={error}
        status={status}
      />
    )
  } else {
    body = (
      <>
        <MessageReply
          replyId={msg.reply_to} />

        <MessageHeader
          msg={msg}
          isEditing={isEditing}
          onDelete={(id) => deleteMessage(id)}
          onEdit={(isEditing) => setIsEditing(isEditing)}
        />

        {isEditing ?
          <MessageEdit
            content={content}
            onCancel={onClickCancel}
            onEdit={onClickEdit} />
          :
          <MessageBody
            content={content} />
        }
      </>
    )
  }

  return (
    <div className={`group flex flex-col ${isEditing ? "bg-gray-200 dark:bg-gray-800" : "hover:bg-gray-200 dark:hover:bg-gray-800"} duration-200 p-4 rounded-xl`}
      id={`msg-${msg.id}`}>
      {body}
    </div>
  );
}

import SVG from "react-inlinesvg";
import { Reply, Trash } from "../Icons";
import IMessage from "../types/message";
import { useCallback } from "react";
import { API } from "../api";
import { loadUsername } from "../storage";
import { getToken } from "../coockie";

interface MessageProps {
  msg: IMessage,
  reply_msg: IMessage | null,
  onReply: () => void,
}

export default function Message({ msg, reply_msg, onReply }: MessageProps) {

  const onDelete = useCallback(
    () => {
      API.delete(`/user/message/${msg.id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
        .then((res) => {

        })
        .catch(() => {

        })
        .finally(() => {

        })
    },
    [msg],
  )

  const username = loadUsername()

  return (
    <div className="message">
      {reply_msg &&
        <div className="message__reply">
          <p className="reply-to">Отвечает <span className="reply-to__username">{reply_msg?.username}</span> на: {reply_msg?.content}</p>
        </div>
      }
      <div className="message__header">
        <p className="message__username">{msg.username}</p>
        <span className="message__modified-at">{msg.modified_at.split('T')[0].replaceAll('-', '.')} {msg.modified_at.split('T')[1].split('.')[0]}</span>
        {username &&
          <div className="message__actions">
            <SVG className="message__actions__item" src={Reply} onClick={onReply} />
            {username === msg.username &&
              <SVG className="message__actions__item" src={Trash} onClick={onDelete} />
            }
          </div>
        }
      </div>

      <div className="message__content">
        <p className="message__text">{msg.content}</p>
      </div>
    </div>
  );
}
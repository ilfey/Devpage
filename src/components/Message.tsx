
import SVG from "react-inlinesvg";
import { Error, Reply, Trash } from "../Icons";
import IMessage from "../types/message";
import { loadUsername } from "../storage";
import { deleteMessage } from "../api";
import { useCallback, useState } from "react";

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

  const deleteMsg = useCallback(
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

  const username = loadUsername()

  return (
    <div className="message" onClick={() => setState(State.Display)}>
      {state === State.Error &&
        <div className="message__error">
          <SVG className="message__error__logo" src={Error} />
          <span className="message__error__text">Не удалось удалить сообщение</span>
        </div>
      }
      {state === State.Display &&
        <>
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
                  <SVG className="message__actions__item" src={Trash} onClick={deleteMsg} />
                }
              </div>
            }
          </div>

          <div className="message__content">
            <p className="message__text">{msg.content}</p>
          </div>
        </>
      }
    </div>
  );
}
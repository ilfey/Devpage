
import SVG from "react-inlinesvg";
import { Reply } from "../Icons";
import IMessage from "../types/message";

interface MessageProps {
  msg: IMessage,
  reply_msg: IMessage | null,
  onReply: () => void,
}

export default function Message({ msg, reply_msg, onReply }: MessageProps) {
  return (
    <div className="message">
      <div className={reply_msg ? "message__reply" : "message__reply message__reply-hidden"}>
        <p className="reply-to">Отвечает <span className="reply-to__username">{reply_msg?.username}</span> на: {reply_msg?.content}</p>
      </div>
      <div className="message__header">
        <p className="message__username">{msg.username}</p>
        <span className="message__modified-at">{msg.modified_at.split('T')[0].replaceAll('-', '.')} {msg.modified_at.split('T')[1].split('.')[0]}</span>
        <div className="message__actions">
          <SVG className="message__actions__item" src={Reply} onClick={onReply} />
        </div>
      </div>

      <div className="message__content">
        <p className="message__text">{msg.content}</p>
      </div>
    </div>
  );
}
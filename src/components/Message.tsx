
interface MessageProps {
  id: number,
  username: string,
  content: string,
  modified_at: string
}

export default function Message({ id, username, content, modified_at }: MessageProps) {
  return (
    <div className="message">
      <h3 className="message__username">{username} <span className="message__modified-at">{modified_at.split('T')[0].replaceAll('-', '.')} {modified_at.split('T')[1].split('.')[0]}</span></h3>
      <div className="message__content">
        <p className="message__text">{content}</p>
      </div>
    </div>
  );
}
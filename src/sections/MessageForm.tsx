import MF from '../components/MessageForm'
import IMessage from '../types/message'

interface Props {
  replyMessage: IMessage | null,
  onReplyCanceled: () => void,
  showAuth: () => void,
  onPost: () => void,
}

export default function MessageForm({ replyMessage, onReplyCanceled, showAuth, onPost }: Props) {
  return (
    <section className="pb-[50px]">
      <MF
        replyMessage={replyMessage}
        onReplyCanceled={onReplyCanceled}
        showAuth={showAuth}
        onPost={onPost}
      />
    </section>
  )
}
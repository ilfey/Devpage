import MF from '../features/MessageForm'

interface Props {
  showAuth: () => void,
}

export default function MessageForm({ showAuth }: Props) {
  return (
    <section className="pb-12">
      <MF
        showAuth={showAuth}
      />
    </section>
  )
}

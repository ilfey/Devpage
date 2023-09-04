import MF from '../features/MessageForm'

interface Props {
  showAuth: () => void,
}

export default function MessageForm({ showAuth }: Props) {
  return (
    <section className="p-4 rounded-xl mb-4 bg-gray-200">
      <MF
        showAuth={showAuth}
      />
    </section>
  )
}


interface Props {
  content: string,
  className: string,
  onClick: () => void,
}

export default function ActionButton({ content, className, onClick }: Props) {
  return (
    <button
      className={`w-64 h-16 text-lg rounded-xl border border-orange-600 bg-orange-600 text-white block font-nunito cursor-pointer ${className}`}
      onClick={onClick}>
      {content}
    </button>
  );
}

ActionButton.defaultProps = {
  className: "",
  onClick: () => { },
}

interface Props {
  text: string,
  className: string,
  type: "button" | "submit" | "reset" | undefined,
  onClick: () => void,
}

export default function ActionButton({ text, className, type, onClick }: Props) {
  return (
    <button
      className={`w-64 h-16 text-lg rounded-xl border border-orange-600 bg-orange-600 text-white block font-nunito cursor-pointer ${className}`}
      onClick={onClick}
      type={type}>
      {text}
    </button>
  );
}

ActionButton.defaultProps = {
  className: "",
  type: undefined,
  onClick: () => { },
}
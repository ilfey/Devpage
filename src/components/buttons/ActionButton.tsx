
interface Props {
  text: string,
  className: string,
  onClick: () => void,
}

export default function ActionButton({ text, className, onClick }: Props) {
  return (
    <button
      className={`w-[250px] h-[60px] text-lg rounded-xl border border-orange-600 bg-orange-600 text-white block font-nunito cursor-pointer ${className}`}
      onClick={onClick}>
      {text}
    </button>
  );
}

ActionButton.defaultProps = {
  className: "",
  onClick: () => { },
}

interface Props {
  text: string,
  className: string,
  onClick: () => void,
}

export default function TextButton({ text, className, onClick }: Props) {
  return (
    <button
      className={`text-lg border-none text-violet-600 block font-nunito font-bold cursor-pointer ${className}`}
      onClick={onClick}>
      {text}
    </button>
  );
}

TextButton.defaultProps = {
  className: "",
  onClick: () => { },
}
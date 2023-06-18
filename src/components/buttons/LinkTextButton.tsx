
interface Props {
  text: string,
  url: string,
  className: string,
  onClick: () => void,
}

export default function LinkTextButton({ text, url, className, onClick }: Props) {
  return (
    <a className={`text-lg text-violet-600 font-nunito font-bold ${className}`}
      href={url}
      onClick={onClick}>
      {text}
    </a>
  );
}

LinkTextButton.defaultProps = {
  className: "",
  onClick: () => { },
}
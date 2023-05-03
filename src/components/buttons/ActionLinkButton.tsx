import SVG from "react-inlinesvg";

interface Props {
  text: string,
  logo: string,
  onClick: () => void,
  className: string,
}

export default function ActionLinkButton({ text, logo, onClick, className }: Props) {
  return (
    <div
      className={`w-[250px] h-[60px] rounded-xl border border-gray-700 bg-gray-800 hover:border-violet-600 hover:bg-violet-600 text-white duration-200 flex items-center justify-center gap-4 font-nunito cursor-pointer ${className}`}
      onClick={onClick}
    >
      <SVG className="w-8 h-8" src={logo} />
      <span className="">{text}</span>
    </div>
  );
}

ActionLinkButton.defaultProps = {
  onClick: () => { },
  className: "",
}
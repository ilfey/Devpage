import SVG from "react-inlinesvg";

interface Props {
  url: string,
  title: string,
  logo: string,
  className: string,
}

export default function LinkButton({ url, title, logo, className }: Props) {
  return (
    <a
      className={`w-64 h-16 rounded-xl border border-gray-100 bg-gray-200 dark:hover:border-violet-600 hover:border-violet-600 dark:hover:bg-violet-600 hover:bg-violet-600 text-black hover:text-white duration-200 flex items-center justify-center gap-4 font-nunito cursor-pointer dark:text-white dark:border-gray-700 dark:bg-gray-800 ${className}`}
      href={url}
      target="_blank"
      rel="noreferrer">
      <SVG className="w-8 h-8" src={logo} />
      <span className="">{title}</span>
    </a>
  );
}

LinkButton.defaultProps = {
  className: "",
}
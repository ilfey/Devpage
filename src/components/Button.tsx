import SVG from "react-inlinesvg";

interface ButtonProps {
  url: string,
  title: string,
  logo: string,
}

export default function Button({ url, title, logo }: ButtonProps) {
  return (
    <a className="button" href={url} target="_blank" rel="noreferrer">
      <SVG src={logo} />
      <span className="button__text">{title}</span>
    </a>
  );
}
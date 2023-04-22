import Image from 'next/image';

interface ButtonProps {
  url: string,
  title: string,
  logo: string,
}

export default function Button({ url, title, logo }: ButtonProps) {
  return (
    <a className="button" href={url} target="_blank" rel="noreferrer">
      <Image src={logo} alt={logo+"Icon"} width={48} height={48}/>
      <span className="button__text">{title}</span>
    </a>
  );
}
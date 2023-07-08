import hljs from 'highlight.js';

interface Props {
  language: string
  children: string
}

export default function MessageCode({ language, children }: Props) {
  return (
    <pre className='overflow-auto text-sm'>
      <code className={language}
        dangerouslySetInnerHTML={
          { __html: hljs.highlight(children, { language: 'go' }).value }
        }>
      </code>
    </pre >
  )
}

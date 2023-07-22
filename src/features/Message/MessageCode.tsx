import hljs from "highlight.js/lib/core"
import { useEffect, useState } from "react"
import Spinner from "../../shared/Spinner"

interface Props {
  language: string
  children: string
}

export default function MessageCode({ language, children }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const [code, setCode] = useState(children)

  useEffect(() => {
    if (language === '') {
      setIsLoading(false)
      return
    }

    if (hljs.listLanguages().includes(language)) {
      setCode(hljs.highlight(children, { language: language }).value)
      setIsLoading(false)
      return
    }
    
    /* @vite-ignore */
    import(`./languages/${language}.js`)
      .then((res) => {
        hljs.registerLanguage(language, res.default)
        setCode(hljs.highlight(children, { language: language }).value)
        setIsLoading(false)
      })
      .catch(() => {
        console.error(`Language: ${language} not found`)
        setIsLoading(false)
      })
    
  }, [])
  
  return (
    <pre className="overflow-auto text-sm relative">
      {isLoading && (
        <div className="absolute right-0 overflow-hidden">
          <Spinner className="max-w-4 max-h-4" />
        </div>
      )}
      <code
        className="flex-auto"
        dangerouslySetInnerHTML={{
          __html: code,
        }}
      ></code>
    </pre>
  )
}

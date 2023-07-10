import hljs from "highlight.js/lib/core"
import { useEffect, useState } from "react"
import Spinner from "../../shared/Spinner"

interface Props {
  language: string
  children: string
}

export default function MessageCode({ language, children }: Props) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    import(`./languages/${language}.js`).then((res) => {
      hljs.registerLanguage(language, res.default)
      setIsLoading(false)
    })
  }, [])
  
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <pre className="overflow-auto text-sm">
          <code
            className={language}
            dangerouslySetInnerHTML={{
              __html: hljs.highlight(children, { language: language }).value,
            }}
          ></code>
        </pre>
      )}
    </>
  )
}

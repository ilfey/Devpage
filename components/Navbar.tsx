import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'

const NavBar = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const router = useRouter()
  const { locale, locales } = router

  // When mounted on client, now we can get theme
  useEffect(() => setMounted(true), [])

  return (
    <header>
      <nav>
        {/* Language is changed via link with locale tag */}
        <p>{locale}</p> 
        {/* mounted detecting a render on the server */}
        <p onClick={() => {setTheme(theme === 'light' ? 'dark' : 'light')}}>{ mounted && (theme == 'light' ? 'Dark' : 'Light') }</p>
      </nav>
    </header>
  )
}

export default NavBar
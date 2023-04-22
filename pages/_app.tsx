import '../styles/index.css'
import Navbar from '../components/Navbar.tsx'
import { ThemeProvider } from "next-themes"
import type { AppProps } from 'next/app'
import "@fontsource/inter";


function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider defaultTheme="system" enableSystem={true} attribute="class">
      <div className='wrapper'>
        <Navbar/>
        <main>
          <Component {...pageProps} />
        </main>
        <footer>
          <p>© ilfey 2022-2023</p>
          <a href="https://github.com/ilfey/Devpage">Source code</a>
      </footer>
      </div>
    </ThemeProvider>
  )
}

export default MyApp
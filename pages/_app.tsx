import '../styles/global.css'
import Navbar from '../components/Navbar.tsx'
import { ThemeProvider } from "next-themes"
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider defaultTheme="system" enableSystem={true} attribute="class">
      <div className="">
        <Navbar />
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  )
}
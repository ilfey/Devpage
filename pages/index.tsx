//import { useRouter } from 'next/router'
import Navbar from '@components/Navbar'
import Head from 'next/head'

export default function IndexPage() {
	//const router = useRouter()
	//const { locale, locales, defaultLocale } = router
	return (
		<>
			<Head>
				<title>ilfey</title>
				<meta property='og:title' content="ilfey's devpage" />
				<meta property='og:url' content='https://ilfey.ru' />
				<meta property='og:description' content='Страница разработчика - ilfey' />
				<meta name='description' content='Страница разработчика - ilfey' />
				<meta property='og:image' content='/favicon-x128.png' />
			</Head>
			<Navbar />
			<h1>Hello world!</h1>
		</>
	)
}

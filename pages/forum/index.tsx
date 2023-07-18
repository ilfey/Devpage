import Navbar from '@widgets/Navbar'
import Head from 'next/head'

export default function IndexPage() {
	return (
		<div className='max-w-5xl mx-auto space-2'>
			<Head>
				<title>ilfey</title>
				<meta property='og:title' content="ilfey's forum" />
				<meta property='og:url' content='https://ilfey.ru/forum' />
				<meta property='og:description' content='Форум разработчика - ilfey' />
				<meta name='description' content='Форум разработчика - ilfey' />
				<meta property='og:image' content='/favicons/x256.png' />
			</Head>

			<Navbar />

			<main>
				<h1 className='text-2xl text-center leading-10 font-bold'>Форум</h1>
			</main>
		</div>
	)
}

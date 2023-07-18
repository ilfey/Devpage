import Navbar from '@widgets/Navbar'
import Head from 'next/head'

export default function IndexPage() {
	return (
		<div className='max-w-5xl mx-auto space-2'>
			<Head>
				<title>ilfey</title>
				<meta property='og:title' content="ilfey's devpage" />
				<meta property='og:url' content='https://ilfey.ru' />
				<meta property='og:description' content='Страница разработчика - ilfey' />
				<meta name='description' content='Страница разработчика - ilfey' />
				<meta property='og:image' content='/favicons/x256.png' />
			</Head>

			<Navbar />

			<main>
				<h1 className='text-2xl text-center font-bold'>Главная</h1>
			</main>
		</div>
	)
}

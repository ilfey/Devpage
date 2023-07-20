import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang='ru'>
				<Head>
					<link rel='manifest' href='/manifest.json' />
					<meta name='theme-color' content='#18181b' />
					<link rel='icon' href='/favicons/x32.png' sizes='32x32' />
					<link rel='apple-touch-icon' href='/pwa-icons/x192.png' sizes='192x192' />
					<link rel='icon' href='/favicons/x64.png' sizes='64x64' />
					<link rel='icon' href='/favicons/x128.png' sizes='128x128' />
					<link rel='icon' href='/favicons/x256.png' sizes='256x256' />
					<link rel='icon' href='/favicons/x512.png' sizes='512x512' />
				</Head>
				<body className='h-screen px-4 transition-colors bg-gray-200 text-black dark:text-white dark:bg-gray-900 font-nunito-sans'>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

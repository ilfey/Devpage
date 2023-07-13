import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link rel='icon' href='/favicon-x32.png' sizes='32x32' />
					<link rel='icon' href='/favicon-x64.png' sizes='64x64' />
					<link rel='icon' href='/favicon-x128.png' sizes='128x128' />
					<link rel='icon' href='/favicon-x256.png' sizes='256x256' />
					<link rel='icon' href='/favicon-x512.png' sizes='512x512' />
				</Head>
				<body className='h-screen font-roboto'>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

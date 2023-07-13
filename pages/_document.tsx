import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					{/* TODO: add x32, x256 and x512 */}
					<link rel='icon' href='/favicon-x64.png' sizes='64x64' />
					<link rel='icon' href='/favicon-x128.png' sizes='128x128' />
				</Head>
				<body className='h-screen'>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

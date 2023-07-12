import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon-x64.png" />
          <link rel="icon" href="/favicon-x128.png" />
        </Head>
        <body>
          <Main/>
          <NextScript />
        </body>
      </Html>
    )
  }
}
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang='en'>
				<Head>
					<link
						rel='preload'
						href='/fonts/inter-var-latin.woff2'
						as='font'
						type='font/woff2'
						crossOrigin='anonymous'
					/>
					<link href='/static/favicon.ico' rel='shortcut icon' />
				</Head>

				<Main />
				<NextScript />
			</Html>
		);
	}
}

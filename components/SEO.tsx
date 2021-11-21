import Head from 'next/head';
import { useRouter } from 'next/router';

export default function SEO({ title = '', description = '' }) {
	const router = useRouter();

	const meta = {
		title: title ? `Apple Domains - ${title}` : 'Apple Domains',
		description: description || 'Find a wide variety of domains owned by Apple.',
		type: 'website'
	};

	return (
		<Head>
			<title>{meta.title}</title>
			<meta name="robots" content="follow, index" />
			<meta content={meta.description} name="description" />
			<meta property="og:url" content={`https://apple-domains.vercel.app${router.asPath}`} />
			<link rel="canonical" href={`https://apple-domains.vercel.app${router.asPath}`} />
			<meta property="og:type" content={meta.type} />
			<meta property="og:site_name" content="Apple Domains" />
			<meta property="og:description" content={meta.description} />
			<meta property="og:title" content={meta.title} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={meta.title} />
			<meta name="twitter:description" content={meta.description} />
		</Head>
	)
}

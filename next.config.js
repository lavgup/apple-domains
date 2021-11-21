module.exports = {
	swcMinify: true,
	experimental: {
		// Required for reading file from API route on Vercel
		nftTracing: true
	},
	reactStrictMode: true
}

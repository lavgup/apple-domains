# Apple Domains
A readable and configurable list of domains owned by Apple.

### Stack
* Framework: **Next.js** w/ **React**
* Styling: **TailwindCSS**
* Component Library: **Headless UI**
* Data Fetching: **SWR**
* Deployment: **Vercel**

### How it works
I expose an API route ([`/api/domains`](https://apple-domains.vercel.app/api/domains)) that the frontend parses and renders - pretty simple stuff.

### Contributing
If you want to add a missing domain to the app, send in a PR editing the [`data/domains.json`](./data/domains.json) file. I may add a more streamlined process to submit domains using a UI on the website in the future, who knows.

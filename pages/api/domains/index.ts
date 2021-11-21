import { NextApiRequest, NextApiResponse } from 'next';

import domains from '../../../data/domains.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') return res.status(405).json({
		error: 'Method not allowed'
	});

	let all = Object.values(domains)
		.map(d => {
			return Object.values(d)
				.filter(Array.isArray)
				.reduce((a: string[], b: string[]) => a.concat(b), [])
		}).flat();
	all = [...new Set(all)]

	const final = {
		domains: all,
		tags: Object.keys(domains),
		total: all.length
	}

	res.status(200).json(final);
}

import { NextApiRequest, NextApiResponse } from 'next';

import domains from '../../../data/domains.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') return res.status(405).json({
		error: 'Method not allowed'
	});

	const tag = req.query.tag as keyof typeof domains;

	if (!domains?.[tag]) return res.status(404).json({
        error: 'Tag category not found'
    });

	const obj = domains[tag];

	let all = Object.values(obj)
		.filter(Array.isArray)
		.reduce((a: string[], b: string[]) => a.concat(b), []);
	all = [...new Set(all)]

	let total = 0;

	Object.values(domains)
		.forEach(d => {
			Object.values(d)
				.filter(Array.isArray)
				.filter((el, pos, self) => self.indexOf(el) === pos )
				.forEach(a => total += a.length)
		});

	const final = {
		domains: all,
		tags: Object.keys(domains),
		total: total
	};

	res.status(200).json(final);
}

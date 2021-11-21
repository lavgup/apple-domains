import { NextApiRequest, NextApiResponse } from 'next';

import fs from 'node:fs/promises';
import path from 'node:path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') return res.status(405).json({
		error: 'Method not allowed'
	});

	const file = await fs.readFile(path.join(process.cwd(), 'data', 'domains.json'));
	const domains = JSON.parse(file.toString());

	res.status(200).json(domains);
}

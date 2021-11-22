function getAllDomains(domains) {
	const arr = Object.values(domains)
		.map(d => {
			return Object.values(d)
				.filter(Array.isArray)
				.reduce((a: string[], b: string[]) => a.concat(b), [])
		}).flat();

	return [...new Set(arr)];
}

interface Parsed {
	domains: string[],
	tags: string[],
	total: number
}

export function parseAll(domains): Parsed {
	let all = getAllDomains(domains);

	return {
		domains: all,
		tags: Object.keys(domains),
		total: all.length
	};
}

export function parseCategory(domains, tag): Parsed {
	const obj = domains[tag];

	let category = Object.values(obj)
		.filter(Array.isArray)
		.reduce((a: string[], b: string[]) => a.concat(b), []);
	category = [...new Set(category)];

	return {
		domains: category,
		tags: Object.keys(domains),
		total: getAllDomains(domains).length
	}
}

function getAllDomains(domains, dormant = null) {
	const arr = Object.entries(domains)
		.map(([k, v]) => {
			return Object.values(v)
				.filter(Array.isArray)
				.reduce((a: string[], b: string[]) => {
					if (k === 'dormant' && dormant === true) return [];
					return a.concat(b)
				}, [])
		}).flat();

	return [...new Set(arr)];
}

interface Parsed {
	domains: string[],
	tags: string[],
	total: number
}

export function parseAll(domains, dormant): Parsed {
	let all = getAllDomains(domains, dormant);

	return {
		domains: all,
		tags: Object.keys(domains),
		total: all.length
	};
}

export function parseCategory(domains, tag): Parsed {
	const obj = domains[tag];
	if (!obj) return null;

	let category = Object.values(obj)
		.filter(Array.isArray)
		.reduce((a: string[], b: string[]) => a.concat(b), []);
	category = [...new Set(category)];

	return {
		domains: category,
		tags: Object.keys(domains),
		total: getAllDomains(domains).length
	};
}

import useSWR from 'swr';
import { useRouter } from 'next/router';
import Tag from '../components/Tag';
import { useEffect, useState } from 'react';
import Domain from '../components/Domain';
import DomainCounter from '../components/DomainCounter';
import SEO from '../components/SEO';
import FilterPopup from '../components/FilterPopup';

import { useTldStore } from '../store/tlds';

const fetcher = async (input: RequestInfo, init?: RequestInit) => {
	const res = await fetch(input, init);

	return res.json();
}

// This is a mess!
export default function Home() {
	const router = useRouter();
	const { data } = useSWR('/api/domains', fetcher);

	let filtered = {};

	const tag = router.query?.tag as string;
	if (tag) filtered = data?.[tag] ?? {};

	// Redirect to homepage if tag doesn't exist
	useEffect(() => {
		if (tag && data && !Object.keys(filtered).length) {
			router.replace('/');
		}
	}, [tag, filtered]);

	const all = [];

	if (data) {
		Object.values(data)
			.forEach(obj =>
				Object.keys(obj)
					.filter(key => !key.startsWith('_'))
					.filter(key => Array.isArray(obj[key]))
					.forEach(key => {
						all.push(...obj[key]);
					})
			);
	}

	const filteredAll = [];

	const [searchValue, setSearchValue] = useState('');

	if (Object.keys(filtered).length) {
		Object.keys(filtered)
			.filter(key => !key.startsWith('_'))
			.filter(key => Array.isArray(filtered[key]))
			.forEach(key => {
				filteredAll.push(...filtered[key]);
			})
	}

	let display = filteredAll.length ? filteredAll : all;
	display = [...new Set(display)];

	const excludedTlds = useTldStore(state => state.excluded);
	const filteredTld = display.filter(d => !excludedTlds.some(e => d.endsWith(e)));

	const filteredSearch = filteredTld.filter(d => d.includes(searchValue.toLowerCase()));

	return (
		<div className="flex flex-col h-screen justify-between">
			<div
				className="flex flex-col items-start justify-center w-full max-w-4xl px-6 pt-6 mx-auto sm:pt-6 md:pt-10 lg:pt-12">
				<SEO />

				<div className="flex flex-row flex-wrap gap-3">
					<h1 className="text-3xl font-bold">
						Apple Domains
					</h1>
					<DomainCounter all={all}
						// meh
						           filtered={tag ? filteredAll : all}
						           filteredResults={filteredSearch}
						           tag={tag}
					/>
				</div>
				<p className="mt-6 md:mt-3">Compiled list of domains owned by Apple.</p>

				<div className="relative w-full mt-3">
					<input
						aria-label="Search domains"
						type="text"
						onChange={(e) => setSearchValue(e.target.value)}
						placeholder="Search domains"
						className="block w-full px-4 py-1 text-gray-900 bg-white border border-gray-200 rounded-md text-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500"
					/>

					<SearchIcon />
				</div>

				<hr className="w-full my-5 border-gray-300 rounded-lg" />

				<div className="flex flex-row flex-wrap justify-between w-full mt-2 mb-2">
					<div className="flex flex-row flex-wrap mb-2">
						<Tag tag="all" />
						{data && Object.keys(data).map(k => (
							<Tag key={k} tag={k} />
						))}
					</div>

					<FilterPopup domains={display} />
				</div>

				<div className="container mt-2">
					<div className="flex flex-wrap">
						{filteredSearch?.length
							? filteredSearch.map(d => (
								<Domain domain={d} />
							))
							: (
								<p>
									No domains found.
								</p>
							)
						}
					</div>
				</div>
			</div>

			<div className="flex flex-col justify-center w-full max-w-4xl px-6 py-6 mb-2 mx-auto">
				<hr className="w-full border-gray-300 rounded-lg" />

				<div className="flex flex-row justify-between bottom-0 w-full mt-8">
					<div>
						Built by <a className="font-medium" href="https://lavya.me">Lav</a>
					</div>
					<div>
						<a className="flex flex-row align-middle" href="https://github.com/lavgup/apple-domains">
							Contribute on
							<GitHubIcon className="w-5 h-5 ml-2" />
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

function SearchIcon() {
	return (
		<svg
			className="absolute w-5 h-5 text-gray-400 top-2 right-3"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
			/>
		</svg>
	)
}

function GitHubIcon(props) {
	return (
		<svg
			{...props}
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
			/>
		</svg>)
}

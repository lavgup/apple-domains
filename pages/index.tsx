import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import SEO from '@components/SEO';
import DomainCounter from '@components/DomainCounter';
import Tag from '@components/Tag';
import FilterPopup from '@components/FilterPopup';
import Domain from '@components/Domain';

import { useTldStore } from '@store/tlds';

import data from '@data/domains.json';
import GitHubIcon from '@components/icons/github';
import SearchIcon from '@components/icons/search';

const variants = {
	initial: {
		opacity: 0,
		y: 8
	},
	enter: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.4,
			ease: [0.61, 1, 0.88, 1]
		}
	}
}

export default function Home() {
	const router = useRouter();
	const [searchValue, setSearchValue] = useState('');

	const tag = (router.query.tag as string)?.toLowerCase();

	useEffect(() => {
		window.onkeydown = (e) => {
			if (e.key === ' ' && e.target?.attributes.domain) {
				e.preventDefault();
				e.target.click();
			}
		}
	});

	let domains;

	if (tag === 'dormant' || tag === 'active') domains = data[tag];
	else domains = [...data.active, ...data.dormant];

	const excludedTlds = useTldStore(state => state.excluded);

	const filtered = domains
		.filter(d => d.includes(searchValue.toLowerCase()))
		.filter(d => !excludedTlds.some(e => d.endsWith(e)));

	return (
		<div className="flex flex-col justify-between h-screen">
			<div
				className="flex flex-col items-start justify-center w-full max-w-4xl px-6 pt-6 mx-auto sm:pt-6 md:pt-10 lg:pt-12">
				<SEO />

				<div className="flex flex-row flex-wrap gap-3 items-baseline">
					<h1 className="text-3xl font-bold">
						Apple Domains
					</h1>

					<DomainCounter
						total={data.active.length + data.dormant.length}
						domains={domains.length}
						filtered={filtered?.length}
						tag={tag}
					/>
				</div>
				<p className="mt-6 md:mt-3">Compiled list of domains owned by Apple.</p>

				<div className="relative w-full mt-3">
					<input
						tabIndex={1}
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
						<Tag tabIndex={2} tag="all" />
						<Tag tabIndex={3} tag="active" />
						<Tag tabIndex={4} tag="dormant" />
					</div>

					<FilterPopup domains={domains} />
				</div>

				<div className="container mt-2">
					{filtered?.length
						? (
							<motion.div
								animate="enter"
								initial="initial"
								variants={variants}
								className="flex flex-wrap"
							>
								{filtered.map((d, idx) => (
									<Domain
										key={idx}
										idx={idx}
										domain={d.replace(/https?:\/\//, '')}
									/>
								))}
							</motion.div>
						)
						: (
							<p className="text-gray-500 italic font-medium">
								No domains found.
							</p>
						)
					}
				</div>
			</div>

			<div className="flex flex-col justify-center w-full max-w-4xl px-6 py-10 mx-auto">
				<hr className="w-full border-gray-300 rounded-lg" />

				<div className="bottom-0 flex flex-row justify-between w-full mt-10">
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
	);
}

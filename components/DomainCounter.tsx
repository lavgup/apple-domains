export default function DomainCounter({ all, filtered, filteredResults, tag }) {
	const diff = (a1, a2) => a1.filter(x => !a2.includes(x));

	return (
		<div className="self-center">
			<span className="font-semibold text-gray-600">{all.length}</span>
			<span className="ml-0.5 text-xs text-gray-400">ALL</span>
			{tag && filtered.length > 0 && (
				<>
					<span className="mx-2 text-sm text-gray-500">/</span><span
					className="font-semibold text-gray-600">{filtered.length}</span><span
					className="ml-1 text-xs text-gray-400 uppercase">{tag}</span>
				</>
			)}
			{diff(filtered, filteredResults).length > 0 && (
				<>
					<span className="mx-2 text-sm text-gray-500">/</span><span
                    className="font-semibold text-gray-600">{diff(filtered, filteredResults).length}</span><span
                    className="ml-1 text-xs text-gray-400 uppercase">FILTERED</span>
				</>
			)}
		</div>
	)
}

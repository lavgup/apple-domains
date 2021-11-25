export default function DomainCounter({ total, domains, filtered, tag }) {
	return (
		<div className="self-center">
			<span className="font-semibold text-gray-600">{total}</span>
			<span className="ml-0.5 text-xs text-gray-400">ALL</span>
			{tag && domains < total && (
				<>
					<span className="mx-2 text-sm text-gray-500">/</span><span
					className="font-semibold text-gray-600">{domains}</span><span
					className="ml-1 text-xs text-gray-400 uppercase">{tag}</span>
				</>
			)}
			{domains > filtered && (
				<>
					<span className="mx-2 text-sm text-gray-500">/</span><span
                    className="font-semibold text-gray-600">{filtered}</span><span
                    className="ml-1 text-xs text-gray-400 uppercase">FILTERED</span>
				</>
			)}
		</div>
	);
}

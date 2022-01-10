import Link from 'next/link';

export default function Tag({ tag, tabIndex }: { tag: string, tabIndex: number }) {
	return (
		<Link href={tag === 'all' ? '/' : `/?tag=${tag.toLowerCase()}`}>
			<a>
				<div
					tabIndex={tabIndex}
					className="rounded-md text-gray-500 bg-[#DCDCE0] hover:bg-gray-200 px-2 py-0.5 mr-1"
				>
					{tag}
				</div>
			</a>
		</Link>
	);
}

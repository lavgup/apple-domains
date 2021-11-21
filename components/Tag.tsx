import Link from 'next/link';

export default function Tag(
	{ tag }: {
		tag: string
	}
) {

	return (
		<Link href={tag === 'all' ? '/' : `/?tag=${tag.toLowerCase()}`}>
			<a>
				<div className="rounded-md text-gray-500 bg-[#DCDCE0] hover:bg-gray-200 px-2 mr-1 mt-1">
					{tag}
				</div>
			</a>
		</Link>
	);
}

export default function Domain(props) {
	return (
		<a key={props.domain} href={`https://${props.domain}`} target="_blank" rel="noopener noreferrer" className="mb-2 mr-8">
			<div
				{...props}
				className="flex justify-center flex-initial w-full px-2 py-2 text-sm font-medium text-gray-600 bg-gray-300 hover:bg-gray-200 box-content rounded-md md:text-md"
			>
				<div>
					{props.domain}
				</div>
			</div>
		</a>
	);
}

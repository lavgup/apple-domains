import { Switch } from '@headlessui/react';
import { useTldStore } from '../store/tlds';

export default function TldSwitch({ tld, excluded }) {
	const currentlyExcluded = excluded.includes(tld);

	const add = useTldStore(state => state.add);
	const remove = useTldStore(state => state.remove);

	return (
		<Switch
			className={`${
				currentlyExcluded ? 'bg-blue-200' : 'bg-blue-500'
			} h-5 w-10 rounded-full ml-2`}
			checked={currentlyExcluded}
			onChange={() => currentlyExcluded ? remove(tld) : add(tld)}
		>
			<span className="sr-only">
                {excluded.includes(tld) ? 'Remove' : 'Add'}
            </span>

			<span
				aria-hidden="true"
				className={`${excluded.includes(tld) ? '-translate-x-2.15' : 'translate-x-2.2'}
            pointer-events-none inline-block h-5 w-6 rounded-full bg-white shadow-lg ring-0 transition ease-in-out duration-200`}
			/>
		</Switch>
	);
}

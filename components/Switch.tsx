import { Switch } from '@headlessui/react';

import { useDormantStore } from '@store/dormant';
import { useTldStore } from '@store/tlds';

function MainSwitch({ checked, ...props }) {
	return (
		<Switch
			{...props}
			className={`${
				checked ? 'bg-blue-200' : 'bg-blue-500'
			} h-5 w-10 rounded-full ${props.className}`}
			checked={checked}
			onChange={props.onChange}
		>
			<span className="sr-only">
				{props.sr}
			</span>

			<span
				aria-hidden="true"
				className={`${
					checked ? '-translate-x-2.15' : 'translate-x-2.2'
				} pointer-events-none inline-block h-5 w-6 rounded-full bg-white shadow-lg ring-0 transition ease-in-out duration-200`}
			/>
		</Switch>
	)
}

export function DormantSwitch({ closeModal }) {
	const included = useDormantStore(state => state.included);
	const set = useDormantStore(state => state.set);

	return (
		<MainSwitch
			checked={!included}
			className="mt-3"
			sr="Dormant"
			onChange={() => {
				set(!included);
				closeModal();
			}}
		/>
	);
}

export function TldSwitch({ tld, excluded }) {
	const currentlyExcluded = excluded.includes(tld);

	const exclude = useTldStore(state => state.exclude);
	const include = useTldStore(state => state.include);

	return (
		<MainSwitch
			checked={currentlyExcluded}
			sr={currentlyExcluded ? 'Exclude' : 'Include'}
			onChange={() => currentlyExcluded ? include(tld) : exclude(tld)}
		/>
	);
}

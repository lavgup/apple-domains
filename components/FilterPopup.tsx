import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import { useTldStore } from '../store/tlds';
import extractTld from 'tld-extract';
import TldSwitch from './Switch';

export default function FilterPopup({ domains }) {
	const [isOpen, setIsOpen] = useState(false);

	const closeModal = () => setIsOpen(false);
	const openModal = () => setIsOpen(true);

	const tlds = [...new Set(domains.map(d => extractTld(`https://${d}`).tld))];

	const excluded = useTldStore(state => state.excluded);
	const remove = useTldStore(state => state.remove);

	const closeButtonRef = useRef(null);

	return (
		<>
			<div className="relative inline-block text-left text-right">
				<button
					type="button"
					onClick={openModal}
					className="flex flex-row pl-3 pr-2 mt-1 pt-0.75 pb-0.75 justify-between text-sm font-medium text-gray-500 bg-[#DCDCE0] rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
					Filter

					<FilterIcon className="h-5 w-5 ml-1.5" />
				</button>
			</div>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					initialFocus={closeButtonRef}
					className="fixed inset-0 z-10 overflow-y-auto"
					onClose={closeModal}
				>
					<div className="min-h-screen px-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0" />
						</Transition.Child>

						{/* This element is to trick the browser into centering the modal contents. */}
						<span
							className="inline-block h-screen align-middle"
							aria-hidden="true"
						>
              &#8203;
            </span>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<div
								className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle bg-white shadow-2xl transition-all transform rounded-2xl">
								<Dialog.Title
									as="h3"
									className="text-lg font-medium text-gray-900 leading-6"
								>
									Filters
								</Dialog.Title>
								<Dialog.Description as="p" className="mt-2 text-sm text-gray-500">
									Filter domain name results.
								</Dialog.Description>

								<hr className="w-full mt-2.5" />

								<div className="flex flex-row mt-4">
									<h4 className="font-medium text-md leading-6">TLDs</h4>

									<button
										className="text-xs ml-2 inline-block bg-red-200 px-1.5 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-red-300 rounded-md"
										disabled={!excluded.length}
										onClick={() => {
											closeModal();
											excluded.forEach(remove);
										}}
									>
										<p className="">
											Revert
										</p>
									</button>
								</div>

								<div className="mt-2 grid sm:grid-cols-2 md:grid-cols-2 gap-1">
									{tlds.map((t: string, idx: number) => (
										<div key={idx} className="mt-0.5 flex flex-row justify-between align-baseline">
											<p className="row-start-1">
												.{t}
											</p>
											<div className="xs:mr-24 md:mr-10">
												<TldSwitch
													tld={t}
													excluded={excluded}
												/>
											</div>
										</div>
									))}
								</div>

								<div className="mt-4">
									<button
										type="button"
										ref={closeButtonRef}
										className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
										onClick={closeModal}
									>
										Close
									</button>
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</>
	)
}

function FilterIcon(props) {
	return (
		<svg
			{...props}
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
			/>
		</svg>
	)
}

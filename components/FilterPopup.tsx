import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import { useTldStore } from '@store/tlds';
import extractTld from 'tld-extract';
import { TldSwitch } from './Switch';
import CloseIcon from '@components/icons/close';
import FilterIcon from '@components/icons/filter';
import SearchIcon from '@components/icons/search';

export default function FilterPopup({ domains }) {
	const [searchValue, setSearchValue] = useState('');
	const [isOpen, setIsOpen] = useState(false);

	const closeModal = () => setIsOpen(false);
	const openModal = () => setIsOpen(true);

	const tlds = [...new Set(domains?.map(d => extractTld(d).tld))];

	const { excluded, exclude, include } = useTldStore();

	const closeButtonRef = useRef(null);

	const filteredTlds = tlds
		.filter((tld: string) => tld.toLowerCase().includes(searchValue.toLowerCase()))
		.sort();

	return (
		<>
			<div className="relative inline-block text-left text-right">
				<button
					tabIndex={5}
					type="button"
					onClick={openModal}
					className="flex flex-row pl-3 pr-2 mt-1 pt-0.75 pb-0.75 justify-between text-sm font-medium text-gray-500 bg-[#DCDCE0] rounded-md hover:bg-gray-200"
				>
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
								<div className="flex flex-row justify-between">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium text-gray-900 leading-6"
									>
										Filters
									</Dialog.Title>

									<button onClick={closeModal}>
										<CloseIcon
											className="w-5 h-5 mt-0.5"
											aria-hidden="true"
										/>
									</button>
								</div>
								<Dialog.Description as="p" className="mt-2 text-sm text-gray-500">
									Filter domain name results.
								</Dialog.Description>

								<hr className="w-full mt-2.5" />

								<div className="flex flex-row justify-between mt-4">
									<div className="flex flex-row">
										<h4 className="font-medium text-md leading-6">TLDs</h4>

										<button
											className="text-xs ml-2 inline-block px-1.5 bg-red-200 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-red-300 rounded-md"
											disabled={filteredTlds.length !== tlds.length ? false : !excluded.length}
											onClick={() => {
												excluded.forEach(include);
												setSearchValue('');
											}}
										>
											Revert
										</button>
									</div>

									<div>
										<button
											className="text-xs inline-block bg-blue-200 p-1.5 disabled:cursor-not-allowed hover:bg-blue-300 rounded-md"
											onClick={() => {
												tlds.forEach((tld: string) => {
													if (excluded.includes(tld)) include(tld);
													else exclude(tld);
												})
											}}
										>
											Toggle all
										</button>
									</div>
								</div>

								<div className="relative w-full mt-2 text-sm">
									<input
										tabIndex={1}
										value={searchValue}
										aria-label="Search"
										type="text"
										onChange={(e) => setSearchValue(e.target.value)}
										placeholder="Search"
										className="block w-full px-3 py-1 text-gray-900 bg-white border border-gray-200 rounded-md text-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500"
									/>

									<SearchIcon />
								</div>

								<div
									className="mt-3 grid sm:grid-cols-2 max-h-64 md:max-h-72 lg:max-h-[24rem] md:grid-cols-2 gap-1 overflow-x-auto">
									{filteredTlds?.map((t: string, idx: number) => (
										<div key={idx}
										     className="mt-0.5 flex flex-row justify-between align-baseline mr-8"
										>
											<p className="row-start-1">
												.{t}
											</p>
											<div className="transition-colors">
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
	);
}

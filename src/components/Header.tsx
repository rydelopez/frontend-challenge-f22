import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
	ChevronDownIcon,
	MinusIcon,
	PlusIcon,
	FunnelIcon,
} from "@heroicons/react/20/solid";

const sortOptions = [
	{ name: "Number: Low to High", current: true },
	{ name: "Number: High to Low", current: false },
];
const filters = [
	{
		id: "number",
		name: "Course Number",
		options: [
			{ value: "1XX", label: "1XX", checked: true },
			{ value: "2XX", label: "2XX", checked: true },
			{ value: "3XX", label: "3XX", checked: true },
			{ value: "4XX", label: "4XX", checked: true },
		],
	},
];

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export default function Header(props: {
	setFilters: any;
	setSearch: any;
	setSortOptions: any;
}) {
	const { setFilters, setSearch, setSortOptions } = props;
	const [filtersOpen, setFiltersOpen] = useState(false);

	useEffect(() => {
		setFilters(filters);
		setSortOptions(sortOptions);
	}, []);

	const handleSearch = (e: any) => {
		setSearch(e.target.value);
	};

	return (
		<>
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
					<div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
						<div className="flex flex-shrink-0 items-center">
							<a href="#">
								<img
									className="block h-8 w-auto"
									src="/logo.png"
									alt="Penn Course Cart"
								/>
							</a>
						</div>
					</div>
					<div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
						<div className="flex items-center font-poppins px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
							<div className="w-full">
								<label htmlFor="search" className="sr-only">
									Search
								</label>
								<div className="relative">
									<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
										<MagnifyingGlassIcon
											className="h-5 w-5 text-gray-400"
											aria-hidden="true"
										/>
									</div>
									<input
										id="search"
										name="search"
										className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-mainBlue focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
										placeholder="Search"
										type="search"
										onChange={handleSearch}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="flex items-center justify-end xl:col-span-4">
						<Transition.Root show={filtersOpen} as={Fragment}>
							<Dialog
								as="div"
								className="relative z-40"
								onClose={setFiltersOpen}
							>
								<Transition.Child
									as={Fragment}
									enter="transition-opacity ease-linear duration-300"
									enterFrom="opacity-0"
									enterTo="opacity-100"
									leave="transition-opacity ease-linear duration-300"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<div className="fixed inset-0 bg-black bg-opacity-25" />
								</Transition.Child>

								<div className="fixed inset-0 z-40 flex">
									<Transition.Child
										as={Fragment}
										enter="transition ease-in-out duration-300 transform"
										enterFrom="translate-x-full"
										enterTo="translate-x-0"
										leave="transition ease-in-out duration-300 transform"
										leaveFrom="translate-x-0"
										leaveTo="translate-x-full"
									>
										<Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
											<div className="flex items-center justify-between px-4">
												<h2 className="text-lg font-poppins font-light text-gray-900">
													Filters
												</h2>
												<button
													type="button"
													className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
													onClick={() => {
														setFiltersOpen(false);
														setFilters([...filters]);
													}}
												>
													<span className="sr-only">Close menu</span>
													<XMarkIcon className="h-6 w-6" aria-hidden="true" />
												</button>
											</div>

											{/* Filters */}
											<form className="mt-4 border-t border-gray-200">
												{filters.map((section) => (
													<Disclosure
														as="div"
														key={section.id}
														className="border-t border-gray-200 px-4 py-6"
													>
														{({ open }) => (
															<>
																<h3 className="-mx-2 -my-3 flow-root">
																	<Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
																		<span className="font-poppins font-light text-gray-900">
																			{section.name}
																		</span>
																		<span className="ml-6 flex items-center">
																			{open ? (
																				<MinusIcon
																					className="h-5 w-5"
																					aria-hidden="true"
																				/>
																			) : (
																				<PlusIcon
																					className="h-5 w-5"
																					aria-hidden="true"
																				/>
																			)}
																		</span>
																	</Disclosure.Button>
																</h3>
																<Disclosure.Panel className="pt-6">
																	<div className="space-y-6">
																		{section.options.map(
																			(option, optionIdx) => (
																				<div
																					key={option.value}
																					className="flex items-center"
																				>
																					<input
																						id={`filter-mobile-${section.id}-${optionIdx}`}
																						name={`${section.id}[]`}
																						defaultValue={option.value}
																						type="checkbox"
																						defaultChecked={option.checked}
																						onChange={(e) => {
																							option.checked = e.target.checked;
																						}}
																						className="h-4 w-4 rounded border-gray-300 text-mainBlue focus:ring-mainBlue"
																					/>
																					<label
																						htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
																						className="ml-3 min-w-0 flex-1 font-light font-poppins text-gray-500"
																					>
																						{option.label}
																					</label>
																				</div>
																			)
																		)}
																	</div>
																</Disclosure.Panel>
															</>
														)}
													</Disclosure>
												))}
											</form>
										</Dialog.Panel>
									</Transition.Child>
								</div>
							</Dialog>
						</Transition.Root>
						<Menu as="div" className="relative inline-block text-left">
							<div>
								<Menu.Button className="group inline-flex justify-center text-sm font-poppins font-medium text-gray-700 hover:text-gray-900">
									Sort
									<ChevronDownIcon
										className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
										aria-hidden="true"
									/>
								</Menu.Button>
							</div>

							<Transition
								as={Fragment}
								enter="transition ease-out duration-100"
								enterFrom="transform opacity-0 scale-95"
								enterTo="transform opacity-100 scale-100"
								leave="transition ease-in duration-75"
								leaveFrom="transform opacity-100 scale-100"
								leaveTo="transform opacity-0 scale-95"
							>
								<Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
									<div className="py-1">
										{sortOptions.map((option) => (
											<Menu.Item key={option.name}>
												{({ active }) => (
													<button
														className={classNames(
															option.current
																? "font-poppins font-medium text-gray-900"
																: "text-gray-500",
															active ? "bg-gray-100" : "",
															"block px-4 py-2 text-sm"
														)}
														onClick={() => {
															option.current = true;
															sortOptions.forEach((opt) => {
																if (opt.name !== option.name) {
																	opt.current = false;
																}
															});
															setSortOptions([...sortOptions]);
															console.log(sortOptions);
														}}
													>
														{option.name}
													</button>
												)}
											</Menu.Item>
										))}
									</div>
								</Menu.Items>
							</Transition>
						</Menu>

						<button
							type="button"
							className="ml-5 flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500"
							onClick={() => setFiltersOpen(true)}
						>
							<span className="sr-only">Filters</span>
							<FunnelIcon className="h-5 w-5" aria-hidden="true" />
						</button>
						<a
							href="/cart"
							className="ml-6 inline-flex items-center rounded-md border border-transparent bg-mainBlue px-4 py-2 text-sm font-medium font-poppins text-white shadow-sm hover:bg-darkBlue"
						>
							Cart
						</a>
					</div>
				</div>
			</div>
		</>
	);
}

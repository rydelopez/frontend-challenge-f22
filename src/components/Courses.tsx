import { useEffect, useState, Fragment, useContext, useMemo } from "react";
import courses from "../data/courses.json";
import { Transition } from "@headlessui/react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { CartContext } from "../lib/CartContext";

export default function Courses(props: {
	filters: any[];
	searchValue: string;
	sortOptions: any[];
}) {
	const { filters, searchValue, sortOptions } = props;
	const { cart, setCart } = useContext(CartContext);
	const [courseData, setCourseData] = useState<any[]>([]);
	const [showCourse, setShowCourse] = useState<string>("");
	const [showAdd, setShowAdd] = useState(false);
	const [showCannotAdd, setShowCannotAdd] = useState(false);

	const filteredCourses = useMemo(() => {
		let filtered = courses;
		if (searchValue) {
			filtered = filtered.filter((course) => {
				if (
					`${course.dept} ${course.number}`
						.toLowerCase()
						.includes(searchValue.toLowerCase())
				) {
					return course;
				}
				return false;
			});
		}
		return filtered.filter((course) => {
			const correctFilter = filters[0]?.options?.filter(
				(option: { value: string }) =>
					option.value === course.number.toString().slice(0, -2) + "XX"
			);
			if (correctFilter && correctFilter[0].checked) {
				return course;
			}
			return false;
		});
	}, [filters, searchValue]);

	useEffect(() => {
		const fetchData = async () => {
			courses.map(({ dept, number }) =>
				fetch(`/api/base/2022A/courses/${dept}-${number}`)
					.then((res) => res.json())
					.then((data) => {
						setCourseData((prev) => [...prev, data]);
					})
			);
		};
		fetchData().catch((err) => console.log(err));
	}, []);

	const renderDifficulty = (dept: string, number: number) => {
		for (let i = 0; i < courseData.length; i++) {
			if (courseData[i].id === `${dept}-${number}`) {
				return Math.round(courseData[i].difficulty * 10) / 10;
			}
		}
	};

	const renderQuality = (dept: string, number: number) => {
		for (let i = 0; i < courseData.length; i++) {
			if (courseData[i].id === `${dept}-${number}`) {
				return Math.round(courseData[i].course_quality * 10) / 10;
			}
		}
	};

	const addToCart = (dept: string, number: number) => {
		if (cart.length < 7) {
			setShowAdd(true);
			setCart((prev: any) => [...prev, `${dept}-${number}`]);
		} else {
			setShowCannotAdd(true);
		}
	};

	const sortCourses = (c: any[]) => {
		if (sortOptions && sortOptions.length > 0) {
			console.log(sortOptions);
			console.log(sortOptions[0].current);
			console.log(sortOptions[1].current);
			if (sortOptions[0].current) {
				return c.sort((a, b) => (a.number < b.number ? -1 : 1));
			} else if (sortOptions[1].current) {
				return c.sort((a, b) => (a.number < b.number ? 1 : -1));
			}
		}
		return c;
	};

	return (
		<>
			<div className="flex flex-row">
				<div className="flex h-[80vh] overscroll-none w-1/2 no-scrollbar">
					<div className="flex flex-1 overflow-y-scroll">
						<ul role="list" className="grid grid-cols-1 gap-6">
							{filters &&
								sortCourses(filteredCourses).map(({ dept, number, title }) => (
									<li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow-md">
										<div className="flex w-full items-center justify-between space-x-6 p-6">
											<div className="flex-1 truncate">
												<div className="flex items-center space-x-3">
													<h3 className="truncate text-md font-poppins font-medium text-gray-900">
														{dept} {number}
													</h3>
												</div>
												<p className="mt-1 truncate text-sm text-gray-500 font-poppins">
													{title}
												</p>
											</div>
											<button
												onClick={(e) => setShowCourse(`${dept}-${number}`)}
												className="flex-shrink-0 inline-flex items-center rounded-md border border-transparent bg-mainBlue px-4 py-2 text-sm font-medium font-poppins text-white shadow-sm hover:bg-darkBlue"
											>
												View Details
											</button>
										</div>
										<div>
											<div className="-mt-px flex divide-x divide-gray-200">
												<div className="flex w-0 flex-1">
													<div className="relative -mr-px hidden md:inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500">
														<div className="flex flex-col font-poppins text-center">
															<p className="text-xs">Difficulty</p>
															<p className="text-sm">
																{renderDifficulty(dept, number)}
															</p>
														</div>
													</div>
												</div>
												<div className="-ml-px flex w-0 flex-1">
													<div className="flex w-0 flex-1">
														<div className="relative -mr-px hidden md:inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500">
															<div className="flex flex-col font-poppins text-center">
																<p className="text-xs">Quality</p>
																<p className="text-sm">
																	{renderQuality(dept, number)}
																</p>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</li>
								))}
						</ul>
					</div>
				</div>
				<div className="flex w-1/2">
					{courses.map(
						({
							dept,
							number,
							title,
							prereqs,
							description,
							"cross-listed": crossListed,
						}) => {
							const cross = crossListed as string[];
							if (showCourse === `${dept}-${number}`) {
								return (
									<div className="flex flex-col mx-5">
										<h1 className="text-md font-poppins font-medium text-gray-900">
											{dept} {number}
										</h1>
										<h2 className="text-sm text-gray-500 font-poppins mt-1">
											{title}
										</h2>
										<p className="font-poppins text-sm text-gray-900 font-light mt-4">
											{description}
										</p>
										{prereqs && (
											<div className="flex flex-col mt-4">
												<p className="flex font-poppins text-sm text-gray-500">
													Prerequisites
												</p>
												{typeof prereqs === "string" ? (
													<p className="flex font-poppins text-sm text-gray-900 font-light">
														{prereqs}
													</p>
												) : (
													prereqs.map((prereq: string) => {
														return (
															<p className="flex font-poppins text-sm text-gray-900 font-light">
																{prereq}
															</p>
														);
													})
												)}
											</div>
										)}
										{cross && (
											<div className="flex flex-col mt-4">
												<p className="flex font-poppins text-sm text-gray-500">
													Cross-Listed
												</p>
												{cross.map((course: string) => {
													return (
														<p className="flex font-poppins text-sm text-gray-900 font-light">
															{course}
														</p>
													);
												})}
											</div>
										)}
										{cart.includes(`${dept}-${number}`) ? (
											<button
												className="w-fit flex-shrink-0 inline-flex items-center rounded-md border border-transparent bg-mainBlue px-4 py-2 text-sm font-medium font-poppins text-white shadow-sm hover:bg-darkBlue mt-4 disabled:text-gray-500 disabled:bg-slate-100"
												disabled
											>
												Add to Cart
											</button>
										) : (
											<button
												onClick={(e) => addToCart(dept, number)}
												className="w-fit flex-shrink-0 inline-flex items-center rounded-md border border-transparent bg-mainBlue px-4 py-2 text-sm font-medium font-poppins text-white shadow-sm hover:bg-darkBlue mt-4"
											>
												Add to Cart
											</button>
										)}
									</div>
								);
							}
						}
					)}
				</div>
			</div>
			<div
				aria-live="assertive"
				className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
			>
				<div className="flex w-full flex-col items-center space-y-4 sm:items-end">
					<Transition
						show={showAdd}
						as={Fragment}
						enter="transform ease-out duration-300 transition"
						enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
						enterTo="translate-y-0 opacity-100 sm:translate-x-0"
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
							<div className="p-4 font-poppins">
								<div className="flex items-start">
									<div className="flex-shrink-0">
										<CheckCircleIcon
											className="h-6 w-6 text-green-400"
											aria-hidden="true"
										/>
									</div>
									<div className="ml-3 w-0 flex-1 pt-0.5">
										<p className="text-sm font-medium text-gray-900">
											Successfully added to cart!
										</p>
										<p className="mt-1 text-sm text-gray-500">
											You can view your cart by closing this window and clicking
											the cart icon in the top right.
										</p>
									</div>
									<div className="ml-4 flex flex-shrink-0">
										<button
											type="button"
											className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
											onClick={() => {
												setShowAdd(false);
											}}
										>
											<span className="sr-only">Close</span>
											<XMarkIcon className="h-5 w-5" aria-hidden="true" />
										</button>
									</div>
								</div>
							</div>
						</div>
					</Transition>
				</div>
			</div>
			<div
				aria-live="assertive"
				className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
			>
				<div className="flex w-full flex-col items-center space-y-4 sm:items-end">
					<Transition
						show={showCannotAdd}
						as={Fragment}
						enter="transform ease-out duration-300 transition"
						enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
						enterTo="translate-y-0 opacity-100 sm:translate-x-0"
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
							<div className="p-4 font-poppins">
								<div className="flex items-start">
									<div className="flex-shrink-0">
										<XCircleIcon
											className="h-6 w-6 text-red-500"
											aria-hidden="true"
										/>
									</div>
									<div className="ml-3 w-0 flex-1 pt-0.5">
										<p className="text-sm font-medium text-gray-900">
											Unable to add course.
										</p>
										<p className="mt-1 text-sm text-gray-500">
											You can only add a max of 7 courses to your cart.
										</p>
									</div>
									<div className="ml-4 flex flex-shrink-0">
										<button
											type="button"
											className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
											onClick={() => {
												setShowCannotAdd(false);
											}}
										>
											<span className="sr-only">Close</span>
											<XMarkIcon className="h-5 w-5" aria-hidden="true" />
										</button>
									</div>
								</div>
							</div>
						</div>
					</Transition>
				</div>
			</div>
		</>
	);
}

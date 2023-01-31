import { useParams } from "react-router-dom";
import courses from "../data/courses.json";

export default function Checkout() {
	const { query } = useParams();

	return (
		<div className="bg-white font-poppins">
			<div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
				<div className="max-w-xl">
					<h1 className="text-base font-medium text-mainBlue">Thank you!</h1>
					<p className="mt-2 text-4xl font-medium tracking-tight sm:text-5xl">
						Your cart has been successfully checked out.
					</p>
					<h2 className="mt-12 text-md font-medium text-gray-900">
						Your courses
					</h2>
				</div>

				<div className="mt-4 border-y border-gray-200">
					<ul
						role="list"
						className="divide-y divide-gray-200 border-t border-b border-gray-200"
					>
						{query &&
							query
								.split(",")
								.map((course: string) => {
									const arr = course.split("-");
									const dept = arr[0];
									const number = arr[1];
									const courseObj = courses.find(
										(c: any) => c.dept === dept && c.number == number
									);
									return courseObj;
								})
								.map((course: any) => (
									<li key={course.number} className="flex py-6">
										<div className="ml-4 flex flex-1 flex-col sm:ml-6">
											<div>
												<div className="flex justify-between">
													<h4 className="text-sm font-medium text-gray-700 hover:text-gray-800">
														{course.dept + " " + course.number}
													</h4>
												</div>
												<p className="mt-1 text-sm text-gray-500">
													{course.title}
												</p>
											</div>
										</div>
									</li>
								))}
					</ul>
				</div>
				<div className="mt-6 text-center text-sm">
					<p>
						<a
							href="/"
							className="ml-1 font-medium text-mainBlue hover:text-darkBlue"
						>
							Go Home
							<span aria-hidden="true"> &rarr;</span>
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}

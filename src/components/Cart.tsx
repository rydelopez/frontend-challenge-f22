import { useContext } from "react";
import courses from "../data/courses.json";
import { CartContext } from "../lib/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
	const { cart, setCart } = useContext(CartContext);
	const navigate = useNavigate();

	const removeCourse = (course: string) => {
		const newCart = cart.filter((c: string) => c !== course);
		setCart(newCart);
	};

	return (
		<div className="bg-white font-poppins">
			<div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:px-0">
				<h1 className="text-center text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl">
					Penn Course Cart
				</h1>

				<form className="mt-12">
					<section aria-labelledby="cart-heading">
						<ul
							role="list"
							className="divide-y divide-gray-200 border-t border-b border-gray-200"
						>
							{cart && cart.length > 0 ? (
								cart
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
														<button
															type="button"
															className="ml-4 text-sm font-medium text-mainBlue hover:text-darkBlue"
															onClick={() =>
																removeCourse(course.dept + "-" + course.number)
															}
														>
															<span>Remove</span>
														</button>
													</div>
													<p className="mt-1 text-sm text-gray-500">
														{course.title}
													</p>
												</div>
											</div>
										</li>
									))
							) : (
								<li className="flex py-6">
									<div className="ml-4 flex flex-1 flex-col sm:ml-6">
										<div>
											<div className="flex justify-between">
												<h4 className="text-sm font-medium text-gray-700 hover:text-gray-800">
													You have no courses in your cart!
												</h4>
											</div>
										</div>
									</div>
								</li>
							)}
						</ul>
					</section>
					{/* Checkout Summary */}
					<section aria-labelledby="summary-heading" className="mt-10">
						<div className="mt-10">
							<button
								onClick={(e) => {
									e.preventDefault();
									navigate(
										`/checkout/${cart.length > 0 ? cart.join(",") : "empty"}`
									);
								}}
								className="w-full rounded-md border border-transparent bg-mainBlue py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-darkBlue focus:outline-none focus:ring-2 focus:ring-darkBlue focus:ring-offset-2 focus:ring-offset-gray-50"
							>
								Checkout
							</button>
						</div>

						<div className="mt-6 text-center text-sm">
							<p>
								or
								<a
									href="/"
									className="ml-1 font-medium text-mainBlue hover:text-darkBlue"
								>
									Continue Adding Courses
									<span aria-hidden="true"> &rarr;</span>
								</a>
							</p>
						</div>
					</section>
				</form>
			</div>
		</div>
	);
}

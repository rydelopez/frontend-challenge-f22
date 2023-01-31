import Header from "./Header";
import Courses from "./Courses";
import { useState } from "react";

export default function Home() {
	const [filters, setFilters] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const [sortOptions, setSortOptions] = useState([]);

	return (
		<>
			<Header
				setFilters={setFilters}
				setSearch={setSearchValue}
				setSortOptions={setSortOptions}
			/>
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 overflow-hidden">
				<h1 className="font-poppins font-light mt-10">Courses</h1>
				<Courses
					filters={filters}
					searchValue={searchValue}
					sortOptions={sortOptions}
				/>
			</div>
		</>
	);
}

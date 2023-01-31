/** @type {import('tailwindcss').Config} */
module.exports = {
	// darkMode: "class",
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		screens: {
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
		},
		extend: {
			fontFamily: {
				poppins: ["Poppins", "sans-serif"],
			},
			colors: {
				mainBlack: "#3A3A5B",
				mainGray: "#8A8CA5",
				lightGray: "#E7E7E8",
				mainBlue: "#209cee",
				darkBlue: "#1d83c5",
				lightBlue: "#ADD8E6",
				maroon: "#7A2048",
				brightMaroon: "#C32148",
			},
		},
	},
	plugins: [],
};

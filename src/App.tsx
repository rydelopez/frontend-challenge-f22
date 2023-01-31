import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Cart from "./components/Cart";
import { CartContext } from "./lib/CartContext";
import { useEffect, useState } from "react";
import Checkout from "./components/Checkout";

function App() {
	const [cart, setCart] = useState(() => {
		const localData = window.localStorage.getItem("cart");
		return localData ? JSON.parse(localData) : [];
	});

	useEffect(() => {
		window.localStorage.setItem("cart", JSON.stringify(cart));
	}, [cart]);

	return (
		<>
			<CartContext.Provider value={{ cart, setCart }}>
				<Routes>
					<Route path="/" element={<Home></Home>}></Route>
					<Route path="/cart" element={<Cart></Cart>}></Route>
					<Route
						path="/checkout/:query"
						element={<Checkout></Checkout>}
					></Route>
				</Routes>
			</CartContext.Provider>
		</>
	);
}

export default App;

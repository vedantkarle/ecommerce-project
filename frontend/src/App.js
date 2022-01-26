import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Cart from "./screens/Cart";
import Home from "./screens/Home";
import Login from "./screens/Login/Login";
import Payment from "./screens/Payment";
import PlaceOrder from "./screens/PlaceOrder";
import ProductDetail from "./screens/ProductDetail";
import Profile from "./screens/Profile";
import Shipping from "./screens/Shipping";

function App() {
	return (
		<div>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/signin' element={<Login />} />
				<Route path='/products/:id' element={<ProductDetail />} />
				<Route path='/cart' element={<Cart />} />
				<Route path='/cart/:id' element={<Cart />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/shipping' element={<Shipping />} />
				<Route path='/payment' element={<Payment />} />
				<Route path='/placeorder' element={<PlaceOrder />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;

import React from "react";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-evenly",
				marginTop: "20px",
			}}>
			{step1 ? (
				<Link to='/signin?redirect=shipping'>Sign In</Link>
			) : (
				<span>Sign In</span>
			)}
			{step2 ? <Link to='/shipping'>Shipping</Link> : <span>Shipping</span>}
			{step3 ? <Link to='/payment'>Payment</Link> : <span>Payment</span>}
			{step4 ? (
				<Link to='/placeorder'>Place Order</Link>
			) : (
				<span>Place Order</span>
			)}
		</div>
	);
};

export default CheckoutSteps;

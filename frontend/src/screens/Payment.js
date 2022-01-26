import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const Payment = () => {
	const cart = useSelector(state => state.cart);
	const { shippingAddress } = cart;

	const [paymentMethod, setPaymentMethod] = useState("PayPal");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const submitHandler = e => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		navigate("/placeorder");
	};

	useEffect(() => {
		if (!shippingAddress) {
			navigate("/shipping");
		}
	}, [shippingAddress, navigate]);

	return (
		<div>
			<CheckoutSteps step1 step2 step3 />
			<div
				className='section-p1'
				style={{
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
				}}>
				<h3 style={{ fontSize: "20px" }}>
					<strong>Payment Method</strong>
				</h3>
				<form onSubmit={submitHandler} style={{ width: "500px" }}>
					<h3>
						<strong>Select Method</strong>
					</h3>
					<div className='control' style={{ marginTop: "10px" }}>
						<label class='radio'>
							<input
								type='radio'
								name='paymentMethod'
								value='Paypal'
								checked
								onChange={e => setPaymentMethod(e.target.value)}
							/>
							Paypal
						</label>
					</div>
					<button
						className='button is-success is-rounded is-fullwidth'
						type='submit'
						style={{ marginTop: "10px" }}>
						Continue
					</button>
				</form>
			</div>
		</div>
	);
};

export default Payment;

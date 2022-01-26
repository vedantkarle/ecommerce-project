import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const Shipping = () => {
	const cart = useSelector(state => state.cart);
	const { shippingAddress } = cart;

	const [address, setAddress] = useState(shippingAddress?.address);
	const [city, setCity] = useState(shippingAddress?.city);
	const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode);
	const [country, setCountry] = useState(shippingAddress?.country);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const submitHandler = e => {
		e.preventDefault();
		dispatch(saveShippingAddress({ address, city, postalCode, country }));
		navigate("/payment");
	};

	return (
		<div>
			<CheckoutSteps step1 step2 />
			<div
				className='section-p1'
				style={{
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
				}}>
				<h3 style={{ fontSize: "20px" }}>
					<strong>Shipping</strong>
				</h3>
				<form onSubmit={submitHandler} style={{ width: "500px" }}>
					<div className='field'>
						<label className='label'>Address</label>
						<div className='control'>
							<input
								className='input is-rounded'
								type='text'
								placeholder='Address'
								value={address}
								onChange={e => setAddress(e.target.value)}
								required
							/>
						</div>
					</div>
					<div className='field'>
						<label className='label'>City</label>
						<div className='control'>
							<input
								className='input is-rounded'
								type='text'
								placeholder='City'
								value={city}
								onChange={e => setCity(e.target.value)}
								required
							/>
						</div>
					</div>
					<div className='field'>
						<label className='label'>Postalcode</label>
						<div className='control'>
							<input
								className='input is-rounded'
								type='text'
								placeholder='Postalcode'
								value={postalCode}
								onChange={e => setPostalCode(e.target.value)}
								required
							/>
						</div>
					</div>
					<div className='field'>
						<label className='label'>Country</label>
						<div className='control'>
							<input
								className='input is-rounded'
								type='text'
								placeholder='Country'
								value={country}
								onChange={e => setCountry(e.target.value)}
								required
							/>
						</div>
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

export default Shipping;

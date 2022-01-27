import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";

const PlaceOrder = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const cart = useSelector(state => state.cart);

	const addDecimals = num => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};

	cart.itemsPrice = addDecimals(
		cart.cartItems.reduce((acc, i) => acc + i.price * i.qty, 0),
	);

	cart.shippingPrice = addDecimals(cart.itemsPrice > 400 ? 0 : 40);

	cart.taxPrice = addDecimals(Number(0.18 * cart.itemsPrice));

	cart.totalPrice = addDecimals(
		Number(cart.itemsPrice) +
			Number(cart.shippingPrice) +
			Number(cart.taxPrice),
	);

	const orderCreate = useSelector(state => state.orderCreate);
	const { order, success, error } = orderCreate;

	const placeOrderHandler = () => {
		dispatch(
			createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			}),
		);
	};

	useEffect(() => {
		if (success) {
			navigate(`/order/${order._id}`);
		}
		//eslint-disable-next-line
	}, [success, navigate]);

	return (
		<div>
			<CheckoutSteps step1 step2 step3 step4 />
			<div className='columns section-p1 is-mobile'>
				<div className='column is-two-thirds'>
					<div>
						<h3>
							<strong>SHIPPING</strong>
						</h3>
						<p>
							<strong>Address:</strong>
							{cart.shippingAddress.address},{cart.shippingAddress.city}{" "}
							{cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
						</p>
					</div>
					<hr />
					<div>
						<h3>
							<strong>PAYMENT METHOD</strong>
						</h3>
						<p>
							<strong>Method: </strong>
							{cart.paymentMethod}
						</p>
					</div>
					<hr />
					<div>
						<h3>
							<strong>ORDER ITEMS</strong>
						</h3>
						{cart?.cartItems.length === 0 ? (
							<article className='message is-danger' style={{ margin: "10px" }}>
								<div className='message-body' style={{ textAlign: "center" }}>
									Your Cart Is Empty
								</div>
							</article>
						) : (
							<div>
								{cart?.cartItems?.map((item, index) => (
									<div className='item' key={index}>
										<div className='image'>
											<img src={item.image} alt='' />
										</div>

										<div className='description'>
											<Link to={`/products/${item.product}`}>
												<span>{item.name}</span>
											</Link>
										</div>

										<div className='quantity'>
											{item.qty} X Rs.{item.price}
										</div>

										<div className='total-price'>
											Rs.{item.qty * item.price}
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
				<div className='column'>
					<div className='card'>
						<div className='card-content'>
							<div>
								<h3>ORDER SUMMARY</h3>
								<hr />
								<div
									style={{ display: "flex", justifyContent: "space-between" }}>
									<div>
										<h3>Items :</h3>
										<h3>Shipping :</h3>
										<h3>Tax :</h3>
										<h3>Total :</h3>
									</div>
									<div>
										<h3>Rs.{cart.itemsPrice}</h3>
										<h3>Rs.{cart.shippingPrice}</h3>
										<h3>Rs.{cart.taxPrice}</h3>
										<h3>Rs.{cart.totalPrice}</h3>
									</div>
								</div>
								<hr />
								{error && (
									<article
										className='message is-danger'
										style={{ margin: "10px" }}>
										<div
											className='message-body'
											style={{ textAlign: "center" }}>
											{error}
										</div>
									</article>
								)}
								<button
									style={{ backgroundColor: "#088178", color: "#fff" }}
									className='button is-medium is-fullwidth'
									onClick={placeOrderHandler}>
									Place Order
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlaceOrder;

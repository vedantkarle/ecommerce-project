import axios from "axios";
import React, { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { getOrderDetails, payOrder } from "../actions/orderActions";
import { ORDER_PAY_RESET } from "../constants/orderConstants";

const PlaceOrder = () => {
	const [sdkReady, setSdkReady] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	const orderDetails = useSelector(state => state.orderDetails);
	const { order, loading, error } = orderDetails;

	const orderPay = useSelector(state => state.orderPay);
	const { loading: loadingPay, success: successPay } = orderPay;

	useEffect(() => {
		const addPaypalScript = async () => {
			const { data: clientId } = await axios.get("/api/config/paypal");
			const script = document.createElement("script");
			script.type = "text/javascript";
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
			script.async = true;
			script.onload = () => {
				setSdkReady(true);
			};
			document.body.appendChild(script);
		};

		if (Object.keys(order).length === 0 || successPay) {
			// dispatch({ type: ORDER_DETAILS_RESET });
			dispatch({ type: ORDER_PAY_RESET });
			dispatch(getOrderDetails(id));
		} else if (!order.isPaid) {
			if (!window.paypal) {
				addPaypalScript();
			} else {
				setSdkReady(true);
			}
		}
	}, [dispatch, id, successPay, order]);

	const successPaymentHandler = paymentResult => {
		dispatch(
			payOrder(id, { ...paymentResult, email_address: order?.user?.email }),
		);
	};

	return loading ? (
		<ClipLoader />
	) : error ? (
		<article className='message is-danger' style={{ margin: "10px" }}>
			<div className='message-body' style={{ textAlign: "center" }}>
				{error}
			</div>
		</article>
	) : (
		<div className='columns section-p1 is-mobile'>
			<div className='column is-two-thirds is-half-mobile'>
				<h3>
					<strong>
						<span class='tag is-success is-large'>ORDER #{order?._id}</span>
					</strong>
				</h3>
				<br />
				<div>
					<h3>
						<strong>SHIPPING</strong>
					</h3>
					<p>
						<strong>Name :</strong> {order?.user.name}
					</p>
					<p>
						<strong>Email : </strong>
						<a href={`mailto:${order?.user.email}`}>{order?.user.email}</a>
					</p>
					<p>
						<strong>Address:</strong>
						{order.shippingAddress.address},{order.shippingAddress.city}{" "}
						{order.shippingAddress.postalCode}, {order.shippingAddress.country}
					</p>
					{order?.isDelivered ? (
						<article className='message is-success' style={{ margin: "10px" }}>
							<div className='message-body' style={{ textAlign: "center" }}>
								Delivered on {order.deliveredAt}
							</div>
						</article>
					) : (
						<article className='message is-danger'>
							<div className='message-body'>Not Delivered</div>
						</article>
					)}
				</div>
				<hr />
				<div>
					<h3>
						<strong>PAYMENT METHOD</strong>
					</h3>
					<p>
						<strong>Method: </strong>
						{order.paymentMethod}
					</p>
					{order?.isPaid ? (
						<article className='message is-success'>
							<div className='message-body'>Paid on {order.paidAt}</div>
						</article>
					) : (
						<article className='message is-danger'>
							<div className='message-body'>Not Paid</div>
						</article>
					)}
				</div>
				<hr />
				<div>
					<h3>
						<strong>ORDER ITEMS</strong>
					</h3>
					{order?.orderItems.length === 0 ? (
						<article className='message is-danger' style={{ margin: "10px" }}>
							<div className='message-body' style={{ textAlign: "center" }}>
								No Order Items
							</div>
						</article>
					) : (
						<div>
							{order?.orderItems?.map((item, index) => (
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

									<div className='total-price'>Rs.{item.qty * item.price}</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
			<div className='column is-half-mobile'>
				<div className='card'>
					<div className='card-content'>
						<div>
							<h3>ORDER SUMMARY</h3>
							<hr />
							<div style={{ display: "flex", justifyContent: "space-between" }}>
								<div>
									<h3>Items :</h3>
									<h3>Shipping :</h3>
									<h3>Tax :</h3>
									<h3>Total :</h3>
								</div>
								<div>
									<h3>Rs.{order.itemsPrice}</h3>
									<h3>Rs.{order.shippingPrice}</h3>
									<h3>Rs.{order.taxPrice}</h3>
									<h3>Rs.{order.totalPrice}</h3>
								</div>
							</div>
						</div>
					</div>
					{!order.isPaid && (
						<div>
							{loadingPay && <h3>Loading...</h3>}
							{!sdkReady ? (
								<h3>Loading...</h3>
							) : (
								<PayPalButton
									amount={(order?.totalPrice / 75).toFixed(2)}
									onSuccess={successPaymentHandler}
								/>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default PlaceOrder;

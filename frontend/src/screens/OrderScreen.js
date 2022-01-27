import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getOrderDetails } from "../actions/orderActions";

const PlaceOrder = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	const orderDetails = useSelector(state => state.orderDetails);
	const { order, loading, error } = orderDetails;

	useEffect(() => {
		dispatch(getOrderDetails(id));
	}, [dispatch, id]);

	return loading ? (
		<h2>Loading...</h2>
	) : error ? (
		<article className='message is-danger' style={{ margin: "10px" }}>
			<div className='message-body' style={{ textAlign: "center" }}>
				{error}
			</div>
		</article>
	) : (
		<div>
			<div className='columns section-p1 is-mobile'>
				<div className='column is-two-thirds'>
					<h3>
						<strong>
							<span class='tag is-success is-large'>ORDER #{order._id}</span>
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
							{order.shippingAddress.postalCode},{" "}
							{order.shippingAddress.country}
						</p>
						{order?.isDelivered ? (
							<article
								className='message is-success'
								style={{ margin: "10px" }}>
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
							<article
								className='message is-success'
								style={{ margin: "10px" }}>
								<div className='message-body' style={{ textAlign: "center" }}>
									Paid on {order.paidAt}
								</div>
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
										<h3>Rs.{order.itemsPrice}</h3>
										<h3>Rs.{order.shippingPrice}</h3>
										<h3>Rs.{order.taxPrice}</h3>
										<h3>Rs.{order.totalPrice}</h3>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlaceOrder;

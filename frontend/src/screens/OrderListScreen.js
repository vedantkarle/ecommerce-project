import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { listOrders } from "../actions/orderActions";

const OrderListScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const orderList = useSelector(state => state.orderList);
	const { loading, error, orders } = orderList;

	const userLogin = useSelector(state => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (!userInfo?.isAdmin) {
			navigate("/signin");
		} else {
			dispatch(listOrders());
		}
	}, [dispatch, navigate, userInfo]);

	return (
		<div className='section-p1'>
			<div
				style={{
					display: "flex",
					justifyContent: "start",
					alignItems: "center",
				}}>
				<div>
					<h3>
						<span className='tag is-primary is-medium'>
							<strong>ORDERS</strong>
						</span>
					</h3>
				</div>
				{/* <div style={{ marginLeft: "10px" }}>
					<button className='button' onClick={createProductHandler}>
						<i className='fas fa-plus'></i>Create Product
					</button>
				</div> */}
			</div>
			<hr />
			{loading ? (
				<ClipLoader />
			) : error ? (
				<article className='message is-danger' style={{ margin: "10px" }}>
					<div className='message-body' style={{ textAlign: "center" }}>
						{error}
					</div>
				</article>
			) : (
				<table className='table is-striped is-bordered is-fullwidth'>
					<thead>
						<tr>
							<th>ID</th>
							<th>USER</th>
							<th>DATE</th>
							<th>TOTAL</th>
							<th>PAID</th>
							<th>DELIVERED</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{orders.map(order => (
							<tr key={order._id}>
								<td>{order._id}</td>
								<td>{order.user && order.user.name}</td>
								<td>{order.createdAt.substring(0, 10)}</td>
								<td>Rs.{order.totalPrice}</td>
								<td>
									{order.isPaid ? (
										order.paidAt.substring(0, 10)
									) : (
										<i className='fas fa-times' style={{ color: "red" }}></i>
									)}
								</td>
								<td>
									{order.isDelivered ? (
										order.deliveredAt.substring(0, 10)
									) : (
										<i className='fas fa-times' style={{ color: "red" }}></i>
									)}
								</td>
								<td>
									<Link to={`/order/${order._id}`}>
										<button className='button is-info'>Details</button>
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default OrderListScreen;

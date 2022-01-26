import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";

const Cart = () => {
	const { id } = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const qty = location.search ? Number(location.search.split("=")[1]) : 1;

	const cart = useSelector(state => state.cart);
	const { cartItems } = cart;

	useEffect(() => {
		if (id) {
			dispatch(addToCart(id, qty));
		}
	}, [dispatch, id, qty]);

	const removeFromCartHandler = id => dispatch(removeFromCart(id));

	const checkoutHandler = () => {
		navigate("/signin?redirect=shipping");
	};

	return (
		<div className='columns is-mobile section-p1'>
			<div className='column is-two-thirds'>
				<h4>Shopping Cart</h4>
				<hr />
				{cartItems.length > 0 && (
					<span className='tag is-primary is-medium'>
						{cartItems.length} Items
					</span>
				)}
				{cartItems.length === 0 ? (
					<article className='message is-info'>
						<div className='message-body'>
							Your cart is empty <Link to='/'>Go Back</Link>
						</div>
					</article>
				) : (
					<div>
						{cartItems.map(item => (
							<div className='item' key={item.product}>
								<div className='buttons'>
									<span
										className='delete-btn'
										onClick={() => removeFromCartHandler(item.product)}>
										<i className='fas fa-trash-alt'></i>
									</span>
								</div>

								<div className='image'>
									<img src={item.image} alt='' />
								</div>

								<div className='description'>
									<Link to={`/products/${item.product}`}>
										<span>{item.name}</span>
									</Link>
								</div>

								<div className='quantity'>
									<div className='select'>
										<select
											value={item.qty}
											onChange={e =>
												dispatch(
													addToCart(item.product, Number(e.target.value)),
												)
											}>
											{[...Array(item?.countInStock)].map((_, i) => (
												<option key={i} value={i + 1}>
													{i + 1}
												</option>
											))}
										</select>
									</div>
								</div>

								<div className='total-price'>Rs.{item.price}</div>
							</div>
						))}
					</div>
				)}
			</div>
			{cartItems.length > 0 && (
				<div className='column'>
					<div className='card' style={{ height: "250px", marginTop: "50px" }}>
						<div className='card-content'>
							<div>
								<h3>
									Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}{" "}
									Items)
								</h3>
								<hr />
								<h3>
									Total : Rs.
									{cartItems
										.reduce((acc, item) => acc + item.qty * item.price, 0)
										.toFixed(2)}
								</h3>
								<hr />
								<button
									style={{ backgroundColor: "#088178", color: "#fff" }}
									className='button is-medium is-fullwidth'
									onClick={checkoutHandler}>
									Proceed to checkout
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Cart;

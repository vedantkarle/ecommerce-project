import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { detailsProduct } from "../actions/productActions";
import Rating from "../components/Rating";
import Review from "../components/Review";

const ProductDetail = () => {
	const [qty, setQty] = useState(1);

	const { loading, error, product } = useSelector(
		state => state.productDetails,
	);
	const dispatch = useDispatch();
	const { id } = useParams();
	const navigate = useNavigate();

	const addToCartHandler = () => {
		navigate(`/cart/${id}?qty=${qty}`);
	};

	useEffect(() => {
		dispatch(detailsProduct(id));
	}, []);

	return (
		<div className='section-p1'>
			<Link to='/'>
				<button className='button'>Go Back</button>
			</Link>
			{loading ? (
				<>
					<h4>Loading...</h4>
				</>
			) : error ? (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
						width: "100%",
					}}>
					<article className='message is-danger'>
						<div className='message-body'>{error}</div>
					</article>
					<Link to='/'>
						<button className='button is-primary'>Go Back</button>
					</Link>
				</div>
			) : (
				<div id='prodetails' className='section-p1'>
					<div className='single-pro-image'>
						<img src={product?.image} width='100%' />
					</div>
					<div className='single-pro-details'>
						<h6>Home / {product?.category}</h6>
						<h4>{product?.name}</h4>
						<Rating
							value={product?.rating}
							text={`${product?.numReviews} reviews`}
							color='gold'
						/>
						<hr />
						<h2>Rs.{product?.price}</h2>
						{product?.countInStock > 0 ? (
							<div
								style={{
									display: "flex",
									alignItems: "center",
								}}>
								<span>Qty :</span>
								&nbsp;
								<div class='select'>
									<select value={qty} onChange={e => setQty(e.target.value)}>
										{[...Array(product?.countInStock)].map((_, i) => (
											<option key={i} value={i + 1}>
												{i + 1}
											</option>
										))}
									</select>
								</div>
								&nbsp;&nbsp;&nbsp;
								<button onClick={addToCartHandler}>Add To Cart</button>
							</div>
						) : (
							<article className='message is-danger'>
								<div className='message-body'>Product Unavailable</div>
							</article>
						)}
						<h4>Product Details</h4>
						<p className='prodesc'>{product?.description}</p>
					</div>
				</div>
			)}
			{product && (
				<div className='section-p1'>
					<h4>Reviews</h4>
					<Review />
				</div>
			)}
		</div>
	);
};

export default ProductDetail;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createProductReview, detailsProduct } from "../actions/productActions";
import Rating from "../components/Rating";
import Review from "../components/Review";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

const ProductDetail = () => {
	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");

	const productDetails = useSelector(state => state.productDetails);
	const { loading, error, product } = productDetails;

	const userLogin = useSelector(state => state.userLogin);
	const { userInfo } = userLogin;

	const productReviewCreate = useSelector(state => state.productReviewCreate);
	const { error: errorProductReview, success: successProductReview } =
		productReviewCreate;

	const dispatch = useDispatch();
	const { id } = useParams();
	const navigate = useNavigate();

	const addToCartHandler = () => {
		navigate(`/cart/${id}?qty=${qty}`);
	};

	const submitHandler = e => {
		e.preventDefault();
		dispatch(createProductReview(id, { rating, comment }));
	};

	useEffect(() => {
		if (successProductReview) {
			alert("Review successfully submitted");
			setRating(0);
			setComment("");
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
		}
		dispatch(detailsProduct(id));
	}, [successProductReview, dispatch, id]);

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
						<img src={product?.image} width='100%' alt={product?.name} />
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
			<hr />
			{product && (
				<div>
					<h4>Reviews</h4>
					{product?.reviews?.length === 0 && (
						<article className='message is-info'>
							<div className='message-body'>No Reviews</div>
						</article>
					)}
					{product?.reviews?.map(review => (
						<Review
							key={review._id}
							name={review.name}
							comment={review.comment}
							rating={review.rating}
							createdAt={review.createdAt}
						/>
					))}
				</div>
			)}
			<br />
			<div>
				<h4>Write a customer review</h4>
				{errorProductReview && (
					<article className='message is-danger'>
						<div className='message-body'>{errorProductReview}</div>
					</article>
				)}
				{userInfo ? (
					<form onSubmit={submitHandler}>
						<div className='field'>
							<label className='label'>Subject</label>
							<div className='control'>
								<div className='select'>
									<select
										value={rating}
										onChange={e => setRating(e.target.value)}>
										<option value='1'>1 - Poor</option>
										<option value='2'>2 - Fair</option>
										<option value='3'>3 - Good</option>
										<option value='4'>4 - Very Good</option>
										<option value='5'>5 - Excellent</option>
									</select>
								</div>
							</div>
						</div>

						<div className='field'>
							<label className='label'>Comment</label>
							<div className='control'>
								<textarea
									className='textarea'
									placeholder='Comment'
									onChange={e => setComment(e.target.value)}>
									{comment}
								</textarea>
							</div>
						</div>

						<div class='field is-grouped'>
							<div class='control'>
								<button class='button is-link' type='submit'>
									Submit
								</button>
							</div>
						</div>
					</form>
				) : (
					<article className='message is-info'>
						<div className='message-body'>
							Please <Link to='/signin'>Login</Link> to post a review
						</div>
					</article>
				)}
			</div>
		</div>
	);
};

export default ProductDetail;

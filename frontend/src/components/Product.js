import React from "react";
import { useNavigate } from "react-router-dom";
import Rating from "./Rating";

const Product = ({
	id,
	title,
	description,
	category,
	price,
	image,
	numReviews,
}) => {
	const navigate = useNavigate();

	return (
		<div class='pro' onClick={() => navigate(`/products/${id}`)}>
			<img src={image} alt={title} />
			<div class='des'>
				<span>{category}</span>
				<h5>{title}</h5>
				<Rating value={3.6} text={`${numReviews} reviews`} color='gold' />
				<h4>₹{price}</h4>
			</div>
			<a href='#'>
				<i class='fal fa-shopping-cart cart'></i>
			</a>
		</div>
	);
};

export default Product;

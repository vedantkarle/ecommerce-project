import React from "react";
import Rating from "./Rating";

const Review = ({ name, comment, rating, createdAt }) => {
	return (
		<div className='box'>
			<article className='media'>
				<div className='media-content'>
					<div className='content'>
						<p>
							<strong>{name}</strong> <small>{createdAt}</small>
							<br />
							{comment}
						</p>
					</div>
					<nav className='level is-mobile'>
						<Rating value={rating} color='gold' />
					</nav>
				</div>
			</article>
		</div>
	);
};

export default Review;

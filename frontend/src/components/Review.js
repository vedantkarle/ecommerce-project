import React from "react";

const Review = () => {
	return (
		<div className='box'>
			<article className='media'>
				<div className='media-left'>
					<figure className='image is-64x64'>
						<img
							src='https://bulma.io/images/placeholders/128x128.png'
							alt='Image'
						/>
					</figure>
				</div>
				<div className='media-content'>
					<div className='content'>
						<p>
							<strong>John Smith</strong> <small>31m</small>
							<br />
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
							efficitur sit amet massa fringilla egestas. Nullam condimentum
							luctus turpis.
						</p>
					</div>
					<nav className='level is-mobile'>
						<div style={{ color: "gold" }}>
							<i className='fas fa-star'></i>
							<i className='fas fa-star'></i>
							<i className='fas fa-star'></i>
							<i className='fas fa-star'></i>
							<i className='fas fa-star-half'></i>
						</div>
					</nav>
				</div>
			</article>
		</div>
	);
};

export default Review;

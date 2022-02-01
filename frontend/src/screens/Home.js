import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import Product from "../components/Product";

const Home = props => {
	const productList = useSelector(state => state.productList);

	const { loading, error, products } = productList;

	const dispatch = useDispatch();
	const { keyword } = useParams();

	useEffect(() => {
		dispatch(listProducts(keyword));
	}, [dispatch]);

	return (
		<div>
			<section id='hero'>
				<h4>Trade-in-offer</h4>
				<h2>Buy artistic &</h2>
				<h1>designed bottles</h1>
				<p>Opening offer - speacial 10% discount on order</p>
				<button>Shop Now</button>
			</section>

			<section id='features' className='section-p1'>
				<div className='fe-box'>
					<img src='/images/bottle.jpg' alt='bottle' />
					<h6>Custom Bottles</h6>
				</div>
				<div className='fe-box'>
					<img src='/images/delivery.jpg' alt='delivery' />
					<h6>Home Delivery</h6>
				</div>
				<div className='fe-box'>
					<img src='/images/service.jpg' alt='service' />
					<h6>24x7 Service</h6>
				</div>
			</section>

			<section id='product1' className='section-p1'>
				<h2>Featured Products</h2>
				<p>New Modern Design</p>
				<div className='pro-container'>
					{products?.map(p => (
						<Product
							id={p._id}
							title={p.name}
							category={p.category}
							image={p.image}
							price={p.price}
							description={p.description}
							numReviews={p.numReviews}
						/>
					))}
				</div>
			</section>

			<section id='banner' className='section-m1'>
				<h4>Special Offer</h4>
				<h2>
					Special <span>10% OFF</span> -For First 50 orders
				</h2>
				<button>View All</button>
			</section>

			<section id='sm-banner' className='section-p1'>
				<div className='banner-box'>
					<h4>crazy deals</h4>
					<h2>buy 1 get 1 free</h2>
					<span>Gift your valentine a bottle of love</span>
					<button>Explore</button>
				</div>
				<div className='banner-box'>
					<h4>crazy deals</h4>
					<h2>buy 1 get 1 free</h2>
					<span>Gift your valentine a bottle of love</span>
					<button>Explore</button>
				</div>
			</section>

			<section id='banner3'>
				<div className='banner-box'>
					<h2>Men</h2>
				</div>
				<div className='banner-box'>
					<h2>Women</h2>
				</div>
				<div className='banner-box'>
					<h2>Shoes</h2>
				</div>
			</section>

			<section id='newsletter' className='section-p1 section-m1'>
				<div className='newstext'>
					<h4>Sign Up For Newsletters</h4>
					<p>
						Get E-mail updates about our <span>latest offers</span>
					</p>
				</div>
				<div className='form'>
					<input type='text' placeholder='Your email address' />
					<button>Sign Up</button>
				</div>
			</section>
		</div>
	);
};

export default Home;

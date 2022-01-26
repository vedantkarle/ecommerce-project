import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className='section-p1'>
			<div className='col'>
				<Link to='#'>
					<img className='logo' src='/images/Amazona.svg' />
				</Link>
				<h4>Contact</h4>
				<p>
					{" "}
					<strong>Address</strong> :562 Wellington Road,Street 32, San Fransisco
				</p>
				<p>
					{" "}
					<strong>Phone</strong> :1324657890
				</p>
				<p>
					{" "}
					<strong>Address</strong> :10:00 - 18:00, Mon-Sat
				</p>
				<br />
				<div className='follow'>
					<h4>Follow us</h4>
					<div className='icon'>
						<i className='fab fa-facebook-f'></i>
						<i className='fab fa-twitter'></i>
						<i className='fab fa-instagram'></i>
					</div>
				</div>
			</div>
			<div className='col'>
				<h4>About</h4>
				<Link to='#'>About us</Link>
				<Link to='#'>Delivery Information</Link>
				<Link to='#'>Privacy Policy</Link>
				<Link to='#'>Terms & Conditions</Link>
				<Link to='#'>Contact us</Link>
			</div>

			<div className='col'>
				<h4>My Account</h4>
				<Link to='#'>Sign In</Link>
				<Link to='#'>View Cart</Link>
				<Link to='#'>Wishlist</Link>
				<Link to='#'>My Orders</Link>
				<Link to='#'>Help</Link>
			</div>

			<div className='col app'>
				<h4>Install App</h4>
				<p>From App Store or Google Playstore</p>
				<div className='row'>
					<img src='/images/app-store.png' alt='' />
					<img src='/images/play-store.png' alt='' />
				</div>
				<p>Secured Payment Gateways</p>
				<img src='/images/payment.png' alt='' />
			</div>

			<div className='copyright'>
				<p>&copy; 2022 Artistic Tales</p>
			</div>
		</footer>
	);
};

export default Footer;

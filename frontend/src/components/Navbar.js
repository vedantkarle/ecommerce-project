import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../actions/userActions";

const Navbar = () => {
	const [isActive, setIsActive] = useState(false);

	const location = useLocation();
	const dispatch = useDispatch();

	const userLogin = useSelector(state => state.userLogin);

	const { userInfo } = userLogin;

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<section id='header'>
			<Link to='/'>
				<img className='logo' src='/images/Amazona.svg' />
			</Link>
			<div>
				<ul id='navbar'>
					<Link to='#' id='close'>
						<i className='far fa-times'></i>
					</Link>
					<li>
						<Link to='/' className={location.pathname === "/" ? "active" : ""}>
							Home
						</Link>
					</li>
					<li>
						<Link
							to='/products'
							className={location.pathname === "/products" ? "active" : ""}>
							Shop
						</Link>
					</li>
					{userInfo ? (
						<div
							class={isActive ? "dropdown is-active" : "dropdown"}
							onClick={() => setIsActive(!isActive)}>
							<div class='dropdown-trigger'>
								<button
									class='button'
									aria-haspopup='true'
									aria-controls='dropdown-menu'
									style={{
										border: "none",
										backgroundColor: "transparent",
										outline: "none",
									}}>
									<span>{userInfo?.name}</span>
									<span class='icon is-small'>
										<i class='fas fa-angle-down' aria-hidden='true'></i>
									</span>
								</button>
							</div>
							<div class='dropdown-menu' id='dropdown-menu' role='menu'>
								<div class='dropdown-content'>
									<Link to='/profile' className='dropdown-item'>
										Profile
									</Link>
									<a href='#' className='dropdown-item' onClick={logoutHandler}>
										Logout
									</a>
								</div>
							</div>
						</div>
					) : (
						<li id='lg-bag'>
							<Link
								to='/signin'
								className={location.pathname === "/signin" ? "active" : ""}>
								Sign In
							</Link>
						</li>
					)}
					<li id='lg-bag'>
						<Link
							to='/cart'
							className={location.pathname.includes("/cart") ? "active" : ""}>
							<i className='far fa-shopping-bag'></i>
						</Link>
					</li>
				</ul>
			</div>
			<div id='mobile'>
				<Link to='/cart'>
					<i className='far fa-shopping-bag'></i>
				</Link>
				<i id='bar' className='fas fa-outdent'></i>
			</div>
		</section>
	);
};

export default Navbar;

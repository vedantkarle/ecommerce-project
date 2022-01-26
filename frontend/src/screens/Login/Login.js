import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../../actions/userActions";
import "./style.css";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const redirect = location.search ? `/${location.search.split("=")[1]}` : "/";

	const userLogin = useSelector(state => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [navigate, userInfo, redirect]);

	const submitHandler = e => {
		e.preventDefault();
		dispatch(login(email, password));
	};

	return (
		<div className='container'>
			<div className='card' style={{ height: "500px" }}>
				{error && (
					<article className='message is-danger' style={{ margin: "10px" }}>
						<div className='message-body' style={{ textAlign: "center" }}>
							{error}
						</div>
					</article>
				)}
				<div className='inner-box' id='card'>
					<div className='card-front'>
						<h2>LOGIN</h2>
						<form onSubmit={submitHandler}>
							<input
								type='email'
								className='input-box'
								placeholder='Your Email Id'
								required
								onChange={e => setEmail(e.target.value)}
							/>
							<input
								type='password'
								className='input-box'
								placeholder='Password'
								required
								onChange={e => setPassword(e.target.value)}
							/>
							<button
								type='submit'
								className={
									loading ? `button submit-btn is-loading` : `button submit-btn`
								}>
								Submit
							</button>
						</form>
						<button
							type='button'
							className='btn'
							onClick={() => {
								document.getElementById("card").style.transform =
									"rotateY(-180deg)";
							}}>
							I'm New here
						</button>
						<a href=''>Forgot Password</a>
					</div>
					<div className='card-back'>
						<h2>REGISTER</h2>
						<form>
							<input
								type='text'
								className='input-box'
								placeholder='Your Name'
								required
							/>
							<input
								type='email'
								className='input-box'
								placeholder='Your Email Id'
								required
							/>
							<input
								type='password'
								className='input-box'
								placeholder='Password'
								required
							/>
							<button type='submit' className='submit-btn'>
								Submit
							</button>
							<input type='checkbox' />
							<span>Remember Me</span>
						</form>
						<button
							type='button'
							className='btn'
							onClick={() => {
								document.getElementById("card").style.transform =
									"rotateY(0deg)";
							}}>
							I've an account
						</button>
						<a href=''>Forgot Password</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;

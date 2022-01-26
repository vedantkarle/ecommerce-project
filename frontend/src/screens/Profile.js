import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetails, updateUserProfile } from "../actions/userActions";

const Profile = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userDetails = useSelector(state => state.userDetails);
	const { loading, error, user } = userDetails;

	const userLogin = useSelector(state => state.userLogin);
	const { userInfo } = userLogin;

	const userUpdateProfile = useSelector(state => state.userUpdateProfile);
	const { success } = userUpdateProfile;

	useEffect(() => {
		if (!userInfo) {
			navigate("/signin");
		} else {
			if (!user.name) {
				dispatch(getUserDetails("profile"));
			} else {
				setName(user.name);
				setEmail(user.email);
			}
		}
	}, [dispatch, navigate, userInfo, user]);

	const submitHandler = e => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage("Password dont match");
		} else {
			dispatch(updateUserProfile({ id: user._id, name, email, password }));
		}
	};

	return (
		<div className='section-p1'>
			<div className='columns'>
				<div className='column is-one-third'>
					<h3>
						<strong>User Profile</strong>
					</h3>
					<hr />
					{success && !error && (
						<article className='message is-success' style={{ margin: "10px" }}>
							<div className='message-body' style={{ textAlign: "center" }}>
								User Updated Successfully
							</div>
						</article>
					)}
					{message && !success && !error && (
						<article className='message is-danger' style={{ margin: "10px" }}>
							<div className='message-body' style={{ textAlign: "center" }}>
								{message}
							</div>
						</article>
					)}
					{error && !success && (
						<article className='message is-danger' style={{ margin: "10px" }}>
							<div className='message-body' style={{ textAlign: "center" }}>
								{error}
							</div>
						</article>
					)}
					<form onSubmit={submitHandler}>
						<div class='field'>
							<label className='label'>Name</label>
							<div class='control'>
								<input
									className='input is-rounded'
									type='text'
									placeholder='Name'
									value={name}
									onChange={e => setName(e.target.value)}
								/>
							</div>
						</div>

						<div className='field'>
							<label className='label'>Email</label>
							<div className='control'>
								<input
									className='input is-rounded'
									type='text'
									placeholder='Email'
									value={email}
									onChange={e => setEmail(e.target.value)}
								/>
							</div>
						</div>

						<div class='field'>
							<label class='label'>Password</label>
							<div class='control'>
								<input
									className='input is-rounded'
									type='password'
									placeholder='Password'
									value={password}
									onChange={e => setPassword(e.target.value)}
								/>
							</div>
						</div>

						<div className='field'>
							<label className='label'>Confirm Password</label>
							<div className='control'>
								<input
									className='input is-rounded'
									type='password'
									placeholder='Confirm Password'
									value={confirmPassword}
									onChange={e => setConfirmPassword(e.target.value)}
								/>
							</div>
						</div>

						<button
							className='button is-success is-rounded is-fullwidth'
							type='submit'
							style={{ marginTop: "10px" }}>
							Update
						</button>
					</form>
				</div>
				<div className='column'>
					<h2>Orders</h2>
				</div>
			</div>
		</div>
	);
};

export default Profile;

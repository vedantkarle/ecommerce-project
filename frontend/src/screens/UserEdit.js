import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";

const UserEdit = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);
	const [message, setMessage] = useState("");

	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userDetails = useSelector(state => state.userDetails);
	const { loading, error, user } = userDetails;

	const userUpdate = useSelector(state => state.userUpdate);
	const { loading: loadingUpdate, error: errorUpdate, success } = userUpdate;

	useEffect(() => {
		if (success) {
			dispatch({ type: USER_UPDATE_RESET });
			navigate("/admin/userList");
		} else {
			if (!user.name || user._id !== id) {
				dispatch(getUserDetails(id));
			} else {
				setName(user?.name);
				setEmail(user?.email);
				setIsAdmin(user?.isAdmin);
			}
		}
	}, [dispatch, user, success]);

	const submitHandler = e => {
		e.preventDefault();
		dispatch(updateUser({ _id: id, name, email, isAdmin }));
	};

	return (
		<div className='section-p1'>
			<Link to='/admin/userList'>
				<button className='button'>Go Back</button>
			</Link>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}>
				<h3>
					<span className='tag is-primary is-medium'>
						<strong>EDIT USER</strong>
					</span>
				</h3>
				{loadingUpdate && <ClipLoader />}
				{errorUpdate && (
					<article className='message is-danger' style={{ margin: "10px" }}>
						<div className='message-body' style={{ textAlign: "center" }}>
							{errorUpdate}
						</div>
					</article>
				)}
				{loading ? (
					<ClipLoader />
				) : error ? (
					<article className='message is-danger' style={{ margin: "10px" }}>
						<div className='message-body' style={{ textAlign: "center" }}>
							{error}
						</div>
					</article>
				) : (
					<form onSubmit={submitHandler} style={{ width: "500px" }}>
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
						<div className='field'>
							<div className='control'>
								<label className='checkbox'>
									<input
										type='checkbox'
										checked={isAdmin}
										onChange={e => setIsAdmin(e.target.checked)}
									/>
									<strong>Is Admin</strong>
								</label>
							</div>
						</div>

						<button
							className='button is-success is-rounded is-fullwidth'
							type='submit'
							style={{ marginTop: "10px" }}>
							Update
						</button>
					</form>
				)}
			</div>
		</div>
	);
};

export default UserEdit;

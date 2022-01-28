import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { deleteUser, listUsers } from "../actions/userActions";

const UserListScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userList = useSelector(state => state.userList);
	const { loading, error, users } = userList;

	const userLogin = useSelector(state => state.userLogin);
	const { userInfo } = userLogin;

	const userDelete = useSelector(state => state.userDelete);
	const { success } = userDelete;

	useEffect(() => {
		if (userInfo && userInfo?.isAdmin) {
			dispatch(listUsers());
		} else {
			navigate("/signin");
		}
	}, [dispatch, navigate, userInfo, success]);

	const deleteHandler = async id => {
		if (window.confirm("Are your sure")) {
			dispatch(deleteUser(id));
		}
	};

	return (
		<div className='section-p1'>
			<h3>
				<span className='tag is-primary is-medium'>
					<strong>USERS</strong>
				</span>
			</h3>
			<hr />
			{loading ? (
				<ClipLoader />
			) : error ? (
				<article className='message is-danger' style={{ margin: "10px" }}>
					<div className='message-body' style={{ textAlign: "center" }}>
						{error}
					</div>
				</article>
			) : (
				<table className='table is-striped is-bordered is-fullwidth'>
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>EMAIL</th>
							<th>ADMIN</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{users?.map(user => (
							<tr key={user?._id}>
								<td>{user._id}</td>
								<td>{user.name}</td>
								<td>
									<a href={`mailto:${user.email}`}>{user.email}</a>
								</td>
								<td style={{ textAlign: "center" }}>
									{user.isAdmin ? (
										<i className='fas fa-check' style={{ color: "green" }}></i>
									) : (
										<i className='fas fa-times' style={{ color: "red" }}></i>
									)}
								</td>
								<td style={{ display: "flex", justifyContent: "center" }}>
									<Link to={`/admin/user/${user._id}`}>
										<button className='button is-warning'>
											<span className='icon is-small'>
												<i className='fas fa-edit'></i>
											</span>
										</button>
									</Link>
									<button
										className='button is-danger'
										onClick={() => deleteHandler(user?._id)}>
										<span className='icon is-small'>
											<i className='fas fa-trash'></i>
										</span>
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default UserListScreen;

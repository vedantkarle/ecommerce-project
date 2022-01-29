import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { deleteProduct, listProducts } from "../actions/productActions";

const ProductListScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const params = useParams();

	const productList = useSelector(state => state.productList);
	const { loading, error, products } = productList;

	const userLogin = useSelector(state => state.userLogin);
	const { userInfo } = userLogin;

	const productDelete = useSelector(state => state.productDelete);
	const { loading: loadingDelete, error: errorDelete, success } = productDelete;

	useEffect(() => {
		if ((userInfo && userInfo?.isAdmin) || success) {
			dispatch(listProducts());
		} else {
			navigate("/signin");
		}
	}, [dispatch, navigate, userInfo, success]);

	const deleteHandler = async id => {
		if (window.confirm("Are your sure")) {
			dispatch(deleteProduct(id));
		}
	};

	return (
		<div className='section-p1'>
			<div
				style={{
					display: "flex",
					justifyContent: "start",
					alignItems: "center",
				}}>
				<div>
					<h3>
						<span className='tag is-primary is-medium'>
							<strong>PRODUCTS</strong>
						</span>
					</h3>
				</div>
				<div style={{ marginLeft: "10px" }}>
					<button className='button'>
						<i className='fas fa-plus'></i>Create Product
					</button>
				</div>
			</div>
			<hr />
			{loading || loadingDelete ? (
				<ClipLoader />
			) : error || errorDelete ? (
				<article className='message is-danger' style={{ margin: "10px" }}>
					<div className='message-body' style={{ textAlign: "center" }}>
						{error || errorDelete}
					</div>
				</article>
			) : (
				<table className='table is-striped is-bordered is-fullwidth'>
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>PRICE</th>
							<th>CATEGORY</th>
							<th>BRAND</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{products?.map(product => (
							<tr key={product?._id}>
								<td>{product._id}</td>
								<td>{product.name}</td>
								<td>Rs.{product.price}</td>
								<td>{product.category}</td>
								<td>{product.brand}</td>
								<td style={{ display: "flex", justifyContent: "center" }}>
									<Link to={`/admin/product/${product._id}`}>
										<button className='button is-warning'>
											<span className='icon is-small'>
												<i className='fas fa-edit'></i>
											</span>
										</button>
									</Link>
									<button
										className='button is-danger'
										onClick={() => deleteHandler(product?._id)}>
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

export default ProductListScreen;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import {
	createProduct,
	deleteProduct,
	listProducts,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

const ProductListScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const params = useParams();

	const productList = useSelector(state => state.productList);
	const { loading, error, products } = productList;

	const userLogin = useSelector(state => state.userLogin);
	const { userInfo } = userLogin;

	const productDelete = useSelector(state => state.productDelete);
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = productDelete;

	const productCreate = useSelector(state => state.productCreate);
	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
		product: createdProduct,
	} = productCreate;

	useEffect(() => {
		dispatch({ type: PRODUCT_CREATE_RESET });

		if (!userInfo?.isAdmin) {
			navigate("/signin");
		}

		if (successCreate) {
			navigate(`/admin/product/${createdProduct._id}/edit`);
		} else {
			dispatch(listProducts());
		}
	}, [
		dispatch,
		navigate,
		userInfo,
		successDelete,
		successCreate,
		createdProduct,
	]);

	const deleteHandler = async id => {
		if (window.confirm("Are your sure")) {
			dispatch(deleteProduct(id));
		}
	};

	const createProductHandler = product => {
		dispatch(createProduct());
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
					<button className='button' onClick={createProductHandler}>
						<i className='fas fa-plus'></i>Create Product
					</button>
				</div>
			</div>
			<hr />
			{loading || loadingDelete || loadingCreate ? (
				<ClipLoader />
			) : error || errorDelete || errorCreate ? (
				<article className='message is-danger' style={{ margin: "10px" }}>
					<div className='message-body' style={{ textAlign: "center" }}>
						{error || errorDelete || errorCreate}
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
									<Link to={`/admin/product/${product._id}/edit`}>
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

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { detailsProduct, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const ProductEditScreen = () => {
	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState("");
	const [brand, setBrand] = useState("");
	const [category, setCategory] = useState("");
	const [countInStock, setCountInStock] = useState(0);
	const [description, setDescription] = useState("");

	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const productDetails = useSelector(state => state.productDetails);
	const { loading, error, product } = productDetails;

	const productUpdate = useSelector(state => state.productUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = productUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: PRODUCT_UPDATE_RESET });
			navigate("/admin/productList");
		} else {
			if (!product?.name || product._id !== id) {
				dispatch(detailsProduct(id));
			} else {
				setName(product?.name);
				setPrice(product?.price);
				setImage(product?.image);
				setBrand(product?.brand);
				setCategory(product?.category);
				setCountInStock(product?.countInStock);
				setDescription(product?.description);
			}
		}
	}, [dispatch, product, id, navigate, successUpdate]);

	const submitHandler = e => {
		e.preventDefault();
		dispatch(
			updateProduct({
				_id: id,
				name,
				price,
				image,
				brand,
				category,
				countInStock,
				description,
			}),
		);
	};

	return (
		<div className='section-p1'>
			<Link to='/admin/productList'>
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
						<strong>EDIT PRODUCT</strong>
					</span>
				</h3>
				{loading || loadingUpdate ? (
					<ClipLoader />
				) : error || errorUpdate ? (
					<article className='message is-danger' style={{ margin: "10px" }}>
						<div className='message-body' style={{ textAlign: "center" }}>
							{error || errorUpdate}
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
							<label className='label'>Price</label>
							<div className='control'>
								<input
									className='input is-rounded'
									type='text'
									placeholder='Price'
									value={price}
									onChange={e => setPrice(e.target.value)}
								/>
							</div>
						</div>
						<div className='field'>
							<label className='label'>Image</label>
							<div className='control'>
								<input
									className='input is-rounded'
									type='text'
									placeholder='Enter image url'
									value={image}
									onChange={e => setImage(e.target.value)}
								/>
							</div>
						</div>
						<div className='field'>
							<label className='label'>Brand</label>
							<div className='control'>
								<input
									className='input is-rounded'
									type='text'
									placeholder='Brand'
									value={brand}
									onChange={e => setBrand(e.target.value)}
								/>
							</div>
						</div>
						<div className='field'>
							<label className='label'>Count In Stock</label>
							<div className='control'>
								<input
									className='input is-rounded'
									type='number'
									placeholder='Count In Stock'
									value={countInStock}
									onChange={e => setCountInStock(e.target.value)}
								/>
							</div>
						</div>

						<div className='field'>
							<label className='label'>Category</label>
							<div className='control'>
								<input
									className='input is-rounded'
									type='text'
									placeholder='Category'
									value={category}
									onChange={e => setCategory(e.target.value)}
								/>
							</div>
						</div>

						<div className='field'>
							<label className='label'>Description</label>
							<div className='control'>
								<input
									className='input is-rounded'
									type='text'
									placeholder='Description'
									value={description}
									onChange={e => setDescription(e.target.value)}
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
				)}
			</div>
		</div>
	);
};

export default ProductEditScreen;

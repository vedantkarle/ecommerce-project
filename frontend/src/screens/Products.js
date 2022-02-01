import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import Paginate from "../components/Paginate";
import Product from "../components/Product";

const Products = () => {
	const productList = useSelector(state => state.productList);

	const { products, pages, page } = productList;

	const dispatch = useDispatch();
	const { keyword, pageNumber } = useParams();

	const pageNo = pageNumber || 1;

	useEffect(() => {
		dispatch(listProducts(keyword, pageNo));
	}, [dispatch, keyword, pageNo]);

	return (
		<section id='product1' className='section-p1'>
			<h2>Products</h2>
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
			<Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
		</section>
	);
};

export default Products;

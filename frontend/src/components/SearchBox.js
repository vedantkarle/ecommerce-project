import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
	const [keyword, setKeyword] = useState("");

	const navigate = useNavigate();

	const submitHandler = e => {
		if (keyword.trim().length > 0) {
			navigate(`/search/${keyword}`);
		} else {
			navigate("/");
		}
	};

	return (
		<div className='field has-addons' style={{ paddingTop: "10px" }}>
			<div className='control'>
				<input
					className='input'
					type='text'
					placeholder='Enter product name'
					onChange={e => setKeyword(e.target.value)}
				/>
			</div>
			<div className='control' onClick={submitHandler}>
				<a
					className='button'
					style={{ backgroundColor: "#088178", color: "#fff" }}>
					Search
				</a>
			</div>
		</div>
	);
};

export default SearchBox;

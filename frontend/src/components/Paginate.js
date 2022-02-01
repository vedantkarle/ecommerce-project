import React from "react";
import { Link } from "react-router-dom";

const Paginate = ({ pages, page, isAdmin = "false", keyword = "" }) => {
	return (
		pages > 1 && (
			<nav
				className='pagination is-centered'
				role='navigation'
				aria-label='pagination'>
				<ul className='pagination-list'>
					{[...Array(pages).keys()].map(x => (
						<li>
							<Link
								className={
									page === x + 1
										? "pagination-link is-current"
										: "pagination-link"
								}
								aria-label='Goto page 1'
								key={x + 1}
								to={
									keyword
										? `/search/${keyword}/page/${x + 1}`
										: `/products/page/${x + 1}`
								}>
								{x + 1}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		)
	);
};

export default Paginate;

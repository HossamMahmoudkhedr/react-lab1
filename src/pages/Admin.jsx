import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

export default function Admin({
	products,
	handleSearchInput,
	handleCategory,
	handleCurrentPage,
	currentPage,
	removeProduct,
}) {
	const pageSize = 8;

	const [loading, setLoading] = useState(false);
	useEffect(() => {
		handleCategory('All');
	}, []);

	const handleRemove = async (id) => {
		setLoading(true);
		try {
			const req = await removeProduct(id);
			setLoading(false);
			console.log(req);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};
	return (
		<>
			{loading && <Loading />}
			<div className="py-12 mt-12">
				<div className="fixed bottom-12 end-12 z-[1]">
					<div
						className="tooltip tooltip-top"
						data-tip="Add new product">
						<Link
							to="/add_new"
							className="btn btn-circle btn-xl bg-green-500">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="3"
								stroke="white"
								className="size-6">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 4.5v15m7.5-7.5h-15"
								/>
							</svg>
						</Link>
					</div>
				</div>
				<div>
					<h2 className="font-bold text-3xl">Welcome Admin 😉</h2>
				</div>
				<div className="mt-10 mb-7 flex justify-center">
					<div>
						<label htmlFor="name">Enter product name:</label>
						<input
							type="text"
							id="name"
							name="name"
							placeholder="Search"
							onChange={(e) => handleSearchInput(e.target.value)}
							className="input input-lg mt-4"
						/>
					</div>
				</div>
				<div className="overflow-x-auto">
					<table className="table">
						{/* head */}
						<thead>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th>Price</th>
								<th>Category</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{/* row 1 */}
							{products
								.slice((currentPage - 1) * pageSize, currentPage * pageSize)
								.map((product, index) => (
									<tr
										key={index}
										className="hover:bg-base-300">
										<th>{index + 1}</th>
										<td>{product.name}</td>
										<td>${product.price}</td>
										<td>{product.category}</td>
										<td className="flex gap-4">
											<Link
												to={`/edit/${product.id}`}
												className="cursor-pointer">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth="1.5"
													stroke="blue"
													className="size-6">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
													/>
												</svg>
											</Link>
											<button
												type="button"
												className="cursor-pointer"
												onClick={() => handleRemove(product.id)}>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth="1.5"
													stroke="red"
													className="size-6">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
													/>
												</svg>
											</button>
										</td>
									</tr>
								))}
						</tbody>
					</table>
					{products.length === 0 && (
						<div className="flex justify-center mt-4">
							<p className="text-gray-400">No data found.</p>
						</div>
					)}
				</div>
				<div className="flex justify-center mt-10">
					<div className="join">
						{Array(Math.ceil(products.length / pageSize))
							.fill(0)
							.map((item, index) => (
								<input
									key={index}
									onChange={() => handleCurrentPage(index + 1)}
									className="join-item btn btn-square"
									type="radio"
									name="options"
									aria-label={index + 1}
									checked={currentPage === index + 1}
								/>
							))}
					</div>
				</div>
			</div>
		</>
	);
}

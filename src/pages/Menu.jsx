import React, { useState } from 'react';

export default function Menu({
	products,
	categories,
	loadingProducts,
	loadingCategories,
	selectedCategory,
	handleCategory,
	handleSearchInput,
	handleSelectedProducts,
	handleSearchType,
	searchType,
}) {
	const [currentPage, setCurrentPage] = useState(1);

	const handleCurrentPage = (page) => setCurrentPage(page);
	const pageSize = 8;

	return (
		<div className="py-14 mt-15">
			<div className="flex justify-center">
				<div
					className={`flex ${
						searchType === 'Name' ? 'flex-row' : 'flex-col'
					} items-center gap-4 w-[40%]`}>
					{searchType === 'Name' && (
						<div className="search relative w-[65%]">
							<label
								htmlFor="name"
								className="absolute">
								Look for your food
							</label>
							<input
								type="text"
								id="name"
								name="name"
								placeholder="Search"
								onChange={(e) => handleSearchInput(e.target.value)}
								className="input input-lg  w-[100%]"
							/>
						</div>
					)}
					<div
						className={`category relative ${
							searchType === 'Category' ? 'w-[70%]' : ''
						}`}>
						<label
							htmlFor="category"
							className={`absolute w-[30%]`}>
							By
						</label>
						<select
							id="category"
							name="category"
							onChange={(e) => handleSearchType(e.target.value)}
							defaultValue="Name"
							className="select select-lg cursor-pointer outline-0  w-[100%]">
							<option value="Name">Name</option>
							<option value="Category">Category</option>
						</select>
					</div>
					{loadingCategories && searchType === 'Category' && (
						<div className="d-flex justify-center items-center w-[100%] h-[90vh]">
							<span className="loading loading-dots loading-lg text-orange-600"></span>
						</div>
					)}
					{!loadingCategories && searchType === 'Category' && (
						<div className="flex flex-wrap gap-4 w-[65%] justify-center">
							{categories.length > 0 &&
								categories.map(({ id, name }) => (
									<button
										key={id}
										onClick={() => handleCategory(name)}
										className={`cat-btn btn btn-soft btn-warning border border-warning ${
											selectedCategory === name ? 'bg-amber-500 text-white' : ''
										}`}>
										{name}
									</button>
								))}
						</div>
					)}
				</div>
			</div>

			<div className="flex flex-col gap-4 items-center mt-12">
				{loadingProducts && (
					<span className="loading loading-dots loading-lg text-orange-600"></span>
				)}
				{!loadingProducts && (
					<div className="grid grid-cols-4 gap-6">
						{products
							.slice((currentPage - 1) * pageSize, currentPage * pageSize)
							.map((product) => (
								<div
									key={product.id}
									className="flex flex-col gap-1 shadow-xl justify-between  rounded-2xl overflow-hidden items-center">
									<div className="h-[250px]">
										<img
											loading="lazy"
											className="object-cover w-[100%] h-[100%]"
											src={product.image}
											alt=""
										/>
									</div>
									<div className="flex flex-col gap-5 w-[100%] items-center p-5">
										<div className="flex flex-col gap-2 w-[100%]">
											<p>{product.name}</p>
											<p>${product.price}</p>
										</div>
										<button
											onClick={() => {
												handleSelectedProducts(product.id);
											}}
											className={`btn btn-lg py-4 px-6 ${
												product.selected
													? ' border-2 border-orange-600 bg-white text-orange-600'
													: 'border-0 bg-linear-to-r from-[rgba(231,0,11,1)] to-[rgba(255,105,0,1)] text-white'
											}  rounded-xl w-[fit-content]  font-bold  cursor-pointer`}>
											{product.selected ? 'Remove from cart' : 'Add to cart'}
										</button>
									</div>
								</div>
							))}
					</div>
				)}
				<div>
					<div className="join">
						{Array(Math.ceil(products.length / pageSize))
							.fill(0)
							.map((item, index) => (
								<input
									onClick={() => handleCurrentPage(index + 1)}
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
		</div>
	);
}

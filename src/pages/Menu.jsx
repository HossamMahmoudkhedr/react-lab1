import React, { useEffect } from 'react';
import ProductMenuCard from '../components/ProductMenuCard';

export default function Menu({
	products,
	categories,
	loadingProducts,
	loadingCategories,
	selectedCategory,
	handleCategory,
	handleSearchInput,
	handleSelectedProducts,
	handleCurrentPage,
	currentPage,
}) {
	const pageSize = 8;

	useEffect(() => {
		handleCategory('All');
	}, []);

	return (
		<div className="py-14 mt-15">
			<div className="flex justify-center">
				<div className={`flex flex-col items-center gap-4 w-[40%]`}>
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
					{loadingCategories && (
						<div className="d-flex justify-center items-center w-[100%] h-[90vh]">
							<span className="loading loading-dots loading-lg text-orange-600"></span>
						</div>
					)}
					{!loadingCategories && (
						<div className="flex flex-wrap gap-4 justify-center">
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
				{!loadingProducts && products.length === 0 && (
					<p className="text-gray-400">No data found.</p>
				)}
				{!loadingProducts && (
					<div className="grid grid-cols-4 gap-6">
						{products
							.slice((currentPage - 1) * pageSize, currentPage * pageSize)
							.map((product) => (
								<ProductMenuCard
									key={product.id}
									product={product}
									handleSelectedProducts={handleSelectedProducts}
								/>
							))}
					</div>
				)}
				<div>
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
		</div>
	);
}

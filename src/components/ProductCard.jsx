import React from 'react';

export default function ProductCard({
	product,
	handleSelectedProducts,
	plusProduct,
	minusProduct,
}) {
	return (
		<div className="p-4 rounded-lg relative bg-white w-[320px]">
			<div className="flex gap-3">
				<button
					onClick={() => {
						handleSelectedProducts(product.id);
					}}
					className=" absolute top-5 right-5 p-0 w-[25px] h-[25px] cursor-pointer">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-6">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
						/>
					</svg>
				</button>
				<div className="w-[50%] h-[100px]">
					<img
						className="w-[100%] h-[100%] object-cover"
						src={product.image}
						alt=""
					/>
				</div>
				<div className="w-[30%]">
					<p>{product.name}</p>
					<p>${product.price}</p>
				</div>
			</div>
			<div className="flex items-center justify-center gap-4 w-[100%] mt-3">
				<button
					className="btn rounded-full"
					onClick={() => plusProduct(product.id)}>
					+
				</button>
				<span>{product.count}</span>
				<button
					className="btn rounded-full"
					onClick={() => minusProduct(product.id)}>
					-
				</button>
			</div>
		</div>
	);
}

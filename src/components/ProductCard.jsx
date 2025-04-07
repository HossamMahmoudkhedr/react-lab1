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
					className=" btn btn-outline rounded-full bg absolute top-5 right-5 p-0 w-[25px] h-[25px] hover:bg-black hover:text-white">
					X
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

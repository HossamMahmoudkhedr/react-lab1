import React from 'react';

export default function ProductMenuCard({ product, handleSelectedProducts }) {
	return (
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
	);
}

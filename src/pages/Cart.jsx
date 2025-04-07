import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/productCard';

export default function Cart({
	selectedProducts,
	handleSelectedProducts,
	resetSelectedList,
	plusProduct,
	minusProduct,
}) {
	return (
		<div>
			{selectedProducts.length > 0 && (
				<Link
					to="/menu"
					className="btn bg-black text-white px-4 py-2 fixed bottom-10 right-15">
					Back to menu
				</Link>
			)}
			<div className="w-[100%] h-[100vh] flex justify-center items-center">
				{selectedProducts.length === 0 && (
					<div className="shadow-2xl rounded-2xl p-6 flex flex-col items-center gap-4">
						<h3 className="text-gray-400">No items in the cart!</h3>
						<Link
							to="/menu"
							className="text-orange-400 hover:underline">
							Add some
						</Link>
					</div>
				)}
				{selectedProducts.length > 0 && (
					<div className="shadow-2xl rounded-2xl flex">
						<div className="flex items-center justify-center">
							<form className="flex flex-col gap-4 py-7 px-8  h-[100%] justify-center">
								<h2 className="font-bold text-4xl">You are one step away!</h2>
								<h2 className="font-semibold text-2xl">Enter your data:</h2>
								<div className="flex gap-4 items-center">
									<div className="w-[50%]">
										<label>First Name</label>

										<input
											type="text"
											placeholder="Frist Name"
											className="input input-md"
										/>
									</div>
									<div>
										<label className="w-[50%]">Last Name</label>

										<input
											type="text"
											placeholder="Last Name"
											className="input input-md "
										/>
									</div>
								</div>
								<div className="flex gap-4 items-center">
									<div className=" w-[70%]">
										<label>Credit Card</label>
										<input
											type="text"
											placeholder="Credit Card"
											className="input input-md w-[100%]"
										/>
									</div>
									<div className="w-[30%]">
										<label>CCV</label>

										<input
											type="text"
											placeholder="CCV"
											className="input input-md "
										/>
									</div>
								</div>
								<button className="bg-linear-to-r from-[rgba(231,0,11,1)] to-[rgba(255,105,0,1)] rounded-lg text-white px-6 py-4 cursor-pointer">
									Check Out!
								</button>
							</form>
						</div>
						<div className="flex flex-col h-[500px] justify-between bg-gray-200">
							<div className="flex flex-col gap-4 py-2 px-2 overflow-y-scroll h-[100%]">
								{selectedProducts.length > 0 &&
									selectedProducts.map((product) => (
										<ProductCard
											key={product.id}
											product={product}
											handleSelectedProducts={handleSelectedProducts}
											plusProduct={plusProduct}
											minusProduct={minusProduct}
										/>
									))}
							</div>
							<div className="py-6 px-4 border-t-1 flex items-center justify-between bg-black text-white">
								<div>
									<h4 className="font-bold text-xl">Total Price</h4>
									<p className="font-bold text-3xl">
										$
										{selectedProducts.reduce((prev, { price, count }) => {
											const number = price * count;
											return parseFloat((prev + number).toFixed(2));
										}, 0)}
									</p>
								</div>
								<button
									onClick={resetSelectedList}
									className="btn btn-warning text-white">
									Reset
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

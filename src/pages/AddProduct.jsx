import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AddProduct({ categories, handleAddProduct }) {
	const [data, setData] = useState({
		name: '',
		price: 0,
		image: '',
		category: 'Pick a category',
	});
	const [loading, setLoading] = useState(false);
	//https://api.imgbb.com/1/upload?key=7c167060483adcb497f8107c087eb5b0

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (
			data.name &&
			data.price &&
			data.image &&
			data.category !== 'Pick a category'
		) {
			setLoading(true);
			try {
				const req = await handleAddProduct(e, data);
				setLoading(false);
				setData({
					name: '',
					price: '',
					image: '',
					category: 'Pick a category',
				});
			} catch (error) {
				setLoading(false);
				console.log(error);
			}
		} else {
			toast.error("Can't add product data!");
		}
	};
	return (
		<div className="mt-10 pt-15 max-w-86 mx-auto">
			<h2 className="text-3xl font-bold mb-4">Let's add a new one</h2>
			<form
				onSubmit={(e) => {
					handleSubmit(e);
				}}
				className="flex flex-col gap-4">
				<div className="flex flex-col gap-2 w-[100%]">
					<label htmlFor="name">Product Name</label>
					<input
						type="text"
						id="name"
						name="name"
						placeholder="Enter Product Name"
						className="input input-md w-[100%]"
						value={data.name}
						onChange={(e) => {
							setData({ ...data, [e.target.name]: e.target.value });
						}}
					/>
				</div>
				<div className="flex flex-col gap-2 w-[100%]">
					<label htmlFor="price">Price</label>
					<input
						type="text"
						id="price"
						name="price"
						placeholder="Enter Product Price"
						className="input input-md w-[100%]"
						value={data.price || ''}
						onChange={(e) => {
							setData({ ...data, [e.target.name]: parseInt(e.target.value) });
						}}
					/>
				</div>
				<div className="flex flex-col gap-2 w-[100%]">
					<label htmlFor="image">Product Image</label>
					<input
						type="file"
						id="image"
						name="image"
						placeholder="Enter Product Image"
						className="input input-md w-[100%]"
						onChange={(e) => {
							setData({ ...data, [e.target.name]: e.target.files[0] });
						}}
					/>
				</div>
				<div className="flex flex-col gap-2 w-[100%]">
					<label htmlFor="category">Choose Category</label>
					<select
						id="category"
						name="category"
						className="select w-[100%]"
						value={data.category}
						onChange={(e) => {
							setData({ ...data, [e.target.name]: e.target.value });
						}}>
						<option disabled={true}>Pick a category</option>

						{[...categories].slice(1).map((category) => (
							<option
								key={category.id}
								value={category.name}>
								{category.name}
							</option>
						))}
					</select>
				</div>
				<div className="flex flex-col gap-4">
					<button
						type="submit"
						disabled={loading}
						className="btn btn-lg py-4 px-6 bg-linear-to-r from-[rgba(231,0,11,1)] to-[rgba(255,105,0,1)] text-white">
						{!loading ? (
							'Add Product'
						) : (
							<span className="loading loading-dots loading-lg text-white"></span>
						)}
					</button>
					<Link
						to="/admin"
						className="btn btn-lg py-4 px-6 border-1 border-orange-600 text-orange-600 bg-white ">
						Back
					</Link>
				</div>
			</form>
		</div>
	);
}

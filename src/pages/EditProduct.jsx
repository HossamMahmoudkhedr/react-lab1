import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getData } from '../utils/helper';
import Loading from '../components/Loading';
import axios from 'axios';
import { toast } from 'react-toastify';

let productName;
export default function Editproduct({ editProduct, categories }) {
	const { id } = useParams();
	const [data, setData] = useState({
		name: '',
		price: 0,
		image: '',
		category: 'Pick a category',
	});
	const [loading, setLoading] = useState(false);
	const [btnLoading, setBtnLoading] = useState(false);
	const [imgLoading, setImgLoading] = useState(false);

	useEffect(() => {
		(async function getProduct() {
			setLoading(true);
			try {
				const req = await getData(`/menu/${id}`);
				setData({ ...req.data });
				productName = req.data.name;
				setLoading(false);
			} catch (error) {
				setLoading(false);
				console.log(error);
			}
		})();
	}, []);

	const handleUploadImg = async (e) => {
		setImgLoading(true);
		try {
			const res = await axios.post(
				'https://api.cloudinary.com/v1_1/dfujoudf4/image/upload',
				{
					upload_preset: 'dfujoudf4',
					cloud_name: 'dfujoudf4',
					file: e.target.files[0],
				},
				{ headers: { 'Content-Type': 'multipart/form-data' } }
			);
			setData({ ...data, [e.target.name]: res.data.secure_url });
			setImgLoading(false);
		} catch (error) {
			setImgLoading(false);
			toast.error("Can't Upload Image!");
			console.log(error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (
			data.name &&
			data.price &&
			data.image &&
			data.category !== 'Pick a category'
		) {
			setBtnLoading(true);
			try {
				const req = await editProduct(e, id, data);
				console.log(req);
				setBtnLoading(false);
			} catch (error) {
				console.log(error);
				setBtnLoading(false);
			}
		} else {
			toast.error("Can't Edit Product without data");
		}
	};
	console.log(data);
	return (
		<>
			{loading && <Loading />}
			<div className="my-15 pt-15 max-w-86 mx-auto">
				<h2 className="text-3xl font-bold mb-4">Update {productName}</h2>
				<div className="mb-4 max-h-[260px] w-[100%]">
					{imgLoading && (
						<div className="w-[100%] h-[100%] flex items-center justify-center">
							<span className="loading loading-dots loading-xl text-orange-600 "></span>
						</div>
					)}
					{!imgLoading && (
						<img
							className="w-[100%] h-[100%] object-cover"
							src={data.image || null}
							alt={data.name}
						/>
					)}
				</div>
				<form
					onSubmit={(e) => handleSubmit(e)}
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
							onChange={handleUploadImg}
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
							disabled={btnLoading}
							className="btn btn-lg py-4 px-6 bg-linear-to-r from-[rgba(231,0,11,1)] to-[rgba(255,105,0,1)] text-white">
							{!btnLoading ? (
								'Edit Product'
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
		</>
	);
}

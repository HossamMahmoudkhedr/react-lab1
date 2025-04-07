import React from 'react';
import Title from './Title';
import { Link } from 'react-router-dom';

export default function Navbar({ selectedProducts }) {
	return (
		<div className="navbar bg-base-100 shadow-sm px-9 fixed w-[100%] start-0 top-0 z-[1]">
			<div className=" flex-1">
				<div className="btn btn-ghost text-xl">
					<Link to="/">
						<Title />
					</Link>
				</div>
			</div>
			<div className="flex items-center gap-3">
				<div className="dropdown dropdown-end">
					<div
						tabIndex={0}
						role="button"
						className="btn btn-ghost btn-circle">
						<div className="indicator">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								{' '}
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
								/>{' '}
							</svg>
							<span className="badge badge-sm indicator-item bg-orange-600 text-white">
								{selectedProducts.length}
							</span>
						</div>
					</div>
					<div
						tabIndex={0}
						className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
						<div className="card-body">
							<span className="text-lg font-bold">
								{selectedProducts.length} Items
							</span>
							<span className="text-info">
								Total: $
								{selectedProducts.length > 0
									? selectedProducts.reduce((prev, { price, count }) => {
											const number = price * count;
											return parseFloat((prev + number).toFixed(2));
									  }, 0)
									: 0}
							</span>
							{selectedProducts.length > 0 && (
								<div className="card-actions">
									<Link
										to="/cart"
										className="btn btn-primary btn-block border-0 bg-black hover:scale-[1.05]">
										View cart
									</Link>
								</div>
							)}
						</div>
					</div>
				</div>
				<div className="dropdown dropdown-end">
					<div
						tabIndex={0}
						role="button"
						className="btn btn-ghost btn-circle avatar">
						<div className="w-10 rounded-full">
							<img
								alt="Tailwind CSS Navbar component"
								src="https://cdn-icons-png.flaticon.com/512/6858/6858504.png"
							/>
						</div>
					</div>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
						<li>
							<a className="justify-between">
								Profile
								<span className="badge">New</span>
							</a>
						</li>
						<li>
							<a>Settings</a>
						</li>
						<li>
							<a>Logout</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

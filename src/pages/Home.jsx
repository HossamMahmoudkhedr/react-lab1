import React, { useState } from 'react';
import Title from '../components/Title';
import { Link } from 'react-router-dom';

export default function Home() {
	const [admin, setAdmin] = useState(true);
	return (
		<div className="px-6 py-4 flex flex-col justify-center items-center gap-6 h-[90vh]">
			<div className="fixed end-9 bottom-9 cursor-default">
				<section className="secret text-center flex items-center justify-center font-bold">
					<p>Hey!</p>
					<div className="flex flex-col gap-3 items-center">
						{admin && (
							<>
								<p>Are you admin? 🤔</p>
								<div className="flex gap-2">
									<Link
										to="/admin"
										className="btn">
										Yes
									</Link>
									<button
										className="btn"
										onClick={() => {
											setAdmin(false);
										}}>
										No
									</button>
								</div>
							</>
						)}

						{!admin && (
							<>
								<p>Well, thanks for your honesty! 🤨</p>
							</>
						)}
					</div>
				</section>
			</div>
			<div className="flex flex-col items-center gap-6">
				<h1 className="text-7xl">
					<span className="font-bold">Welcome to</span> <Title />{' '}
				</h1>
				<p className="text-lg w-[60%] text-center text-gray-400">
					From the first bite to the last sip, we’re here to make your mealtime
					something special — every single day.
				</p>
			</div>
			<div>
				<Link
					to="/menu"
					style={{ transition: 'all 0.6s ease-out' }}
					className="btn bg-black font-bold text-white text-xl py-6 px-7 hover:bg-linear-to-r from-[rgba(231,0,11,1)] to-[rgba(255,105,0,1)] hover:scale-[1.1] ">
					Let's make your dish
				</Link>
			</div>
		</div>
	);
}

import React from 'react';

export default function Loading() {
	return (
		<div className="fixed start-0 top-0 w-[100%] h-[100vh] flex items-center justify-center z-[1]">
			<div className="absolute start-0 top-0 w-[100%] h-[100%] opacity-35 bg-gray-400"></div>
			<span className="loading loading-dots loading-xl text-orange-600 "></span>
		</div>
	);
}

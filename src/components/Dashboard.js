import React from 'react';

export default function Dashboard() {
	return (
		<div className="full-height-no-navbar">
			<section className="text-gray-600 body-font">
				<div className="container px-5 py-24 mx-auto">
					<div className="flex flex-wrap -m-4 text-center">
						<div className="p-6 sm:w-1/4 w-1/2">
							<h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">14</h2>
							<p className="leading-relaxed">Files</p>
						</div>
						<div className="p-6 sm:w-1/4 w-1/2">
							<h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">3</h2>
							<p className="leading-relaxed">Public files</p>
						</div>
						<div className="p-6 sm:w-1/4 w-1/2">
							<h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">321 MB</h2>
							<p className="leading-relaxed">Size</p>
						</div>
						<div className="p-6 sm:w-1/4 w-1/2">
							<h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">4</h2>
							<p className="leading-relaxed">...</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

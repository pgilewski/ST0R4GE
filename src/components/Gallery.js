import React from 'react';

export function Tags() {
	return (
		<div>
			<div>
				<div className="ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full bg-white text-gray-700 border">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="feather feather-hard-drive mr-2"
					>
						<line x1="22" y1="12" x2="2" y2="12" />
						<path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
						<line x1="6" y1="16" x2="6.01" y2="16" />
						<line x1="10" y1="16" x2="10.01" y2="16" />
					</svg>
					Tag
				</div>
				<div className="ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full bg-white text-gray-700 border">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="feather feather-hard-drive mr-2" /*  */
					>
						<line x1="22" y1="12" x2="2" y2="12" />
						<path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
						<line x1="6" y1="16" x2="6.01" y2="16" />
						<line x1="10" y1="16" x2="10.01" y2="16" />
					</svg>
					Tag
				</div>

				<div className="ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full bg-white text-gray-700 border">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="feather feather-hard-drive mr-2"
					>
						<line x1="22" y1="12" x2="2" y2="12" />
						<path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
						<line x1="6" y1="16" x2="6.01" y2="16" />
						<line x1="10" y1="16" x2="10.01" y2="16" />
					</svg>
					Tag
				</div>
			</div>
		</div>
	);
}

export default function Gallery() {
	return (
		<div className="full-height-no-navbar">
			<div className="text-gray-600 body-font ">
				<div className="container px-5 py-24 mx-auto">
					<div className="flex flex-col text-center w-full mb-20">
						<h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
							Gallery
						</h1>
						<p className="lg:w-2/3 mx-auto leading-relaxed text-base">
							Search, filter and grid settings are coming up next, as app is still in development.
                            
						</p>
					</div>
					<div className="flex flex-wrap m-4 ">
						<div className="lg:w-1/3 sm:w-1/2 p-4">
							<div className="flex relative">
								<img
									alt="gallery"
									className="absolute inset-0 w-full h-full object-cover object-center"
									src="https://dummyimage.com/600x360"
								/>
								<div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
									<h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">
										THE SUBTITLE
									</h2>
									<h1 className="title-font text-lg font-medium text-gray-900 mb-3">
										Shooting Stars
									</h1>
									<Tags />
								</div>
							</div>
						</div>
						<div className="lg:w-1/3 sm:w-1/2 p-4">
							<div className="flex relative">
								<img
									alt="gallery"
									className="absolute inset-0 w-full h-full object-cover object-center"
									src="https://dummyimage.com/601x361"
								/>
								<div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
									<h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">
										THE SUBTITLE
									</h2>
									<h1 className="title-font text-lg font-medium text-gray-900 mb-3">The Catalyzer</h1>
									<Tags />
								</div>
							</div>
						</div>
						<div className="lg:w-1/3 sm:w-1/2 p-4">
							<div className="flex relative">
								<img
									alt="gallery"
									className="absolute inset-0 w-full h-full object-cover object-center"
									src="https://dummyimage.com/603x363"
								/>
								<div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
									<h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">
										THE SUBTITLE
									</h2>
									<h1 className="title-font text-lg font-medium text-gray-900 mb-3">The 400 Blows</h1>
									<Tags />
								</div>
							</div>
						</div>
						<div className="lg:w-1/3 sm:w-1/2 p-4">
							<div className="flex relative">
								<img
									alt="gallery"
									className="absolute inset-0 w-full h-full object-cover object-center"
									src="https://dummyimage.com/602x362"
								/>
								<div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
									<h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">
										THE SUBTITLE
									</h2>
									<h1 className="title-font text-lg font-medium text-gray-900 mb-3">Neptune</h1>
									<Tags />
								</div>
							</div>
						</div>
						<div className="lg:w-1/3 sm:w-1/2 p-4">
							<div className="flex relative">
								<img
									alt="gallery"
									className="absolute inset-0 w-full h-full object-cover object-center"
									src="https://dummyimage.com/605x365"
								/>
								<div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
									<h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">
										THE SUBTITLE
									</h2>
									<h1 className="title-font text-lg font-medium text-gray-900 mb-3">
										Holden Caulfield
									</h1>
									<Tags />
								</div>
							</div>
						</div>
						<div className="lg:w-1/3 sm:w-1/2 p-4">
							<div className="flex relative">
								<img
									alt="gallery"
									className="absolute inset-0 w-full h-full object-cover object-center"
									src="https://dummyimage.com/606x366"
								/>
								<div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
									<h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">
										THE SUBTITLE
									</h2>
									<h1 className="title-font text-lg font-medium text-gray-900 mb-3">Alper Kamu</h1>
									<Tags />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

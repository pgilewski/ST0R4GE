import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
	return (
		// find your recipe today
		<div className="dark:bg-gray-800 w-full font-mono full-height-no-navbar">
			<div className="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
				{/* 				<h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
					<span className="block ">Get a grip around your pictures.</span>
					<span className="block text-indigo-500 text-3xl">Try it today.</span>
				</h2> */}
				<div className="text-center mb-6">
					<h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
						Organize your photos on the run.
					</h1>
					<p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
						Use fast and reliable app to get a grip on your files and have access to them from everywhere.<br />
						<a className="text-blue-800" href="github.com">
							Check Github repository.
						</a>
					</p>
				</div>
				<div className="lg:mt-0 lg:flex-shrink-0">
					<div className="inline-flex rounded-md">
						<Link to="/recognize">
							<button
								type="button"
								className="py-4 px-6  bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
							>
								Go to demo
							</button>
						</Link>
					</div>
				</div>
				<div className="lg:w-3/5 xl:w-2/5 flex flex-col items-start relative z-10 mt-4">
					<h1 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl leading-tight mt-4">
						<br />
					</h1>
				</div>
				<section className="text-gray-600 body-font">
					<div className="container px-5 py-2 mx-auto">
						<div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
							<div className="p-2 sm:w-1/2 w-full">
								<div className="bg-gray-100 rounded flex p-4 h-full items-center">
									<svg
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="3"
										className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
										viewBox="0 0 24 24"
									>
										<path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
										<path d="M22 4L12 14.01l-3-3" />
									</svg>
									<span className="title-font font-medium" >Trzymanie plików na s3</span>
								</div>
							</div>
							<div className="p-2 sm:w-1/2 w-full">
								<div className="bg-gray-100 rounded flex p-4 h-full items-center">
									<svg
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="3"
										className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
										viewBox="0 0 24 24"
									>
										<path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
										<path d="M22 4L12 14.01l-3-3" />
									</svg>
									<span className="title-font font-medium">Tworzenie folderów</span>
								</div>
							</div>
							<div className="p-2 sm:w-1/2 w-full">
								<div className="bg-gray-100 rounded flex p-4 h-full items-center">
									<svg
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="3"
										className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
										viewBox="0 0 24 24"
									>
										<path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
										<path d="M22 4L12 14.01l-3-3" />
									</svg>
									<span className="title-font font-medium">Wykorzystanie AWS Rekognition</span>
								</div>
							</div>
							<div className="p-2 sm:w-1/2 w-full">
								<div className="bg-gray-100 rounded flex p-4 h-full items-center">
									<svg
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="3"
										className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
										viewBox="0 0 24 24"
									>
										<path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
										<path d="M22 4L12 14.01l-3-3" />
									</svg>
									<span className="title-font font-medium">Oznaczanie zdjęć tagami</span>
								</div>
							</div>
							<div className="p-2 sm:w-1/2 w-full">
								<div className="bg-gray-100 rounded flex p-4 h-full items-center">
									<svg
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="3"
										className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
										viewBox="0 0 24 24"
									>
										<path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
										<path d="M22 4L12 14.01l-3-3" />
									</svg>
									<span className="title-font font-medium">Tworzenie publicznych linków</span>
								</div>
							</div>
							<div className="p-2 sm:w-1/2 w-full">
								<div className="bg-gray-100 rounded flex p-4 h-full items-center">
									<svg
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="3"
										className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
										viewBox="0 0 24 24"
									>
										<path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
										<path d="M22 4L12 14.01l-3-3" />
									</svg>
									<span className="title-font font-medium">Przyjazny interfejs(może)</span>
								</div>
							</div>
						</div>

					</div>
				</section>
			</div>
		</div>
	);
}

export default Home;

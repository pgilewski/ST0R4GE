import React from 'react';
import { useState, useEffect } from 'react';
import { Storage } from 'aws-amplify';
import { RestoreObjectCommand } from '@aws-sdk/client-s3';
import LoadingSpinner from './LoadingSpinner';

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

/* Example array of objects structure:
	[{
		key: "12rfg42131wce2412xs2.jpg",
		labels: [ { "S" : "Person" }, { "S" : "Human" } ]
	}]
*/
export default function Gallery() {
	const [ imagesUrls, setImagesUrls ] = useState([]);
	const [ objects, setObjects ] = useState([]);
	const [ loading, setLoading ] = useState(true);

	useEffect(() => {
		async function getImages() {
			await Storage.list('', { level: 'private' })
				.then(async (result) => {
					for (const item of result) {
						const imageUrl = await Storage.get(item.key, { level: 'private' });
						console.log(imageUrl)
						setImagesUrls((prevImagesUrls) => [ ...prevImagesUrls, imageUrl ]);
					}
				})
				.then((d)=>{
					setLoading(false);
					console.log("Some data:", d)
				});
		}
		getImages()
	}, []);

	const RenderImages = () => {
		return(
			imagesUrls.map((link) => {
				return(
					<div className="lg:w-1/3 sm:w-1/2 p-4">
						<div className="flex relative">
							<img
								alt="gallery"
								className="absolute inset-0 w-full h-full object-cover object-center"
								src={link}
							/>
							<div className="px-8 py-24 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
								<h2 className="tracking-widest text-sm title-font font-medium text-indigo-500">
								</h2>
								<Tags />
							</div>
						</div>
					</div>
				)
			})
		)
	};

	return (
		<div className="full-height-no-navbar">
			<div className="text-gray-600 body-font ">
				<div className="container px-5 py-24 mx-auto">
					<div className="flex flex-col text-center w-full mb-20">
						<h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Gallery</h1>
						<p className="lg:w-2/3 mx-auto leading-relaxed text-base">
							Search, filter and grid settings are coming up next, as app is still in development.
						</p>
					</div>
					{loading ? <LoadingSpinner /> : 					<div className="flex flex-wrap m-4 ">
						<RenderImages/></div>}
				</div>
			</div>
		</div>
	);
}
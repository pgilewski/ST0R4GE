import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import { useState, useEffect } from 'react';
import { Storage, Auth, API, graphqlOperation } from 'aws-amplify';
import { getPicture } from '../graphql/queries';

const Tags = (props) => {
	return (
		<div>
			<div>
				{
					props.labels.map((label, i) => {
						return(
							<div key={i} className="ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full bg-white text-gray-700 border">
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
								{label}
							</div>
						)
					})
				}
				<div className="inline-flex ">

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

export function GalleryNavbar ({setLabel}) {
	
	function capitalize(input) {
		const CapitalizedWords = [];
		//jezeli inoput nie jest pusty I jeżeli nie kończy się spacja
		if (input !== '' && input.charAt(input.length -1) !== ' '){
			const words = input.split(' ');
			words.forEach(word => {
				CapitalizedWords.push(word[0].toUpperCase() + word.slice(1, word.length));
			});
			//jezeli kończy się spacją
		} else if (input.charAt(input.length -1) === ' ') {
			const words = input.split(' ');
			words.pop()
			words.forEach(word => {
				CapitalizedWords.push(word[0].toUpperCase() + word.slice(1, word.length));
			});
		}else{
			//jeżeli jest pusty
		}
		return CapitalizedWords.join(' ');
	}

	return(

		<div>
			<nav className="bg-white dark:bg-gray-800  shadow py-4 ">
				<div className="max-w-7xl mx-auto px-8">
					<div className="flex items-center justify-between md:h-16">
						<div className=" flex items-center">
							<div className="hidden md:block">
								<div className="ml-10 flex items-baseline space-x-4">
{/*									<a className="text-gray-800 dark:text-white  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium"
									   href="">
										folder1
									</a>
									<a className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium"
									   href="">
										folder2
									</a>
									<a className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium"
									   href="">
										folder3
									</a>*/}
								</div>
							</div>
						</div>
						<div className="block">
							<div className="-mr-2 flex">
								<form
									className="flex flex-row w-3/4 w-full max-w-sm space-x-3 md:space-y-0 justify-center">
									<div className=" relative ">
										<input
												onChange={(e) => {
													setLabel(capitalize(e.target.value))
												}}
												type="text" id="&quot;form-subscribe-Search"
											   	className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
												placeholder="search"/>
									</div>
								</form>
							</div>
						</div>
{/*						<div className="-mr-2 flex md:hidden">
							<button
								className="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
								<svg width="20" height="20" fill="currentColor" className="h-8 w-8"
									 viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z">
									</path>
								</svg>
							</button>
						</div>*/}
					</div>
				</div>

			</nav>
		</div>

	)
}

export function RenderImages ({ pictures, label }) {
	return(
		pictures.map((picture, i) => {
			const { labels, url } = picture

			if (label === '' | labels.find(a => a.includes(label)) !== undefined){
				return(
					<div key={i} className="lg:w-1/3 sm:w-1/2 p-4">
						<div className="flex relative">
							<img
								alt="gallery"
								className="absolute inset-0 w-full h-full object-cover object-center"
								src={url}
							/>
							<div className="px-8 py-24 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
								<h2 className="tracking-widest text-sm title-font font-medium text-indigo-500">
								</h2>
								<Tags labels={labels}/>
							</div>
						</div>
					</div>
				)
			} else {
				return null
			}
		})
	)
};


export default function Gallery() {
	const [ pictures, setPictures ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [ label, setLabel ] = useState('');



	useEffect(() => {
		async function getImages() {
			const creds = await Auth.currentCredentials()

			await Storage.list('', { level: 'private' })
				.then(async (result) => {
					for (const item of result) {

						const url = await Storage.get(item.key, { level: 'private' });
						const labels = await API.graphql(graphqlOperation(getPicture, {id: `private/${creds.identityId}/${item.key}`}))

						setPictures(
							(prevPictures) => [ ...prevPictures, {
								url,
								labels: labels ? labels.data.getPicture.labels : null
							} ]
						);
					}
				})
				.then(()=>{
					setLoading(false);
				});
		}
		getImages()
	}, []);


	return (
		<div className="full-height-no-navbar">
			<div className="text-gray-600 body-font ">
				<div className="container px-5 py-24 mx-auto">
					<div className="flex flex-col text-center w-full mb-8">
						<h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Gallery</h1>
						<p className="lg:w-2/3 mx-auto leading-relaxed text-base mb-8">
							Search, filter and grid settings are coming up next, as app is still in development.
						</p>
						<GalleryNavbar setLabel={setLabel}/>
					</div>
					{loading ? <LoadingSpinner/> : 					<div className="flex flex-wrap m-4 ">
						<RenderImages pictures={pictures} label={label}/></div>}
				</div>
			</div>
		</div>
	);
}
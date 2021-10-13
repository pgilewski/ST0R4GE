import React, { useEffect, useState } from 'react';
/* import { API, graphqlOperation } from 'aws-amplify';
import { listPictures, listProfiles } from '../graphql/queries'; */
import picture from '../assets/images/dashboard.png'
export default function Dashboard() {
	return( 
		<div className="full-height-no-navbar flex justify-center align-middle items-center">
			<img src={picture} className="md:mx-8"/>
		</div>
	)
}
/* 
export default function Dashboard() {

	const [ dashboardState, setDashboardState ] = useState({files: null, profiles: null})

	const getFileCount = async () => {
		const response = await API.graphql(graphqlOperation(listPictures))
		setDashboardState({
			...dashboardState,
			files: response.listPictures.items.length
		})
	}

	const getProfileCount = async () => {
		const response = await API.graphql(graphqlOperation(listProfiles))
		setDashboardState({
			...dashboardState,
			profiles: response.listProfiles.items.length
		})
	}
	useEffect(() => {
		getFileCount();
		getProfileCount();
	})
	return (
		<div className="full-height-no-navbar">
			<section className="text-gray-600 body-font">
				<div className="container px-5 py-24 mx-auto">
					<div className="flex flex-wrap -m-4 text-center">
						<div className="p-6 sm:w-1/4 w-1/2">
							<h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">{dashboardState.files ==! null? dashboardState.files : null}</h2>
							<p className="leading-relaxed">Files</p>
						</div>
						<div className="p-6 sm:w-1/4 w-1/2">
							<h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">&nbsp;</h2>
							<p className="leading-relaxed">&nbsp;</p>
						</div>
						<div className="p-6 sm:w-1/4 w-1/2">
							<h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">&nbsp;</h2>
							<p className="leading-relaxed">&nbsp;</p>
						</div>
						<div className="p-6 sm:w-1/4 w-1/2">
							<h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">{dashboardState.profiles ==! null ? dashboardState.profiles : null }</h2>
							<p className="leading-relaxed">All users</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
 */
import React from 'react';
import picture from '../assets/images/dashboard.png';

export default function Dashboard() {
  return (
    <div className="full-height-no-navbar w-full max-h-full bg-white flex-column justify-center align-top items-center text-center font-mono py-12">
      <h2 className="tracking-wider sm:text-3xl text-2xl font-medium text-center title-font text-gray-900">
        Coming soon
      </h2>
      <img
        src={picture}
        alt=""
        className=" mx-auto w-4/5 sm:w-3/4 md:w-1/2 l:w-1/2 xl:w-1/3 mt-4"
      />
    </div>
  );
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

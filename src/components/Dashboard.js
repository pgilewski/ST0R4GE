import React, { useEffect, useState } from 'react';

export default function Dashboard() {
	const [ dots, setDots ] = useState('');
	const [ i, setI ] = useState(1);
	const [ filesAmount, setFilesAmount ] = useState(null);
	useEffect(async () => {
		await Storage.list('', { level: 'private' }).then((response) => {
			setFilesAmount(response.length);
		});
	});
	useEffect(
		() => {
			if (i % 4 === 0) {
				setTimeout(() => {
					setDots('');
				}, 1000);
			} else {
				setTimeout(() => {
					setDots(dots + '.');
				}, 1000);
			}
			setI(i + 1);
		},
		[ dots ]
	);

	return (
		<div className="h-screen bg-white  dark:bg-gray-700 w-full max-h-full  flex-column justify-center align-top items-center text-center font-mono py-12">
			{/* <h2 className="dark:text-gray-200 tracking-wider sm:text-3xl text-2xl font-medium text-center title-font text-gray-900">
        Coming soon {dots}
      </h2>
      <img
        src={picture}
        className=" mx-auto w-4/5 sm:w-3/4 md:w-1/2 l:w-1/2 xl:w-1/3 mt-4"
      /> */}
			<div class="grid grid-cols-2 gap-8 p-4 lg:grid-cols-3 xl:grid-cols-3">
				<div class="flex items-center justify-between p-4 bg-gray-300 dark:bg-white rounded-md dark:bg-darker">
					<div>
						<h6 class="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light">
							Files limit
						</h6>
						<span class="text-xl font-semibold">{filesAmount}/20</span>
						{/* <span class="inline-block px-2 py-px ml-2 text-xs text-green-500 bg-green-100 rounded-md">
							3.4%
						</span> */}
					</div>
					<div>
						<span className="text-blue-800 cursor-pointer">Change plan</span>
					</div>
				</div>

				{/* <div class="flex items-center justify-between p-4 bg-gray-300 dark:bg-white rounded-md dark:bg-darker">
          <div>
            <h6 class="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light">
              Users
            </h6>
            <span class="text-xl font-semibold">50,021</span>
            <span class="inline-block px-2 py-px ml-2 text-xs text-green-500 bg-green-100 rounded-md">
              +2.6%
            </span>
          </div>
          <div>
            <span>
              <svg
                class="w-12 h-12 text-gray-700 dark:text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                ></path>
              </svg>
            </span>
          </div>
        </div>

        <div class="flex items-center justify-between p-4 bg-gray-300 dark:bg-white rounded-md dark:bg-darker">
          <div>
            <h6 class="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light">
              Followers
            </h6>
            <span class="text-xl font-semibold">45,021</span>
            <span class="inline-block px-2 py-px ml-2 text-xs text-green-500 bg-green-100 rounded-md">
              +3.1%
            </span>
          </div>
          <div>
            <span>
              <svg
                class="w-12 h-12 text-gray-700 dark:text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                ></path>
              </svg>
            </span>
          </div>
        </div> */}

				{/* <div class="flex items-center justify-between p-4 bg-gray-300 dark:bg-white rounded-md dark:bg-darker">
          <div>
            <h6 class="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light">
              Tickets
            </h6>
            <span class="text-xl font-semibold">20,516</span>
            <span class="inline-block px-2 py-px ml-2 text-xs text-green-500 bg-green-100 rounded-md">
              +3.1%
            </span>
          </div>
          <div>
            <span>
              <svg
                class="w-12 h-12 text-gray-300 dark:text-primary-dark"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                ></path>
              </svg>
            </span>
          </div>
        </div> */}
			</div>
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

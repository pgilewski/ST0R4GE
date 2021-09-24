import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import avatar from '../assets/images/me.png';
import Container from './Container';

const UserInfo = (user) => {
	const { signOut } = useAuth();
	const [ profileInfo ] = useState(user);

	return (
		<Container>
			<div className="p-4">
				<div>
					<div
						className="w-full bg-cover bg-no-repeat bg-center"
						style={{
							height: '200px',
							backgroundImage: 'url(https://wallpapercave.com/wp/wp2771916.jpg)'
						}}
					>
						<img
							className="opacity-0 w-full h-full"
							src="https://wallpapercave.com/wp/wp2771916.jpg"
							alt=""
						/>
					</div>
					<div className="p-4">
						<div className="relative flex w-full">
							<div className="flex flex-1">
								<div style={{ marginTop: '-6rem' }}>
									<div
										style={{ height: '9rem', width: '9rem' }}
										className="md relative avatar"
									>
										<img
											className="md relative border-4 border-gray-900 w-36"
											src={avatar}
											alt="avatar"
										/>
										<div className="absolute" />
									</div>
								</div>
							</div>
							<div className="flex flex-col text-right">
								<button className="flex justify-center  max-h-max whitespace-nowrap focus:outline-none  focus:ring  rounded max-w-max border bg-transparent border-indigo-500 text-indigo-500 hover:border-indigo-800 hover:border-indigo-800 flex items-center hover:shadow-lg font-bold py-2 px-4  mr-0 ml-auto">
									Edit Profile
								</button>
							</div>
						</div>

						<div className=" justify-center w-full mt-3">
							<div>
								<h2 className="text-xl leading-6 font-bold text-left ">Przemek Gilewski</h2>
							</div>
							<div className="mt-3">
								<p className="mb-2 text-left">I like programming and playing guitar.
								</p>
								<div className="text-gray-600 flex">
									<span className="flex mr-2">
										<div className="cursor-pointer leading-4 text-indigo-500 background-gray-800 text-xs inline-flex items-center  leading-sm  px-3 py-1 rounded-full bg-white text-gray-700 border">
											spotify

				</div>

									</span>

									<span className="flex mr-2">
										<div onClick={()=> console.log("")} className="cursor-pointer leading-4 text-indigo-500 background-gray-800 text-xs inline-flex items-center  leading-sm  px-3 py-1 rounded-full bg-white text-gray-700 border">
											instagram
				</div>

									</span>
								</div>
							</div>
							<hr className="border-gray-800 mt-4" />

							<div className="pt-3 flex flex-col justify-start items-start w-full ">






{/*								<div className="relative text-left ">
									<label htmlFor="name-with-label" className="text-gray-700 ml-2">
										User
									</label>
									<input type="text" id="name-with-label"
										   className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
										   name="email" placeholder=""/>
								</div>*/}

								<div className=" relative opacity-50 pointer-events-none text-left">
									<label htmlFor="disabled-email" className="text-gray-700 ml-2">
										Email
									</label>
									<input type="text" id="disabled-email" disabled=""
										   className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
										   name="email" placeholder={profileInfo.user} disabled/>
								</div>

							</div>
						</div>
						<div className="text-left">

						</div>
					</div>

				</div>
				<div className="flex w-full justify-right">

					<button className="ml-auto py-2 px-4  mr-4 lex justify-center  max-h-max whitespace-nowrap focus:outline-none  focus:ring  rounded max-w-max border bg-transparent border-green-500 text-green-500 hover:border-green-800 hover:border-green-800 flex items-center hover:shadow-lg font-bold">
						Save
					</button>
				</div>
			</div>

		</Container>
	);
};

export default UserInfo;

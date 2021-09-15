import React from 'react';
import { Auth } from 'aws-amplify';
import { useState } from 'react';

export default function Register() {
	const initialFormState = {
		username: '',
		password: '',
		email: '',
		errorMsg: ''
	};

	const [ formState, updateFormState ] = useState(initialFormState);

	function onChange(e) {
		e.persist();
		updateFormState(() => ({ ...formState, [e.target.name]: e.target.value }));
	}

	const [ errorMessage, setErrorMessage ] = useState('');

	const signUp = async (formState) => {
		const { username, password } = formState;
		try {
			const { user } = await Auth.signUp({
				username,
				password
			});

			updateFormState({ ...formState, user: user });
			setErrorMessage(null);
		} catch (error) {
			setErrorMessage(error.message);
		}
	};

	return (
		<div>
			<div className="col-span-6 sm:col-span-3">
				<label htmlFor="username" className="block text-sm font-medium text-gray-700 mt-2">
					Email
				</label>
				<input
					onChange={onChange}
					type="text"
					name="username"
					id="username"
					autoComplete="email"
					className="border-2 mt-1 ring-indigo-500 focus:border-indigo-500 shadow-sm border-gray-300 rounded-md pl-1"
				/>

				<label htmlFor="password" className="block text-sm font-medium text-gray-700">
					Password
				</label>
				<input
					onChange={onChange}
					type="password"
					name="password"
					id="password"
					autoComplete="password"
					className="border-2 mt-1 ring-indigo-500 focus:border-indigo-500 shadow-sm border-gray-300 rounded-md pl-1"
				/>
				<div>
					<button
						className="border-2 border-gray-300 px-2 rounded-md mt-2"
						onClick={() => {
							signUp(formState);
						}}
					>
						{' '}
						Zarejestruj{' '}
					</button>
				</div>
				{errorMessage ? <div> Wystąpił błąd: {errorMessage} </div> : null}
			</div>
		</div>
	);
}

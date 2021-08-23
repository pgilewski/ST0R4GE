
import { useEffect, useState } from 'react';

import {
    Link
  } from "react-router-dom";
import useAuth from '../hooks/useAuth';

export default function Login(params) {
    const { signIn, signInSocial, error } = useAuth()
    
    const initialFormState = {
        username: '', password: '', email: ''
    }

    const [formState, updateFormState] = useState(initialFormState)

    function onChange(e) {
      e.persist()
      updateFormState(() => ({...formState, [e.target.name]: e.target.value }))
    }
    
    return (
        <div className="my-2">
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
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
          </div>

          <div>
            <button className="border-2 border-gray-300 px-2 rounded-md mt-2" onClick={() => signIn(formState)}> Zaloguj się </button>
          </div>

          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mt-2 mr-1" onClick={() => signInSocial({ provider: "Google" })}
          >
            Zaloguj sie z Google.
          </button>
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ml-1" onClick={() => signInSocial({ provider: "Facebook" })}
          >
            Zaloguj sie z Facebook.
          </button>
          <div>
            <p>Nie masz konta? <Link to="register" className="hover:underline text-blue-600">Zarejestruj się</Link></p>
          </div>
          {error ? (<div> Wystąpił błąd: {error} </div>) : null }

        </div>
      )
}


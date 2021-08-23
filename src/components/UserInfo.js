import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';


const UserInfo = props => {
  const { signOut } = useAuth()
  const [profileState, setProfileState] = useState(props);
  return (
    <div>
      <p>Jesteś zalogowany jako: {profileState.user}</p>
      <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={() => {signOut()}}
      >
        Wyloguj sie.
      </button>
  </div>
  );
};

export default UserInfo;
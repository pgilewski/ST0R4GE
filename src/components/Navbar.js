import { useAuthContext } from '../context/authContext'

import {
    Link
  } from "react-router-dom";


export default function Navbar () {

    const { currentUser } = useAuthContext();
  
    return ( 
        <div className="py-4 px-12 border-b border-gray-300">
      
          <Link to="/" className="">
            Home
          </Link>
      
          {currentUser && (
            <>    
              <Link to="/upload" className="ml-4">
                Upload image
              </Link>
              <Link to="/recipes" className="ml-4">
                Your recipes
              </Link></>
          )}
      
          <Link to="/profile" className="ml-4">
            Profile
          </Link>
      
        </div>
      )
}

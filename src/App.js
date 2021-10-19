import React, { useRef } from 'react';
import './App.css';
import {
  BrowserRouter as Router
} from "react-router-dom";

import Navbar from './components/Navbar'
import Routes from './routes/Routes'

import { AuthProvider } from './context/authContext';

function App() {

	const bodyInput = useRef(null);
  
  const onBodyClick = () => {
		avatarInput.current.click();
	}

  const user = localStorage.getItem('user');
  return (
    <AuthProvider user={user}>
      <Router>
        <div className="App justify-items-center h-screen w-screen bg-gray-300">
          <Navbar />
          <div onClick={onBodyClick} className="flex justify-center">
            <Routes/>
          </div>
        </div>
      </Router>
    </AuthProvider>

  );
}

export default App;

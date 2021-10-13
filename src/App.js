import React from 'react';
import './App.css';
import {
  BrowserRouter as Router
} from "react-router-dom";

import Navbar from './components/Navbar'
import Routes from './routes/Routes'

import { AuthProvider } from './context/authContext';

function App() {
  
  const user = localStorage.getItem('user');
  return (
    <AuthProvider user={user}>
      <Router>
        <div className="App justify-items-center h-screen w-screen bg-gray-300">
          <Navbar />
          <div className="flex justify-center ">
            <Routes/>
          </div>
        </div>
      </Router>
    </AuthProvider>

  );
}

export default App;

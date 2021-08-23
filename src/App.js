import './App.css';
import {
  BrowserRouter as Router
} from "react-router-dom";

import Navbar from './components/Navbar'
import Routes from './routes/Routes'

import { AuthProvider } from './context/authContext';
import { useEffect } from 'react';
import { Hub } from 'aws-amplify';


function App() {



  const user = localStorage.getItem('user');

  return (
    <AuthProvider user={user}>
      <Router>
        <div className="App justify-items-center">
          
          <Navbar />

          <Routes/>

        </div>
      </Router>
    </AuthProvider>

  );
}

export default App;

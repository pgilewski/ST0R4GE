/**
 * FIXME:
 * - (on prod) This XML file does not appear to have any style information associated with it. The document tree is shown below.
 *
 * TODO:
 * - no established internet connection handling
 */

import React, { useState } from 'react'
import './App.css'
import 'notyf/notyf.min.css'
import { BrowserRouter as Router } from 'react-router-dom'

import Navbar from './components/Navbar'
import Routes from './routes/Routes'

import { AuthProvider } from './context/authContext'

function App() {
  const [isNavbarDown, setIsNavbarDown] = useState(false)
  const [isProfileDown, setIsProfileDown] = useState(false)

  const bodyClick = () => {
    setIsProfileDown(false)
    setIsNavbarDown(false)
  }

  const user = localStorage.getItem('user')
  return (
    <AuthProvider user={user}>
      <Router>
        <div className="App justify-items-center h-screen w-screen ">
          <Navbar
            isNavbarDown={isNavbarDown}
            setIsNavbarDown={setIsNavbarDown}
            isProfileDown={isProfileDown}
            setIsProfileDown={setIsProfileDown}
          />
          <div onClick={bodyClick} className="flex justify-center ">
            <Routes />
          </div>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

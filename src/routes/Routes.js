import React, { useContext } from 'react'
import Upload from '../components/Upload'
import Home from '../components/Home'
import Register from '../components/Register'
import Login from '../components/Login'

import { Switch, Route, Redirect } from 'react-router-dom'

import { useAuthContext } from '../context/authContext'
import Dashboard from '../components/Dashboard'
import GalleryRouter from '../components/Gallery'
import Public from '../components/Public'
import Profile from '../components/Profile'
import NotyfContext from '../context/NotyfContext'

const ProtectedRoute = ({ children, ...rest }) => {
  const { currentUser } = useAuthContext()
  const notyf = useContext(NotyfContext)

  const { redirect } = rest
  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: redirect ? redirect : '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

const Routes = () => {
  const { currentUser } = useAuthContext()
  return (
    <Switch>
      <ProtectedRoute path="/upload" redirect="/login">
        <Upload className="full-height-no-navbar" />
      </ProtectedRoute>
      <Route path="/register">
        <Register className="full-height-no-navbar" />
      </Route>
      <Route path="/login">
        <Login className="full-height-no-navbar" />
      </Route>
      <Route path="/profile">
        <Profile className="full-height-no-navbar" />
      </Route>
      <ProtectedRoute redirect="/login" path="/dashboard">
        <Dashboard className="full-height-no-navbar" />
      </ProtectedRoute>
      <ProtectedRoute path="/gallery" redirect="/login">
        <GalleryRouter className="full-height-no-navbar" />
      </ProtectedRoute>
      {/* add eslint file */}
      <Route path="/about">
        <Public className="full-height-no-navbar" />
      </Route>
      <Route path="/">
        <Home className="full-height-no-navbar" />
      </Route>
    </Switch>
  )
}

export default Routes

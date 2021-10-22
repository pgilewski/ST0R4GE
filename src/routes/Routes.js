import React from 'react'
import Upload from '../components/Upload'
import Home from '../components/Home'
import Register from '../components/Register'
import Login from '../components/Login'

import { Switch, Route, Redirect } from 'react-router-dom'

import { useAuthContext } from '../context/authContext'
import Dashboard from '../components/Dashboard'
import Gallery from '../components/Gallery'
import Public from '../components/Public'
import Profile from '../components/Profile'

const ProtectedRoute = ({ children, ...rest }) => {
  const { currentUser } = useAuthContext()
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
        <Upload />
      </ProtectedRoute>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <ProtectedRoute redirect="/login" path="/profile">
        <Profile user={currentUser} />
      </ProtectedRoute>
      <ProtectedRoute redirect="/login" path="/dashboard">
        <Dashboard />
      </ProtectedRoute>
      <ProtectedRoute redirect="/login" path="/gallery">
        <Gallery />
      </ProtectedRoute>
      {/* add eslint file */}
      <Route path="/public">
        <Public />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  )
}

export default Routes

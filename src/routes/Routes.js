import React from 'react';
import UserInfo from '../components/UserInfo';
import Upload from '../components/Upload';
import Home from '../components/Home';
import Recognize from '../components/Recognize';
import Register from '../components/Register';
import Login from '../components/Login';

import {
    Switch,
    Route,
    Redirect
  } from "react-router-dom";

import { useAuthContext } from '../context/authContext'
import Dashboard from '../components/Dashboard';
import Gallery from '../components/Gallery';
import Public from '../components/Public';
import Profile from '../components/Profile';

const ProtectedRoute = ({ children, ...rest }) => {
    const { currentUser } = useAuthContext();
    
    return (
        <Route
          {...rest}
            render={({ location }) =>
              currentUser ? children :
                (
                  <Redirect
                    to={{
                      pathname: '/',
                      state: { from: location },
                    }}
                  />
                )
            }
        />
    );
}

const Routes = () => {

    const { currentUser } = useAuthContext();
    return (
        <Switch>
        <ProtectedRoute path="/upload">
          <Upload />
        </ProtectedRoute>
        <Route path="/recognize">
          <Recognize />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/profile">
          <UserInfo user={currentUser}/>
        </Route>
        <ProtectedRoute path="/dashboard">
          <Dashboard />
        </ProtectedRoute>
        <ProtectedRoute path="/gallery">
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

export default Routes;
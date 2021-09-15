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
          <UserInfo />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/gallery">
          <Gallery />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    )
}

export default Routes;
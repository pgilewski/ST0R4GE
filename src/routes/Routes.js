import Profile from '../components/Profile';
import Upload from '../components/Upload';
import Home from '../components/Home';
import Recipes from '../components/Recipes';
import Register from '../components/Register'

import {
    Switch,
    Route,
    Redirect
  } from "react-router-dom";

import { useAuthContext } from '../context/authContext'

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
        <ProtectedRoute path="/recipes">
          <Recipes />
        </ProtectedRoute>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    )
}

export default Routes;
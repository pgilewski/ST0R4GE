import Profile from '../components/Profile';
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
          <Profile />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    )
}

export default Routes;
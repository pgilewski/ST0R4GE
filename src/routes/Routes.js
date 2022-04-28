import React from 'react';
import Upload from '../components/Upload';
import Home from '../components/Home';
import Register from '../components/Register';
import Login from '../components/Login';

import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import { useAuthContext } from '../context/authContext';
import Dashboard from '../components/Dashboard';
import Public from '../components/Public';
import Profile from '../components/Profile';
import GalleryRouter from '../components/gallery/Router';

const ProtectedRoute = ({ children, ...rest }) => {
  const { currentUser } = useAuthContext();

  const { redirect } = rest;
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home className="bg-white dark:bg-gray-800 h-screen" />
        }
      />
      <Route exact path="/" element={<ProtectedRoute />}>
        <Route
          exact
          path="/profile"
          element={<Profile className="bg-white dark:bg-gray-800" />}
        />
        <Route
          exact
          path="/dashboard"
          element={
            <Dashboard className="bg-white dark:bg-gray-800 h-screen" />
          }
        />
        <Route
          exact
          path="/upload"
          element={<Upload className="bg-white dark:bg-gray-800" />}
        />
        <Route
          exact
          path="/gallery/*"
          element={
            <GalleryRouter className="bg-white dark:bg-gray-800 h-screen" />
          }
        />
      </Route>

      {/* Public routes */}

      <Route
        exact
        path="/login"
        element={
          <Login className="bg-white dark:bg-gray-800 h-screen" />
        }
      />
      <Route
        exact
        path="/register"
        element={
          <Register className="bg-white dark:bg-gray-800 h-screen" />
        }
      />
    </Routes>
  );
};

export default AppRoutes;

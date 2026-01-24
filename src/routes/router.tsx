import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from './ProtectedRoute';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Dashboard from '../pages/dashboard/Dashboard';
import ORSList from '../pages/ors/ORSList';
import UserManage from '../pages/user/UserManage';

export const route = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'ors',
        element: <ORSList />,
      },
      {
        path: 'users',
        element: <UserManage />,
      },
    ],
  },
  {
    path: '/auth',
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
  {
    path: '/unauthorized',
    element: (
      <div className="flex items-center justify-center h-screen">
        Access Denied
      </div>
    ),
  },
  {
    path: '*',
    element: (
      <div className="flex items-center justify-center h-screen">
        404 Not Found
      </div>
    ),
  },
]);

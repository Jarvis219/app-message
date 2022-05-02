import React from 'react';
const Dashboard = React.lazy(() => import('features/Page/Dashboard/Dashboard'));
const Login = React.lazy(() => import('features/Page/Login/Login'));

export interface LayoutConfig {
  path: string;
  element: React.ReactNode;
  exact?: boolean;
}

export const Layout: LayoutConfig[] = [
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/chat',
    element: <Dashboard />,
  },
  {
    path: '/login',
    element: <Login />,
  },
];

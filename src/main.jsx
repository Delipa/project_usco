import React from 'react'
import ReactDOM from 'react-dom/client'
import ErrorPage from './routes/ErrorPage'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Index from './pages/Index'
import Login from './pages/Authentication/Login'
import Register from './pages/Authentication/Register'
import './index.css'
import Root from './routes/Root'
import Users from './pages/Users'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'index',
        element: <Index />
      },
      {
        path: 'users',
        element: <Users />
      }
    ]
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'register',
    element: <Register />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

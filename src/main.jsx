import React from 'react'
import ReactDOM from 'react-dom/client'
import ErrorPage from './routes/ErrorPage'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Root from './routes/Root'
import CreateProject from './pages/createProject/CreateProject'
import Projects from './pages/projects/Projects'
import DetailProject from './pages/detailProject/DetailProject'

const router = createBrowserRouter([
  {
    path: '/project',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Projects />
      },
      {
        path: 'create',
        element: <CreateProject />
      },
      {
        path: 'detail/:id',
        element: <DetailProject />
      },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

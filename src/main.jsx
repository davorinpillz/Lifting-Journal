import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'
import Root from './Root.jsx'
import Session from './Session.jsx'
import Login from './Login.jsx'
import History from './History.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Session",
    element: <Session />,
  },
  {
    path: "/Main",
    element: <Root />,
  },
  {
    path: "/History",
    element: <History />,
  },

])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>
);
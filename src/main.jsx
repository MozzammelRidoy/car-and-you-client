import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import router from './Router/Router.jsx';
import AuthProviders from './Providers/AuthProviders.jsx';
import AdminAuthProvider from './AdminPanel/AdminPrivateRoute/AdminAuthProvider/AdminAuthProvider.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <AuthProviders> <AdminAuthProvider> <RouterProvider router={router}/></AdminAuthProvider></AuthProviders>
  </React.StrictMode>,
)

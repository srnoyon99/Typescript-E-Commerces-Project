import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify';

const AuthLayout: React.FC = () => {
  return (
    <div>
      <ToastContainer />
      <Outlet />
    </div>
  )
}

export default AuthLayout
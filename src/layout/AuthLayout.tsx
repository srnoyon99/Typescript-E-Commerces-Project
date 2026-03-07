import React from 'react'
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
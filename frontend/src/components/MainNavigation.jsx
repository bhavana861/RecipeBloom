import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const MainNavigation = () => {
  return (
    <div className="layout">

      <Navbar />

      <main className="page-content">
        <Outlet />
      </main>

      <Footer />

    </div>
  )
}



export default MainNavigation
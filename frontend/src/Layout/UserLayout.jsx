import React from 'react'
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom'
import CurrentNews from '../Components/CurrentNews'
import Footer from '../Components/Footer'

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
        <Navbar/>
        <CurrentNews/>
        <main>
            <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}

export default UserLayout
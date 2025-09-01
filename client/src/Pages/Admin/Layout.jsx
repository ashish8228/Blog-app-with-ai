import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet, useNavigate } from 'react-router-dom'
import { IoExitOutline } from "react-icons/io5";
import SideBar from '../../Component/admin/SideBar';
import { useAppContext } from '../../context/appContext';


const Layout = () => {

  const { axios, setToken, navigate } = useAppContext()
  const LogOutfn = () => {
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = null;
    setToken(null)
    navigate('/');
  }
  return (
    <div>
      <div className='flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200'>
        <img src={assets.logo} alt="" className='w-32 sm:w-auto cursor-pointer' onClick={() => Navigate("/")} />

        <button onClick={LogOutfn} className='flex items-center gap-2 text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer'>Logout <IoExitOutline size={18} /></button>
      </div>

      <div className='flex h-[calc(100vh-70px)] '>
        <SideBar />

        <Outlet />
      </div>
    </div>
  )
}

export default Layout
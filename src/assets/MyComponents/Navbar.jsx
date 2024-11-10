import React, { useContext } from 'react'
import UserContext from '../context/usercontext/Usercontext'
import { Link, useNavigate } from "react-router-dom";


export const Navbar = () => {
  const {user,logout}=useContext(UserContext);
  let navigate=useNavigate();
  
  
  return (
    <div className="navbar bg-base-100">
    <div className="flex-1">
      <a className="btn btn-ghost text-xl" onClick={()=>{
        navigate('/');
      }}>CabCompass</a>
    </div>
    <div className="flex-none">
      
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src={"https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png"} />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li>
            <a className="justify-between" onClick={()=>{navigate('/Profile')}}>
              Profile
              <span className="badge">New</span>
            </a>
          </li>
          <li ><a className='justify-between' onClick={()=>{
            logout();
            navigate('/');
          }}>Logout</a></li>
          <li ><a className='justify-between' onClick={()=>{navigate('/Reviews')}}>Reviews</a></li>
          <li ><a className='justify-between' onClick={()=>{navigate('/FAQ')}}>FAQ'S</a></li>


        </ul>
      </div>
    </div>
  </div>
  )
}

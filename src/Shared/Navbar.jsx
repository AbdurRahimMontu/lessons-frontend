import React from 'react';

import { Link, NavLink } from 'react-router';
import useAuth from '../Hooks/useAuth';
import MyLink from './../Components/MyLink';
import Container from '../Components/Container';

const Navbar = () => {
  const {user,logOut} = useAuth()
  const links = (
    <>
      <li><MyLink to="/">Home</MyLink></li>
      <li><MyLink to="/publicLessons">Public Lessons</MyLink></li>
      <li><MyLink to="/dashboard/add-lesson">Add Lesson</MyLink></li>
      <li><MyLink to="/dashboard/my-lessons">My Lessons</MyLink></li>

      {user && (
        <li><MyLink to="/pricing">Pricing</MyLink></li>
      )}
    </>
  );
  const handleLogOut=()=>{
    logOut()
    .then(result=>{
      console.log(result.user);
    })
    .catch(error=>{
      console.log(error);
    })
  }
    return (
        <div className='bg-base-100 shadow-sm'>
          <Container>
<div className="navbar ">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
   {links}
      </ul>
    </div>
   {/* <Logo></Logo> */}
   <h2 className='text-3xl'>LOGO</h2>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     {links}
    </ul>
  </div>
  <div className="navbar-end">
    {
      user?(
            <div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" className="cursor-pointer m-1"> <div className="avatar">
    <div className="w-12 h-12 rounded-full">
       <img   referrerPolicy="no-referrer"
                        src={
                          user.photoURL ||
                          "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        }
                        alt="User"/>
    </div>
  </div></div>
  <ul tabIndex="-1" className="dropdown-content mt-3 menu bg-base-100 rounded-box z-1 w-52  shadow-sm">
    <li><Link>My Profile</Link></li>
    <li><Link to="/dashboard">Dashboard</Link></li>
    <li><button onClick={handleLogOut}>LogOut</button></li>
   
  </ul>
</div>
      ):(
        
         <ul className="menu menu-horizontal px-1">
      <li><Link to="/signUp">SignUp</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
      )
    }
  </div>
</div>
          </Container>

        </div>
    );
};

export default Navbar;
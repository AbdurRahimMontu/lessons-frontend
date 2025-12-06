import React, { use } from 'react';
import Container from '../Components/Container';
import { Link, NavLink } from 'react-router';
import MyLink from '../Components/MyLink';
import AuthContext from '../Provider/AuthContext';

const Navbar = () => {
    const {name} = use(AuthContext)
    console.log(name);
    const links = <>
         <li><MyLink>Home</MyLink></li>
         <li><MyLink>Public Lessons</MyLink></li>
         <li><MyLink>Add Lesson</MyLink></li>
         <li><MyLink>My Lessons</MyLink></li>
         <li><MyLink>Pricing</MyLink></li>
      
    </>
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
    <Link to="/" className="text-xl cursor-pointer">Logo</Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     {links}
    </ul>
  </div>
  <div className="navbar-end space-x-5">
       <MyLink to="/signup">Signup</MyLink>
       <MyLink to="/login">Login</MyLink>

  <div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" className="m-1">
    <div className="avatar cursor-pointer">
    <div className="w-12 h-12 rounded-full">
      <img src="https://img.daisyui.com/images/profile/demo/batperson@192.webp" />
    </div>
  </div>

  </div>
  <ul tabIndex="-1" className="dropdown-content mt-3 menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
    <li><Link>My Profile</Link></li>
    <li><Link to="/dashboard">Dashboard</Link></li>
    <li><button className='btn'>LogOut</button></li>
   
  </ul>
</div>

  </div>

</div>
</Container>
        </div>
    );
};

export default Navbar;
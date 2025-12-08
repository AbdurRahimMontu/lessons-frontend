import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import { FaBook, FaHome, FaPlusSquare } from "react-icons/fa";
import { RiSidebarFoldFill } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import { FaVault } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
// import { Link } from 'react-router';
const Dashboard = () => {
   const [lessons, setLessons] = useState([]);
   const { user } = useAuth();  
const [favoriteCount, setFavoriteCount] = useState(0);

useEffect(() => {
  if (!user?.email) return;

  fetch(`http://localhost:3000/favorites/count/${user.email}`)
    .then(res => res.json())
    .then(data => setFavoriteCount(data.count))
    .catch(err => console.error(err));
}, [user]);

  useEffect(() => {
    fetch("http://localhost:3000/allLessons") 
      .then(res => res.json())
      .then(data => setLessons(data))
      .catch(err => console.error(err));
  }, []);
    return (
        <div>
            <div className="drawer lg:drawer-open">
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Navbar */}
    <nav className="navbar w-full bg-base-300">
      <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
        {/* Sidebar toggle icon */}
        <RiSidebarFoldFill size={24}/>
      </label>
       <div className=" text-xl">Navbar Title</div>
    </nav>
    {/* Page content here */}
    {/* <div className="p-4">Page Content</div> */}
   {/* Top Stats Row */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-lg font-semibold">Total Lessons Created</h2>
          <p className="text-3xl font-bold mt-2">{lessons.length}</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-lg font-semibold">Total Favorites Saved</h2>
          <p className="text-3xl font-bold mt-2">{favoriteCount}</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-lg font-semibold">Weekly Contributions</h2>
          <p className="text-3xl font-bold mt-2">5</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-lg font-semibold">Monthly Reflections</h2>
          <p className="text-3xl font-bold mt-2">18</p>
        </div>

      </div>

      {/* Recently Added Lessons */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Recently Added Lessons</h2>

        <div className="space-y-3">
          <div className="p-4 border rounded-lg">
            <p className="font-medium">🌱 Personal Growth: How I Learned to Stay Calm</p>
            <span className="text-sm text-gray-500">2 days ago</span>
          </div>

          <div className="p-4 border rounded-lg">
            <p className="font-medium">💡 Mindset Shift: Stop Comparing Yourself</p>
            <span className="text-sm text-gray-500">5 days ago</span>
          </div>

          <div className="p-4 border rounded-lg">
            <p className="font-medium">🔥 Career: Importance of Showing Progress</p>
            <span className="text-sm text-gray-500">1 week ago</span>
          </div>
        </div>
      </div>

      {/* Quick Shortcuts */}


      {/* Mini Analytics Placeholder */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          Analytics (Weekly or Monthly Contributions)
        </h2>

        <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">[Chart Placeholder]</span>
        </div>
      </div>
  </div>

  <div className="drawer-side is-drawer-close:overflow-visible">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
      {/* Sidebar content here */}
      <ul className="menu w-full grow">
        {/* List item */}
        <li>
          <Link to="/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
            {/* Home icon */}
              <FaHome size={24}/>
             <span className="is-drawer-close:hidden text-xl">Homepage</span>
          </Link>
        </li>
             <li className='pt-4'>
              <h2>Statics</h2>
             </li>
        {/* List item */}
       <li>
                 <Link to="/dashboard/addLesson" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Add Lesson">
                   {/* Settings icon */}
                <FaPlusSquare size={24}/>
                   <span className="is-drawer-close:hidden text-xl">Add Lesson</span>
                 </Link>
               </li>
   <li>
           <Link to="/dashboard/myLessons" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Lessons">
             {/* Settings icon */}
         <FaBook size={24}/>
             <span className="is-drawer-close:hidden text-xl">My Lessons</span>
           </Link>
         </li>
        <li>
          <Link to="myFavorites" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Favorites">
            {/* Settings icon */}
        <FaVault size={24}/>

            <span className="is-drawer-close:hidden text-xl">My Favorites</span>
          </Link>
        </li>
  
        <li>
          <Link  className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
            {/* Settings icon */}
           <IoSettingsSharp size={24}/>
           <span className="is-drawer-close:hidden text-xl">Settings</span>
          </Link>
        </li>
      </ul>
         <li>
                <Link to="/dashboard/profile" className=" cursor-pointer is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Profile">
               <div className='flex px-5 pb-5 gap-2'>
                  <span><CgProfile className='text-black' size={24} /></span>
                  <span className="is-drawer-close:hidden font-bold text-xl">My Profile</span>
              </div>
                </Link>
              </li>
    </div>
  </div>
</div>
        </div>
    );
};

export default Dashboard;
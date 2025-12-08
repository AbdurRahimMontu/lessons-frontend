// import { Link } from 'react-router';
// import { FaBook, FaHome, FaPlusSquare } from "react-icons/fa";
// import { RiSidebarFoldFill } from "react-icons/ri";
// import { IoSettingsSharp } from "react-icons/io5";
// import { FaVault } from "react-icons/fa6";
// import { CgProfile } from "react-icons/cg";
// import Statistics from '../../Components/Statistics/Statistics';
// import AddLesson from '../AddLesson';


// const Dashboard = () => {
//       return (
//         <div>
//             <div className="drawer lg:drawer-open">
//   <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
//   <div className="drawer-content">
//     {/* Navbar */}
//     <nav className="navbar w-full bg-base-300">
//       <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
//         {/* Sidebar toggle icon */}
//         <RiSidebarFoldFill size={24}/>
//       </label>
//        <div className=" text-xl">Navbar Title</div>
//     </nav>
//     {/* Page content here */}
//     {/* <div className="p-4">Page Content</div> */}
//    {/* Top Stats Row */}

     

// <Statistics></Statistics> 

    




//   </div>

//   <div className="drawer-side is-drawer-close:overflow-visible">
//     <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
//     <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
//       {/* Sidebar content here */}
//       <ul className="menu w-full grow">
//         {/* List item */}
//         <li>
//           <Link to="/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
//             {/* Home icon */}
//               <FaHome size={24}/>
//              <span className="is-drawer-close:hidden text-xl">Homepage</span>
//           </Link>
//         </li>
//              <li className='pt-4'>
//               <h2>Statics</h2>
//              </li>
//         {/* List item */}
//        <li>
//                  <Link to="/dashboard/add-lesson" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Add Lesson">
//                    {/* Settings icon */}
//                 <FaPlusSquare size={24}/>
//                    <span className="is-drawer-close:hidden text-xl">Add Lesson</span>
//                  </Link>
//                </li>
//    <li>
//            <Link to="/dashboard/my-lessons" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Lessons">
//              {/* Settings icon */}
//          <FaBook size={24}/>
//              <span className="is-drawer-close:hidden text-xl">My Lessons</span>
//            </Link>
//          </li>
//         <li>
//           <Link to="/dashboard/my-favorites" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Favorites">
//             {/* Settings icon */}
//         <FaVault size={24}/>

//             <span className="is-drawer-close:hidden text-xl">My Favorites</span>
//           </Link>
//         </li>
  
//         <li>
//           <Link to="" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
//             {/* Settings icon */}
//            <IoSettingsSharp size={24}/>
//            <span className="is-drawer-close:hidden text-xl">Settings</span>
//           </Link>
//         </li>
//       </ul>
      
//          <li>
//                 <Link to="/dashboard/profile" className=" cursor-pointer is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Profile">
//                <div className='flex px-5 pb-5 gap-2'>
//                   <span><CgProfile className='text-black' size={24} /></span>
//                   <span className="is-drawer-close:hidden font-bold text-xl">My Profile</span>
//               </div>
//                 </Link>
//               </li>
//     </div>
//   </div>
// </div>
//         </div>
//     );
// };

// export default Dashboard;





// 

import { Link, Outlet } from 'react-router';
import { FaBook, FaHome, FaPlusSquare } from "react-icons/fa";
import { RiSidebarFoldFill } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import { FaVault } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { ImStatsDots } from "react-icons/im";

const Dashboard = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* MAIN CONTENT */}
      <div className="drawer-content">
        
        {/* NAVBAR */}
        <nav className="navbar w-full bg-base-300">
          <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost">
            <RiSidebarFoldFill size={24}/>
          </label>
          <div className="text-xl">Dashboard</div>
        </nav>

        {/* PAGE CONTENT (changes when clicking sidebar links) */}
        <div className="p-4">
          <Outlet />
        </div>

      </div>

      {/* SIDEBAR */}
      <div className="drawer-side is-drawer-close:overflow-visible">

        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          <ul className="menu w-full grow">

            <li>
              <Link to="/" className='is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage'>
                <FaHome size={24}/>
                <span className="is-drawer-close:hidden text-xl">Home Page</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard" data-tip="Statistics">
              <ImStatsDots size={24}/>
                <span className="is-drawer-close:hidden text-xl">Statistics</span>
              </Link>
            </li>

            <li>
              <Link to="/dashboard/add-lesson" data-tip="Add Lesson">
                <FaPlusSquare size={24}/>
                <span className="is-drawer-close:hidden text-xl">Add Lesson</span>
              </Link>
            </li>

            <li>
              <Link to="/dashboard/my-lessons" data-tip="My Lessons">
                <FaBook size={24}/>
                <span className="is-drawer-close:hidden text-xl">My Lessons</span>
              </Link>
            </li>

            <li>
              <Link to="/dashboard/my-favorites" data-tip="My Favorites">
                <FaVault size={24}/>
                <span className="is-drawer-close:hidden text-xl">My Favorites</span>
              </Link>
            </li>

            <li>
              <Link to="" data-tip="Settings">
                <IoSettingsSharp size={24}/>
                <span className="is-drawer-close:hidden text-xl">Settings</span>
              </Link>
            </li>

          </ul>

          <li>
            <Link to="/dashboard/profile" data-tip="Profile">
              <div className="flex px-5 pb-5 gap-2">
                <CgProfile size={24}/>
                <span className="is-drawer-close:hidden text-xl">Profile</span>
              </div>
            </Link>
          </li>

        </div>
      </div>

    </div>
  );
};

export default Dashboard;

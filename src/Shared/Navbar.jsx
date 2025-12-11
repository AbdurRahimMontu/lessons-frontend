
import Container from '../Components/Container';
import { Link} from 'react-router';
import MyLink from '../Components/MyLink';
import useAuth from '../Hooks/useAuth';
import { IoBook } from "react-icons/io5";

const Navbar = () => {
   
const {user, logOut} =useAuth();
console.log(user);
const handleLogOut=()=>{

  logOut()
    .then(() => {
      console.log("User logged out!");
    })
    .catch(error=>{
        console.log(error);
    })
}


    const links = <>
         <li><MyLink to="/">Home</MyLink></li>
         <li><MyLink to="/publicLessons">Public Lessons</MyLink></li>
         <li><MyLink to="/dashboard/add-lesson" >Add Lesson</MyLink></li>
         <li><MyLink to="/dashboard/my-lessons">My Lessons</MyLink></li>
        </>
      
{user &&  (
  <li><MyLink to="/pricing">Pricing</MyLink></li>
)}
      
{user && user.isPremium && (
  <li>
    <span className="px-3 py-1 bg-yellow-300 text-black rounded-full text-sm ml-2">
      ⭐ Premium
    </span>
  </li>
)}
   
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
    <Link to="/" className="text-xl cursor-pointer"><IoBook size={36}/></Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     {links}
    </ul>
  </div>
  <div className="navbar-end space-x-5">

{
    user?(
  <div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" className="m-1">
    <div className="avatar cursor-pointer">
    <div className="w-12 h-12 rounded-full border">
      <img src={user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt="Photo" />

    
    </div>
  </div>

  </div>
  <ul tabIndex="-1" className="dropdown-content mt-2 menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
    <h2 className='text-center text-xl font-bold py-2'>{user?.displayName}</h2>
    <li><Link to="/dashboard/profile">My Profile</Link></li>
    <li><Link to="/dashboard">Dashboard</Link></li>
    <li><button onClick={handleLogOut} className='btn'>LogOut</button></li>
   
  </ul>
</div>
    ):(
         <div className='flex space-x-5'>
        <MyLink to="/signup">Signup</MyLink>
        <MyLink to="/login">Login</MyLink>
         </div>
    )
}

      

{/* Logout */}


  </div>

</div>
</Container>
        </div>
    );
};

export default Navbar;
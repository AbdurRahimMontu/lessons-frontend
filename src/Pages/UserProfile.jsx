

// import { updateProfile} from "firebase/auth";


// import { useState } from "react";
// import { toast } from 'react-toastify';
// // import useRole from "../../Hooks/useRole";
// import { FaCrown } from "react-icons/fa";
// import useAuth from "../Hooks/useAuth";


// const AdminProfile =() => {
//   const {user, setUser} = useAuth();
//   const [name, setName] = useState(user?.displayName || "");
//   const [photo, setPhoto] = useState(user?.photoURL || "");
//   //  const [role] = useRole()
// const handleUpdate = (e) => {
//     e.preventDefault();
//     updateProfile(user, {displayName: name, photoURL: photo});
//     setUser({...user, displayName: name, photoURL: photo });
//     toast.success('Profile updated successfully!', {position:"bottom-right"});};

//   return (
//     <div>
//       <ul className="p-5 border bg-base-100 mt-5 rounded-box z-1 w-1/2 mx-auto shadow-sm">
//         <span className="flex flex-col items-center p-5">
//           <img className="w-20 h-20  border rounded-full object-cover"
//             src={photo?.includes("http") ? photo
//             :"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
//             alt="Profile"/>
           
//     {/* <div className="pt-4">
//                  {role === "admin" && (
//   <span className="flex items-center gap-1 ml-2 px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full shadow">
//     <FaCrown size={12} />
//     Admin
//   </span>
// )
// }
//     </div> */}
//           <h2 className="font-semibold text-lg mt-2">{name || user?.displayName}</h2>
//           <h3 className="text-gray-600">{user?.email}</h3>
//         </span>
//         <hr className="my-3" />
//         <form onSubmit={handleUpdate} className="space-y-3">
//           <label>Your Name</label>
//           <input type="text" className="w-full p-2 border rounded mb-3" value={name}
//                  onChange={(e) => setName(e.target.value )} placeholder="Enter new name"/>
//           <label>Your Photo URL</label>
//           <input type="photo"  className="w-full p-2 border rounded mb-3" value={photo}
//                  onChange={(e) => setPhoto(e.target.value)} placeholder="Enter photo URL"/>
//           <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 w-full">
//                   Update Profile
//           </button>
//           </form>
//       </ul>
//    </div>
//   );
// };
// export default AdminProfile;



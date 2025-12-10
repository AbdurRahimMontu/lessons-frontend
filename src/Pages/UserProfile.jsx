import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import useAuth from "../Hooks/useAuth";
import { updateProfile } from "firebase/auth";
import useRole from "../Hooks/useRole";

const UserProfile = () => {
  const { user, setUser } = useAuth();
  const [ role ] = useRole();

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    if (user?.displayName) setName(user?.displayName);
    if (user?.photoURL) setPhoto(user.photoURL);
  }, [user]);

  const handleUpdate = (e) => {
    e.preventDefault();

    updateProfile(user, { displayName: name, photoURL: photo })
      .then(() => {
        setUser({ ...user, displayName: name, photoURL: photo });
        toast.success("Profile updated successfully!", { position: "bottom-right" });
      });
  };

  return (
    <div>
      <ul className="p-5 border bg-base-100 mt-5 rounded-box z-1 w-1/2 mx-auto shadow-sm">
        <span className="flex flex-col items-center p-5">
          <img
            className="w-20 h-20 border rounded-full object-cover"
            src={photo?.includes("http") ? photo : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
            alt="Profile"
          />

          {/* ✅ ROLE BADGE */}
          <div className="pt-4">
            {role ? (
              <span className="px-4 py-1 text-sm font-bold text-white bg-blue-600 rounded-full">
                {role.toUpperCase()}
              </span>
            ) : (
              <span className="text-sm text-gray-400">Loading role...</span>
            )}
          </div>

          {/* ✅ USER NAME */}
          <h2 className="font-semibold text-lg mt-2">
            {user?.displayName || name || "No Name"}
          </h2>

          {/* ✅ USER EMAIL */}
          <h3 className="text-gray-600">{user?.email}</h3>
        </span>

        <hr className="my-3" />

        <form onSubmit={handleUpdate} className="space-y-3">
          <label>Your Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter new name"
          />

          <label>Your Photo URL</label>
          <input
            type="text"
            className="w-full p-2 border rounded mb-3"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            placeholder="Enter photo URL"
          />

          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 w-full">
            Update Profile
          </button>
        </form>
      </ul>
    </div>
  );
};

export default UserProfile;

import { updateProfile } from "firebase/auth";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FaCrown } from "react-icons/fa";


const AdminProfile = () => {
  const { user, setUser } = useAuth();
  const [role] = useRole();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      photo: user?.photoURL || "",
    },
  });

  const onSubmit = async (data) => {
    const { name, photo } = data;
    console.log(data);

    await updateProfile(user, {
      displayName: name,
      photoURL: photo,
    });

    // Update global auth state
    setUser({ ...user, displayName: name, photoURL: photo });

    toast.success("Profile updated successfully!", {
      position: "bottom-right",
    });

    reset(data); // update form UI
  };
  

  return (
    <div>
      <ul className="p-5 border bg-base-100 mt-5 rounded-box z-1 w-1/2 mx-auto shadow-sm">
        <span className="flex flex-col items-center p-5">
          <img
            className="w-20 h-20 border rounded-full object-cover"
            src={
              user?.photoURL?.includes("http")
                ? user.photoURL
                : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            }
            alt="Profile"
          />

          {/* ROLE BADGE */}
          <div className="pt-4">
            {role === "admin" ? (
              <span className="flex items-center gap-1 ml-2 px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full shadow">
                <FaCrown size={12} /> Admin
              </span>
            ) : (
              <span className="flex items-center gap-1 ml-2 px-3 py-1 text-xs font-semibold outline rounded-full shadow">
                Customer
              </span>
            )}
          </div>

          {/* USER NAME */}
          <h2 className="font-semibold text-lg mt-2">
          {user?.displayName || user?.email?.split("@")[0]}
          </h2>

          {/* USER EMAIL */}
          <h3 className="text-gray-600">{user?.email}</h3>
        </span>
         <p>Number of lessons created</p>
        <hr className="my-3" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <label>Your Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded mb-3"
            {...register("name")}
            placeholder="Enter new name"
          />

          <label>Your Photo URL</label>
          <input
            type="text"
            className="w-full p-2 border rounded mb-3"
            {...register("photo")}
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

export default AdminProfile;


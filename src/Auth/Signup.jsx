import React from 'react';
import { useForm } from "react-hook-form"

import { Link, useLocation, useNavigate } from 'react-router';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import useAuth from '../Hooks/useAuth';

const Signup = () => {
  // const { user, loading, logOut } = useAuth();

const {register,handleSubmit,formState: { errors }} = useForm()
const { createNewUser, googleSignIn, updateUserProfile} =useAuth()
const location = useLocation()
const navigate = useNavigate()

// handle register
const handleRegister=(data)=>{
  const profileImg = data.photo[0];
  createNewUser(data.email, data.password)
   .then(result=>{ 
    console.log(result.user);
     navigate(location.state || "/")
     
     const formData = new FormData();
     formData.append("image", profileImg)
     const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`
     
      axios.post(image_API_URL, formData)
      .then(res=>{
        console.log("after image upload", res.data.data.url);
        const userProfile = {
          displayName: data.name,
          photoURL : res.data.data.url
        }
        updateUserProfile(userProfile)
        .then(result=>{
        console.log("Update Profile is done",result.user);
        
      })
      .catch(error=>{
        console.log(error);
      })
      })
   })
   .catch(error=>{
    console.log(error);
   })

}

const handleGoogleSignIn=()=>{
    googleSignIn()
     .then(result=>{
        console.log(result.user);
        navigate(location.state || "/")
      })
      .catch(error=>{
        console.log(error);
      })
 }
  return (
     <div className="flex justify-center py-2">
                 <div className="card bg-base-100  w-full max-w-sm shrink-0 shadow-2xl">
           <form  className="card-body" onSubmit={handleSubmit(handleRegister)}>
             <h2 className="text-2xl text-center">Well Come SignUp</h2>
             <fieldset className="fieldset ">
                 {/* name field */}
               <label className="label">Name</label>
               <input type="text" {...register ("name",{required:true})} className="input" placeholder="Name" />
               {errors.name?.type==='required' && <span className='text-red-600'>Name field is required</span>}
                 {/* photo field */}
               <label className="label">Photo</label>
               <input type="file" {...register ("photo")} className="file-input" placeholder="Photo" />
               {errors.photo?.type==='required' && <span className='text-red-600'>photo field is required</span>}
                 {/* email field */}
               <label className="label">Email</label>
               <input type="email" {...register ("email",{required:true})} className="input" placeholder="Email" />
               {errors.email?.type==='required' && <span className='text-red-600'>Email field is required</span>}
               {/* password field */}
               <label className="label">Password</label>
               <input type="password" {...register("password",{minLength: 6, pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/ })} className="input" placeholder="Password" />
                {errors.password?.type==='required' && <span className='text-red-600'>Password field is required</span>}
                  {errors.password?.type==='minLength' && <span className='text-red-600'>Password must be 6 character</span>}
                  {errors.password?.type==='pattern' && <span className='text-red-600'>At least one uppercase letter,At least one lowercase letter,At least one number,At least one special character</span>}
               <div><a className="link link-hover">Forgot password?</a></div>
               <button className="btn btn-neutral mt-4">SignUp</button>
    <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
            <FcGoogle />
            Login with Google
          </button>
             </fieldset>
             <p>
              Already have an Account
          <Link state={location.state} to="/login" className="text-blue-600 font-bold border-b-2"> Login</Link>
             </p>
           </form>
         </div>
     </div>
  );
};

export default Signup;

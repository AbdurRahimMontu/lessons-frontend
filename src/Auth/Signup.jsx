import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from './../Hooks/useAuth';
import MyAnimation from './../Components/MyAnimation';
import { saveOrUpdateUser } from "../Utils";

const Signup = () => {
  const {createNewUser,setUser, googleSignIn} = useAuth();

  const navigate = useNavigate()
  const location = useLocation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

 const handleSignup = async (data) => {
  try {
    const { name, email, password } = data;

    // Create Firebase user
    const result = await createNewUser(email, password);
    const user = result.user;

    // Save user to DB
    await saveOrUpdateUser({
      name,
      email,
    });

    // Update auth state
    setUser(user);

    // Redirect
    navigate(location.state || "/");
  } catch (error) {
    console.error("Signup Error:", error);
    // You can show toast or error message here
  }
};

  const handleGoogleSignIn = async () => {
  try {
    const result = await googleSignIn();
    const user = result.user;

    // Save user to database
    await saveOrUpdateUser({
      name: user.displayName,
      email: user.email,
    });

    // Set user state
    setUser(user);

    // Redirect user
    navigate(location.state || "/");
  } catch (error) {
    console.error("Google Sign-In Error:", error);
  }
};


  return (
<div className="grid  items-center max-w-3xl mx-auto md:grid-cols-2 grid-cols-1">

      <div className="flex justify-center items-center ">
      <div className="card my-1 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleSubmit(handleSignup)} className="card-body ">
          <h1 className="text-3xl text-center font-bold">Signup</h1>
          <fieldset className="fieldset">
            {/* Name */}
            <label className="label">Name</label>
            <input
              type="text"
              {...register("name", {  required: "Name is required" })}
              className="input"
              placeholder="Your Name"
            />
           {errors.name && (
  <span className="text-red-600">{errors.name.message}</span>
)}
            {/* Photo */}
            <label className="label">Photo</label>
            <input
              type="file"
              {...register("photo")}
              className="file-input"
              placeholder="Email"
            />
            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input"
              placeholder="Email"
            />
            {errors.email && (
              <span className="text-red-600">Email Address is required</span>
            )}

            {/* Password */}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: { value: 6 },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/,
                  message:
                    "Must include uppercase, lowercase, number & special character",
                },
              })}
              className="input"
              placeholder="Password"
            />
            {errors.password && (
              <span className="text-red-600">Password must be 6 character</span>
            )}
            {errors.password && (
              <span className="text-red-600">
                Must include one uppercase, one lowercase, one number & one
                special character
              </span>
            )}

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button
        
              className="btn btn-neutral mt-4"
            >
              Signup
            </button>
            <button onClick={handleGoogleSignIn} type="button"
        
              className="btn btn-neutral mt-4"
            >
              Login with Google
            </button>
          </fieldset>
          <h2>
            Already have no Account{" "}
            <Link className="text-blue-700 font-bold border-b-2" to="/login">
              Login
            </Link>{" "}
          </h2>
        </form>
      </div>
    </div>
      <div className="flex justify-center items-center">
    <MyAnimation></MyAnimation>
  </div>
</div>
  );
};

export default Signup;

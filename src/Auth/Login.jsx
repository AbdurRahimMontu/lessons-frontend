import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import MyAnimation from "../Components/MyAnimation";

const Login = () => {
  const {register,handleSubmit,formState: { errors }} = useForm();
    const navigate = useNavigate()
  const location = useLocation()
  const { signInUser,setUser, googleSignIn } = useAuth();
  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
   const handleGoogleSignIn = (data) => {
   
    googleSignIn()
    const currentUser = data.user
    setUser(currentUser)
    navigate(location.state || "/")
  };

  return (
    <div className="grid  items-center max-w-3xl mx-auto md:grid-cols-2 grid-cols-1">

    <div className="flex justify-center items-center min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleSubmit(handleLogin)} className="card-body">
          <h1 className="text-3xl text-center font-bold">Login now!</h1>
          <fieldset className="fieldset">
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
            <button className="btn btn-neutral mt-4">Login</button>
            <button onClick={handleGoogleSignIn} className="btn btn-neutral mt-4">Google with Login</button>
          </fieldset>
          <h2>
            You have no Account{" "}
            <Link className="text-blue-700 font-bold border-b-2" to="/signUp">
              Signup
            </Link>{" "}
          </h2>
        </form>
      </div>
    </div>
      <div className="flex justify-center items-center min-h-screen">
    <MyAnimation></MyAnimation>
  </div>
    </div>
  );
};

export default Login;

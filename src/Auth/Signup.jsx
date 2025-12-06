import React from 'react';
import { Link } from 'react-router';

const Signup = () => {
    return (
         <div className='flex justify-center items-center min-h-screen'>
   

    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
         <h1 className="text-3xl text-center font-bold">Signup</h1>
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input type="email" className="input" placeholder="Your Name" />
          <label className="label">Photo</label>
         <input type="file" className="file-input" placeholder="Email" />
          <label className="label">Email</label>
          <input type="email" className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Password" />
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Signup</button>
        </fieldset>
        <h2>Already have no Account <Link className='text-blue-700 font-bold border-b-2' to="/login">Login</Link> </h2>

  </div>
</div>
        </div>
    );
};

export default Signup;
import React from 'react';
import useAuth from '../Hooks/useAuth';
import Navbar from '../Shared/Navbar';

const Profile = () => {
    const {user} = useAuth()
    return (
        <div>
            <Navbar></Navbar>
               <div className="min-h-screen flex justify-center items-center bg-base-200 p-4">
      <div className="card bg-base-100 border rounded-xl shadow-xl max-w-xl w-full">
        
        {/* Avatar */}
        <figure className="px-10 pt-10">
          <div className="avatar">
            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={""} />
            </div>
          </div>
        </figure>

        {/* Body */}
        <div className="card-body items-center text-center space-y-3">
          <h2 className="card-title text-xl font-bold">{user.displayName}</h2>
          <h2 className="card-title text-xl font-bold">{user.email}</h2>
          
          <p className="text-sm opacity-80">
            A frontend developer passionate about UI/UX, React & animations.
          </p>

          <div className="card-actions pt-4">
            <button className="btn btn-primary">Follow</button>
            <button className="btn btn-outline">Message</button>
          </div>
        </div>

      </div>
    </div>
        </div>
    );
};

export default Profile;
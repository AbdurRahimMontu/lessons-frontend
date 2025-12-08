import React from 'react';
import useAuth from '../Hooks/useAuth';
import Navbar from '../Shared/Navbar';
import useRole from '../Hooks/useRole';
import { Link } from 'react-router';

const Profile = () => {
    const {user} = useAuth()
    const [role, isRoleLoading] = useRole()

    if(isRoleLoading) return <p>Loading...</p>
    return (
        <div>
         
               <div className="flex justify-center items-center bg-base-200 p-4">
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
          <h2 className='text-2xl font-bold'>"{role}"</h2>
          <h2 className="card-title text-xl font-bold">{user.displayName}</h2>
          <h2 className="card-title text-xl font-bold">{user.email}</h2>
          
          <p className="text-sm opacity-80">
            A frontend developer passionate about UI/UX, React & animations.
          </p>

          <div className="card-actions pt-4">
            <Link to="/dashboard" className="btn btn-primary">Dashboard</Link>
            <button className="btn btn-outline">Message</button>
          </div>
        </div>

      </div>
    </div>
        </div>
    );
};

export default Profile;
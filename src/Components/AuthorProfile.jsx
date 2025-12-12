// import React from 'react';

// const AuthorProfile = () => {
//     return (
//         <div>
// <h2 className='text-3xl py-10 text-center'>Author All Lessons </h2>
            
//         </div>
//     );
// };

// export default AuthorProfile;




import { Link } from "react-router";

const AuthorCard = ({ creator, authorInfo }) => {
  // Safe total lesson count
  const totalLessons = Array.isArray(authorInfo)
    ? authorInfo.length
    : authorInfo?.totalLessons || 0;

  return (
    <div className="mt-10 p-6 rounded-xl shadow-lg border bg-base-100">
      <h2 className="text-xl font-bold mb-4">About the Creator</h2>

      <div className="flex items-center gap-5">

        {/* Creator Profile Image */}
        <img
          src={creator?.photo || "/default-user.png"}
          alt={creator?.name}
          className="w-20 h-20 rounded-full border object-cover"
        />

        <div>
          {/* Creator Name */}
          <h3 className="text-lg font-semibold">{creator?.name}</h3>

          {/* Creator Email */}
          <p className="text-gray-500 text-sm">{creator?.email}</p>

          {/* Total Lessons Created */}
          <p className="mt-1 text-sm text-gray-600">
            <span className="font-bold">{totalLessons}</span> lessons created
          </p>

          {/* View all lessons button → now goes to profile page */}
          <Link
            to={`/profile/${creator?.email}`}
            className="btn btn-sm btn-outline mt-3"
          >
            View all lessons by this author
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;



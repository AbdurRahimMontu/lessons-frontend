import React from 'react';

const LessonCard = ({ item }) => (


<div className="card bg-base-100 shadow-md p-4 hover:shadow-lg transition">
    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
    <p className="text-gray-600 text-sm mb-2">{item.shortDescription?.slice(0, 80)}...</p>

    <p className="text-xs text-gray-500">
      {item.category} • {item.emotionalTone}
    </p>

    <a href={`/lesson/${item._id}`} className="btn btn-sm btn-outline mt-3 w-full">
      View Details
    </a>
  </div>
);

export default LessonCard;

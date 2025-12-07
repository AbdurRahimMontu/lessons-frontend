import React from 'react';
import { useEffect, useState } from "react";
import { Link } from 'react-router';
const PublicLessons = () => {
    const [lessons, setLessons] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/allLessons")
      .then((res) => res.json())
      .then((data) => {
      setLessons(data)
    
      })
      .catch((err) => console.error(err));
  }, []);

    return (
<div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
  {lessons.map((lesson, index) => (
             <div key={index} className="card bg-base-100 w-96 shadow-sm">
      <div className="card-body">
        <h2 className="card-title">{lesson.title}</h2>
        <p className='text-justify'>{lesson.shortDescription}</p>

        <div className="space-y-1 text-sm text-gray-600">
          <p><span className="font-semibold">Category:</span> {lesson.category}</p>
          <p><span className="font-semibold">Tone:</span> {lesson.emotionalTone}</p>
          <p><span className="font-semibold">Creator:</span> {lesson.creator.name}</p>
          <p><span className="font-semibold">Access:</span> {lesson.accessLevel}</p>
          <p><span className="font-semibold">Created:</span> {lesson.createdAt}</p>
        </div>

        <div className="card-actions justify-end mt-3">
        <Link to={`/lessonsDetails/${lesson._id}`} className="btn btn-primary w-full">
  Details
</Link>
        </div>
      </div>
    </div>
  ))}
</div>
    );
};

export default PublicLessons;


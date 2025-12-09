import React from 'react';

const MetaDataAdd = ({ lesson }) => {
 
 const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-sm mb-6 w-full md:w-1/3">
      <h3 className="text-lg font-semibold mb-2">Lesson Info</h3>
      <ul className="text-gray-700 text-sm space-y-1">
        <li>
          <strong>Created:</strong> {formatDate(lesson.createdAt)}
        </li>
        <li>
          <strong>Last Updated:</strong> {formatDate(lesson.updatedAt)}
        </li>
        <li>
          <strong>Visibility:</strong>{" "}
          <span
            className={`px-2 py-1 rounded text-white ${
              lesson.visibility === "Public" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {lesson.visibility || "Public"}
          </span>
        </li>
        {lesson.readingTime && (
          <li>
            <strong>Estimated Reading Time:</strong> {lesson.readingTime}
          </li>
        )}
      </ul>
    </div>
  
      
    );
};

export default MetaDataAdd;
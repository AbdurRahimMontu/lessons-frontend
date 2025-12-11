import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";

const MyLessons = () => {
  const [lessons, setLessons] = useState([]);
const {user} = useAuth()
  // Fetch lessons by email
  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/myLessons?email=${user.email}`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched lessons:", data);
        setLessons(data);
      })
      .catch(err => console.error("Fetch error:", err));
  }, [user?.email]);

  // Update visibility
  const handleVisibilityChange = async (id, value) => {
    await fetch(`http://localhost:3000/lessons/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ privacy: value }),
    });

    setLessons(prev =>
      prev.map(item => (item._id === id ? { ...item, privacy: value } : item))
    );
  };

  // Update access level
  const handleAccessChange = async (id, value) => {
    await fetch(`http://localhost:3000/lessons/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accessLevel: value }),
    });

    setLessons(prev =>
      prev.map(item => (item._id === id ? { ...item, accessLevel: value } : item))
    );
  };

  // Delete lesson
  const handleDelete = async (id) => {
  const confirmDelete = await Swal.fire({
    title: "Are you sure?",
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  });

  if (!confirmDelete.isConfirmed) return;

  // Delete from database
  await fetch(`http://localhost:3000/lessons/${id}`, {
    method: "DELETE",
  });

  // Remove from UI
  setLessons((prev) => prev.filter((item) => item._id !== id));

  // Success alert
  Swal.fire({
    title: "Deleted!",
    text: "Your lesson has been removed.",
    icon: "success",
    timer: 1500,
    showConfirmButton: false,
  });
};

  return (
    <div>
      <div className="overflow-x-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">
          My Lessons ({lessons.length})
        </h2>

        <table className="table w-full">
          <thead>
            <tr className="bg-base-200">

              <th>SL.NO</th>
              <th>Image</th>
              <th>Lesson Title</th>
              <th>Category</th>
              <th>Tone</th>
              <th>Email</th>
              <th>Visibility</th>
              <th>Access</th>
              <th>Stats</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {lessons.map((lesson,index)=> (
              <tr key={lesson._id}>
                
                {/* LESSON INFO */}

           <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <img  className="w-8 h-8 rounded-full"
                        src={lesson.image || "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"}
                        alt="lesson"
                      />
                    </div>
           
                  </div>
                </td>
                 <td>
                           <div>
                      <div className="font-bold">{lesson.title}</div>
                      <div className="text-sm opacity-70">
                        {lesson.shortDescription?.slice(0, 60)}
                      </div>
                    </div>
                 </td>
                <td>{lesson.category}</td>
                <td>{lesson.emotionalTone}</td>

                {/* EMAIL SHOW HERE */}
                <td className="font-semibold text-blue-600">{lesson.email}</td>

                {/* VISIBILITY */}
                <td>
                  <input
                    type="checkbox"
                    className="toggle toggle-info"
                    checked={lesson.privacy === "public"}
                    onChange={(e) =>
                      handleVisibilityChange(
                        lesson._id,
                        e.target.checked ? "public" : "private"
                      )
                    }
                  />
                  <span className="ml-2 text-sm">
                    {lesson.privacy === "public" ? "Public" : "Private"}
                  </span>
                </td>

                {/* ACCESS */}
                <td>
                  <select
                    className="select select-bordered select-sm"
                    value={lesson.accessLevel}
                    onChange={(e) =>
                      handleAccessChange(lesson._id, e.target.value)
                    }
                  >
                    <option value="free">Free</option>
                    <option value="premium">Premium</option>
                  </select>
                </td>

                {/* STATS */}
                <td>
                  <div className="text-sm">
                    <p>❤️ {lesson.reactionsCount || 0}</p>
                    <p>⭐ {lesson.favoritesCount || 0}</p>
                    <p className="opacity-60 text-xs">
                      {new Date(lesson.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </td>

                {/* ACTIONS */}
                <td>
                  <div className="flex items-center gap-3">
                    <Link
                      to={`/lesson/${lesson._id}`}
                      className="btn btn-info btn-xs"
                    >
                      <FaEye />
                    </Link>

                    <Link
                      to={`/dashboard/my-lessons/update/${lesson._id}`}
                      className="btn btn-warning btn-xs"
                    >
                      <FaEdit />
                    </Link>

                    <button
                      onClick={() => handleDelete(lesson._id)}
                      className="btn btn-error btn-xs"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default MyLessons;



import { useState, useEffect } from "react";
import { Link } from "react-router";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import Navbar from "../Shared/Navbar";

const MyLessonsTable = () => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    fetch("/api/lessons/me")
      .then(res => res.json())
      .then(data => setLessons(data));
  }, []);

  const handleVisibilityChange = async (id, value) => {
    await fetch(`/api/lessons/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visibility: value }),
    });
  };

  const handleAccessChange = async (id, value) => {
    await fetch(`/api/lessons/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ access: value }),
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure? This cannot be undone.");
    if (!confirmDelete) return;

    await fetch(`/api/lessons/${id}`, { method: "DELETE" });

    setLessons(lessons.filter(item => item._id !== id));
  };

  return (
 <div>
    <Navbar></Navbar>
       <div className="overflow-x-auto p-4">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr className="bg-base-200">
            <th>Lesson</th>
            <th>Category</th>
            <th>Tone</th>
            <th>Visibility</th>
            <th>Access</th>
            <th>Stats</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {lessons.map(lesson => (
            <tr key={lesson._id}>
              {/* Lesson Info */}
              <td>
                <div className="flex items-center gap-3">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={lesson.image} alt="lesson" />
                  </div>
                  <div>
                    <div className="font-bold">{lesson.title}</div>
                    <div className="text-sm opacity-70">
                      {lesson.shortDescription?.slice(0, 60)}...
                    </div>
                  </div>
                </div>
              </td>

              {/* Category */}
              <td>{lesson.category}</td>

              {/* Emotional Tone */}
              <td>{lesson.emotionalTone}</td>

              {/* Visibility Toggle */}
              <td>
                <input
                  type="checkbox"
                  className="toggle toggle-info"
                  checked={lesson.visibility === "public"}
                  onChange={(e) =>
                    handleVisibilityChange(
                      lesson._id,
                      e.target.checked ? "public" : "private"
                    )
                  }
                />
                <span className="ml-2 text-sm">
                  {lesson.visibility === "public" ? "Public" : "Private"}
                </span>
              </td>

              {/* Access Level */}
              <td>
                <select
                  className="select select-bordered select-sm"
                  value={lesson.access}
                  onChange={(e) =>
                    handleAccessChange(lesson._id, e.target.value)
                  }
                >
                  <option value="free">Free</option>
                  <option value="premium">Premium</option>
                </select>
              </td>

              {/* Stats */}
              <td>
                <div className="text-sm">
                  <p>❤️ {lesson.reactionsCount}</p>
                  <p>⭐ {lesson.favoritesCount}</p>
                  <p className="opacity-60 text-xs">
                    {new Date(lesson.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </td>

              {/* Actions */}
              <td>
                <div className="flex items-center gap-3">
                  <Link to={`/lesson/${lesson._id}`} className="btn btn-info btn-xs">
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

export default MyLessonsTable;

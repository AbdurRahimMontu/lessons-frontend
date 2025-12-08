import { useEffect, useState } from "react";
import axios from "axios";

const MyFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [category, setCategory] = useState("");
  const [tone, setTone] = useState("");

  const userEmail = "test@gmail.com";

  // ✅ Load favorites from database
  useEffect(() => {
    axios
      .get(`http://localhost:3000/favorites/user?email=${userEmail}`)
      .then((res) => setFavorites(res.data))
      .catch((err) => console.log(err));
  }, []);

  // 🔍 Filter data
  const filtered = favorites.filter((f) => {
    if (category && f.category !== category) return false;
    if (tone && f.emotionalTone !== tone) return false;
    return true;
  });

  // ❌ Remove favorite
  const handleRemove = async (id) => {
    await axios.delete(
      `http://localhost:3000/favorites/${id}?email=${userEmail}`
    );
    setFavorites((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">My Favorites</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select
          className="select select-bordered"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Personal Growth">Personal Growth</option>
          <option value="Career">Career</option>
          <option value="Relationships">Relationships</option>
          <option value="Mindset">Mindset</option>
          <option value="Mistakes Learned">Mistakes Learned</option>
        </select>

        <select
          className="select select-bordered"
          onChange={(e) => setTone(e.target.value)}
        >
          <option value="">All Emotional Tones</option>
          <option value="Motivational">Motivational</option>
          <option value="Sad">Sad</option>
          <option value="Realization">Realization</option>
          <option value="Gratitude">Gratitude</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Tone</th>
              <th>Created</th>
              <th>Reactions</th>
              <th>Favorites</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6">
                  No favorites found.
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>{item.category}</td>
                  <td>{item.emotionalTone}</td>
                  <td>{item.createdAt?.slice(0, 10)}</td>
                  <td>{item.reactionsCount}</td>
                  <td>{item.favoritesCount}</td>

                  <td className="flex gap-2">
                    <a
                      href={`/lesson/${item.lessonId}`}
                      className="btn btn-sm btn-primary"
                    >
                      View
                    </a>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="btn btn-sm btn-error"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyFavorites;



import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router";
import LoadingPage from "../Components/LoadingPage";

const PublicLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [totalLessons, setTotalLessons] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [sort, setSort] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [tone, setTone] = useState("");
  const [loading, setLoading] = useState(true);

  const limit = 8;

  useEffect(() => {
    setLoading(true);

    fetch(
      `http://localhost:5000/publicLessons?limit=${limit}&skip=${
        currentPage * limit
      }&sort=${sort}&order=${order}&search=${search}&category=${category}&tone=${tone}`
    )
      .then((res) => res.json())
      .then((data) => {
        setLessons(data?.lessons || []);
        setTotalLessons(data?.totalLessons || 0);
        setTotalPages(Math.ceil((data?.totalLessons || 0) / limit));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load lessons:", error);
        setLoading(false);
      });
  }, [currentPage, sort, order, search, category, tone]);

  const handleSelect = (e) => {
    const value = e.target.value;

    if (value === "newest") {
      setSort("createdAt");
      setOrder("desc");
    } else if (value === "saved") {
      setSort("saved");
      setOrder("desc");
    } else {
      setSort("createdAt");
      setOrder("desc");
    }

    setCurrentPage(0);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(0);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
    setCurrentPage(0);
  };

  const handleTone = (e) => {
    setTone(e.target.value);
    setCurrentPage(0);
  };

  return (
    <div>
      <p className="text-3xl pt-5 text-center font-bold">
        Public Lessons : {totalLessons}
      </p>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-4">
        {/* Search */}
        <label className="input w-full md:w-72 lg:w-80 flex items-center gap-2">
          <FaSearch />
          <input
            type="search"
            placeholder="Search"
            onChange={handleSearch}
            className="w-full"
          />
        </label>

        {/* Category */}
        <select
          onChange={handleCategory}
          className="select select-bordered w-full md:w-80"
        >
          <option value="">All Categories</option>
          <option value="Personal Growth">Personal Growth</option>
          <option value="Relationships">Relationships</option>
          <option value="Mindset">Mindset</option>
          <option value="Mistakes Learned">Mistakes Learned</option>
          <option value="Career">Career</option>
        </select>

        {/* Tone */}
        <select
          onChange={handleTone}
          className="select select-bordered w-full md:w-80"
        >
          <option value="">All Tone</option>
          <option value="Motivational">Motivational</option>
          <option value="Gratitude">Gratitude</option>
          <option value="Sad">Sad</option>
          <option value="Realization">Realization</option>
        </select>

        {/* Sort */}
        <select
          onChange={handleSelect}
          className="select select-bordered w-full md:w-72 lg:w-80"
        >
          <option value="">Sort</option>
          <option value="newest">Newest</option>
          <option value="saved">Most Saved</option>
        </select>
      </div>

      {/* Loading */}
      {loading && (
        <LoadingPage></LoadingPage>
      )}

      {/* Empty */}
      {!loading && lessons.length === 0 && (
        <p className="text-center text-3xl font-semibold py-20">
          ❌ No Data Available
        </p>
      )}

      {/* Lessons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {lessons.map((lesson) => (
          <div key={lesson._id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{lesson.title}</h2>
              <p>{lesson.shortDescription}</p>

              <div className="text-sm text-gray-600 mt-2 space-y-1">
                <p>
                  <strong>Category:</strong> {lesson.category}
                </p>
                <p>
                  <strong>Tone:</strong> {lesson.emotionalTone}
                </p>
                <p>
                  <strong>Access:</strong> {lesson.privacy}
                </p>
                <p>
                  <strong>Saved:</strong> {lesson.saved || 0}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {lesson.createdAt
                    ? new Date(lesson.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

              <Link
                to={`/lessonsDetails/${lesson._id}`}
                className="btn btn-primary w-full mt-3"
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="py-6 flex justify-center gap-2 flex-wrap">
        {currentPage > 0 && (
          <button
            onClick={() => setCurrentPage((p) => p - 1)}
            className="btn"
          >
            Prev
          </button>
        )}

        {[...Array(totalPages).keys()].map((i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`btn ${
              i === currentPage ? "btn-primary" : "btn-outline"
            }`}
          >
            {i + 1}
          </button>
        ))}

        {currentPage < totalPages - 1 && (
          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            className="btn"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default PublicLessons;


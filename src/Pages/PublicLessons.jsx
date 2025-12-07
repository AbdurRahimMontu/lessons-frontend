import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const PublicLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filters & Search & Sort
  const [search, setSearch] = useState("");


  const [category, setCategory] = useState("");
  const [tone, setTone] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/allLessons")
      .then(res => res.json())
      .then(data => setLessons(data))
      .catch(err => console.error(err));
  }, []);


  // Filter + Search + Sort Logic
  const filteredLessons = lessons.filter((lesson) =>
      lesson.title.toLowerCase().includes(search.toLowerCase()))
  
    .filter((lesson) => (category ? lesson.category === category : true))
    .filter((lesson) => (tone ? lesson.emotionalTone === tone : true))
    .filter((lesson) => (privacy ? lesson.privacy === privacy : true))
    .sort((a, b) => {
      if (sort === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sort === "saved") return (b.saves || 0) - (a.saves || 0);
      return 0;
    });

  // Pagination
  const totalPages = Math.ceil(filteredLessons.length / itemsPerPage);
  const currentLessons = filteredLessons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">

      {/* Search + Filter + Sort */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">

        {/* Search */}
        <input
          type="text"
          placeholder="Search lessons..."
          className="input input-bordered w-full"
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        {/* Category Filter */}
        <select
          className="select select-bordered w-full"
          onChange={(e) => {
            setCategory(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All Categories</option>
          <option value="Personal Growth">Personal Growth</option>
          <option value="Career">Career</option>
          <option value="Relationships">Relationships</option>
          <option value="Mindset">Mindset</option>
          <option value="Mistakes Learned">Mistakes Learned</option>
        </select>

        {/* Tone Filter */}
        <select
          className="select select-bordered w-full"
          onChange={(e) => {
            setTone(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All Tones</option>
          <option value="Motivational">Motivational</option>
          <option value="Sad">Sad</option>
          <option value="Realization">Realization</option>
          <option value="Gratitude">Gratitude</option>
        </select>

        {/* Privacy Filter */}
        <select
          className="select select-bordered w-full"
          onChange={(e) => {
            setPrivacy(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All Access</option>
          <option value="Public">Public</option>
          <option value="Private">Private</option>
        </select>

        {/* Sort */}
        <select
          className="select select-bordered w-full"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="newest">Newest First</option>
          <option value="saved">Most Saved</option>
        </select>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {currentLessons.map((lesson) => (
          <div key={lesson._id} className="card bg-base-100 shadow-2xl">

            <div className="card-body">
              <h2 className="card-title">{lesson.title}</h2>
              <p>{lesson.shortDescription}</p>

              <div className="text-sm text-gray-600 mt-2">
                <h2><span className="font-bold">Category:</span>{lesson.category}</h2>
                <h2><span className="font-bold">Tone:</span>{lesson.emotionalTone}</h2>
                <h2><span className="font-bold">Access:</span> {lesson.privacy}</h2>
                <h2><span className="font-bold">Saved:</span> {lesson.saves || 0}</h2>
                <h2><span className="font-bold">Date:</span>{lesson.createdAt || 0}</h2>
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
      <div className="flex justify-center mt-10 gap-2">
        <button
          className="btn btn-sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`btn btn-sm ${
              currentPage === index + 1 ? "btn-primary" : "btn-outline"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="btn btn-sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>


    </div>
  );
};

export default PublicLessons;




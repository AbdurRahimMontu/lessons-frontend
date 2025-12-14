import { useEffect, useState } from "react";
import { Link } from "react-router";
import LoadingPage from "./LoadingPage";

const FeaturedLifeLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch("http://localhost:5000/featuredLessons")
      .then((res) => res.json())
      .then((data) => {
        setLessons(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load featured lessons:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="py-5">
      <h2 className="text-3xl sm:text-4xl font-bold text-center">
        Featured Life Lessons Section
      </h2>

      {/* Loading */}
      {loading && (
       <LoadingPage></LoadingPage>
      )}

      {/* Empty */}
      {!loading && lessons.length === 0 && (
        <p className="text-center text-2xl py-10 font-semibold">
          ❌ No Featured Lessons Found
        </p>
      )}

      {/* Lessons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {!loading &&
          lessons.map((lesson) => (
            <div key={lesson._id} className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h2 className="card-title">{lesson.title}</h2>
                <p className="text-justify">{lesson.shortDescription}</p>

                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    <span className="font-semibold">Category:</span>{" "}
                    {lesson.category}
                  </p>
                  <p>
                    <span className="font-semibold">Tone:</span>{" "}
                    {lesson.emotionalTone}
                  </p>
                  <p>
                    <span className="font-semibold">Access:</span>{" "}
                    {lesson.accessLevel}
                  </p>
                  <p>
                    <span className="font-semibold">Created:</span>{" "}
                    {lesson.createdAt
                      ? new Date(lesson.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>

                <div className="card-actions justify-end mt-3">
                  <Link
                    to={`/lessonsDetails/${lesson._id}`}
                    className="btn btn-primary w-full"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Show More */}
      {!loading && lessons.length > 0 && (
        <div className="py-5 flex justify-center">
          <Link to="/publicLessons" className="btn btn-primary">
            Show More
          </Link>
        </div>
      )}
    </div>
  );
};

export default FeaturedLifeLessons;

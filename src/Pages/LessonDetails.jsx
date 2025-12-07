import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
} from "react-share";

const LessonDetails = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isFavorite, setIsFavorite] = useState(false);
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0); // 👈 NEW — random views

  const userEmail = "test@gmail.com"; // <-- replace with real user from auth
  const shareUrl = window.location.href;

  useEffect(() => {
    fetch(`http://localhost:3000/allLessons/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setLesson(data);
        setLikes(data.likes ?? 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Check if favorite
    fetch(`http://localhost:3000/favorites/check/${id}?email=${userEmail}`)
      .then((res) => res.json())
      .then((data) => setIsFavorite(data.isFavorite));

    // 👀 Generate static random views
    const randomViews = Math.floor(Math.random() * 10000);
    setViews(randomViews);

  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!lesson) return <p className="text-center mt-10">Lesson not found!</p>;

  // 🔖 Toggle Favorite
  const handleFavorite = () => {
    const url = `http://localhost:3000/favorites/${id}`;

    fetch(url, {
      method: isFavorite ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userEmail }),
    });

    setIsFavorite(!isFavorite);

    Swal.fire({
      icon: "success",
      title: isFavorite ? "Removed from Favorites" : "Added to Favorites",
      timer: 1200,
      showConfirmButton: false,
    });
  };

  // ❤️ Like
  const handleLike = () => {
    fetch(`http://localhost:3000/lessons/${id}/like`, {
      method: "PUT",
    });
    setLikes((prev) => prev + 1);
  };

  // 🚩 Report
  const handleReport = () => {
    Swal.fire({
      title: "Report This Lesson?",
      text: "This will notify the admin.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Report",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/report/${id}`, {
          method: "POST",
        });

        Swal.fire("Reported", "We received your report.", "success");
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="card bg-base-100 shadow-md p-6">

        <h1 className="text-2xl font-bold mb-3">{lesson.title}</h1>
        <p className="text-gray-600 mb-4">{lesson.shortDescription}</p>

        {/* 🔥 Stats & Engagement Section */}
        <div className="flex flex-wrap items-center gap-6 text-lg font-semibold mb-5">
          
          {/* ❤️ Likes */}
          <div className="flex items-center gap-2">
            <span className="text-red-500 text-xl">❤️</span>
            <span>{likes.toLocaleString()} Likes</span>
          </div>

          {/* 🔖 Favorites */}
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 text-xl">🔖</span>
            <span>{lesson.favorites?.toLocaleString() || 0} Favorites</span>
          </div>

          {/* 👀 Random Views */}
          <div className="flex items-center gap-2">
            <span className="text-blue-500 text-xl">👀</span>
            <span>{views.toLocaleString()} Views</span>
          </div>

        </div>

        <div className="space-y-2 text-sm mb-6">
          <p><strong>Category:</strong> {lesson.category}</p>
          <p><strong>Emotional Tone:</strong> {lesson.emotionalTone}</p>
          <p><strong>Creator:</strong> {lesson.creator?.name}</p>
          <p><strong>Access Level:</strong> {lesson.accessLevel}</p>
          <p><strong>Created:</strong> {lesson.createdAt}</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t">

          {/* Favorite */}
          <button
            onClick={handleFavorite}
            className={`btn ${isFavorite ? "btn-warning" : "btn-outline"}`}
          >
            {isFavorite ? "★ Saved" : "☆ Save to Favorites"}
          </button>

          {/* Like */}
          <button onClick={handleLike} className="btn btn-outline">
            ❤️ Like ({likes})
          </button>

          {/* Report */}
          <button onClick={handleReport} className="btn btn-outline btn-error">
            🚩 Report
          </button>

          {/* Share */}
          <div className="flex gap-2 ml-3">
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <WhatsappShareButton url={shareUrl}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <TwitterShareButton url={shareUrl}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LessonDetails;

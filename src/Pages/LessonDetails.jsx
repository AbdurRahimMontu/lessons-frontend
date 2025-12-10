import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
} from "react-share";

import useAuth from "../Hooks/useAuth";
import LessonCard from "../Components/LessonCard";
import MetaDataAdd from "../Components/MetaDataAdd";

const LessonDetails = () => {
  const { user, loading } = useAuth();
  const { id } = useParams();

  // States
  const [lesson, setLesson] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [similarLessons, setSimilarLessons] = useState([]);
  const [recommendedLessons, setRecommendedLessons] = useState([]);
  const [allLessons, setAllLessons] = useState([]);
  const [authorCount, setAuthorCount] = useState(0);

  const [likes] = useState(0);
  const [favoriteCount] = useState(0);
  const [views] = useState(() => Math.floor(Math.random() * 10000));
  const shareUrl = window.location.href;

  const formatViews = (num) =>
    num >= 1000 ? (num / 1000).toFixed(1) + "K" : num;

  // ===========================
  // FETCH LESSON + RELATED DATA
  // ===========================
  useEffect(() => {
    const loadLesson = async () => {
      try {
        const res = await fetch(`http://localhost:3000/allLessons/${id}`);
        const data = await res.json();
        setLesson(data);

        // Load similar lessons
        fetch(`http://localhost:3000/lessons/similar/${id}`)
          .then((r) => r.json())
          .then(setSimilarLessons);

        // Load recommended lessons
        fetch(`http://localhost:3000/lessons/recommended/${id}`)
          .then((r) => r.json())
          .then(setRecommendedLessons);
      } catch (err) {
        console.error("Error loading lesson:", err);
      }
    };

    loadLesson();
  }, [id]);

  // ===========================
  // LOAD ALL LESSONS (FOR AUTHOR COUNT)
  // ===========================
  useEffect(() => {
    fetch("http://localhost:3000/allLessons")
      .then((res) => res.json())
      .then((data) => setAllLessons(data.lessons || []));
  }, []);

  // ===========================
  // GET AUTHOR LESSON COUNT
  // ===========================
  useEffect(() => {
    if (!lesson?.creator?.name || allLessons.length === 0) return;

    const count = allLessons.filter(
      (item) =>
        item.creator?.name?.toLowerCase() ===
        lesson.creator?.name?.toLowerCase()
    ).length;

    setAuthorCount(count);
  }, [allLessons, lesson]);

  // ===========================
  // LOAD COMMENTS
  // ===========================
  useEffect(() => {
    fetch(`http://localhost:3000/comments/${id}`)
      .then((res) => res.json())
      .then(setComments);
  }, [id]);

  // ===========================
  // SUBMIT COMMENT
  // ===========================
  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;

    const commentData = {
      lessonId: id,
      userEmail: user?.email,
      userName: user?.displayName || "Anonymous",
      comment: newComment,
    };

    fetch("http://localhost:3000/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentData),
    }).then(() => {
      setComments((prev) => [
        { ...commentData, createdAt: new Date() },
        ...prev,
      ]);
      setNewComment("");
    });
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!lesson) return <p className="text-center mt-10">Lesson not found!</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* LESSON DETAILS */}
      <div className="card bg-base-100 shadow-md p-6">
        <h1 className="text-2xl font-bold mb-3">{lesson.title}</h1>
        <p className="text-gray-600 mb-4">{lesson.shortDescription}</p>

        {/* STATS */}
        <div className="flex flex-wrap items-center gap-6 text-lg font-semibold mb-5">
          <div className="flex items-center gap-2">
            <span className="text-red-500 text-xl">❤️</span>
            <span>{likes.toLocaleString()} Likes</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-yellow-500 text-xl">🔖</span>
            <span>{favoriteCount.toLocaleString()} Favorites</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-blue-500 text-xl">👀</span>
            <span>{formatViews(views)} Views</span>
          </div>
        </div>

        {/* INFO */}
        <div className="space-y-2 text-sm mb-6">
          <p><span className="font-bold">Category:</span> {lesson.category}</p>
          <p><span className="font-bold">Emotional Tone:</span> {lesson.emotionalTone}</p>
          <p><span className="font-bold">Creator:</span> {lesson.creator?.name}</p>
          <p><span className="font-bold">Access Level:</span> {lesson.accessLevel}</p>
          <p><span className="font-bold">Created:</span> {lesson.createdAt}</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t">
          <button className="btn btn-outline">🔖 Favorite</button>
          <button className="btn btn-outline">❤️ Like</button>
          <button className="btn btn-outline btn-error">🚩 Report</button>

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

      <hr />

      {/* VIDEO + METADATA */}
      <div className="flex flex-col md:flex-row md:space-x-6 mt-6">
        <div className="w-full md:w-2/3">
          <video
            src={lesson.videoUrl}
            controls
            className="w-full h-auto rounded-md shadow-md"
          ></video>
        </div>

        <MetaDataAdd lesson={lesson} />
      </div>

      <hr />

      {/* AUTHOR CARD */}
      <div className="mt-10 p-5 rounded-xl shadow-lg border bg-base-100">
        <h2 className="text-xl font-bold mb-4">About the Author</h2>

        <div className="flex items-center gap-5">
          <img
            src={lesson.creator?.photo || "/default-user.png"}
            alt={lesson.creator?.name}
            className="w-20 h-20 rounded-full border object-cover"
          />

          <div>
            <h3 className="text-lg font-semibold">{lesson.creator?.name}</h3>
            <p className="text-gray-500 text-sm">{lesson.creator?.email}</p>

            <p className="mt-1 text-sm text-gray-600">
              <span className="font-bold">{authorCount}</span> lessons created
            </p>

            <Link
              to={`/authorLessons`}
              className="btn btn-sm btn-outline mt-3"
            >
              View All Lessons
            </Link>
          </div>
        </div>
      </div>

      {/* COMMENTS */}
      <div className="mt-8 p-4 border-t">
        <h2 className="text-xl font-bold mb-4">Comments</h2>

        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="textarea textarea-bordered w-full"
          placeholder={user ? "Write your comment..." : "Login required to comment"}
          disabled={!user}
        ></textarea>

        <button
          onClick={handleCommentSubmit}
          className="btn btn-primary mt-2"
          disabled={!user}
        >
          {user ? "Post Comment" : "Login to Comment"}
        </button>

        <div className="space-y-4 mt-4">
          {comments.length === 0 && (
            <p className="text-gray-500">No comments yet.</p>
          )}

          {comments.map((c, i) => (
            <div key={i} className="p-3 bg-gray-100 rounded-lg">
              <p className="font-semibold">{c.userName}</p>
              <p className="text-sm text-gray-600">
                {new Date(c.createdAt).toLocaleString()}
              </p>
              <p className="mt-1">{c.comment}</p>
            </div>
          ))}
        </div>
      </div>

      <hr />

      {/* SIMILAR */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Similar Lessons</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {similarLessons.map((item) => (
            <LessonCard key={item._id} item={item} />
          ))}
        </div>
      </div>

      <hr />

      {/* RECOMMENDED */}
      <div className="mt-10 mb-10">
        <h2 className="text-xl font-bold mb-4">Recommended Lessons</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recommendedLessons.map((item) => (
            <LessonCard key={item._id} item={item} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default LessonDetails;



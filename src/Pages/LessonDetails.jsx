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

const LessonDetails = () => {
  const {user, loading} = useAuth()
  const { id } = useParams();
  const [lesson, setLesson] = useState(0);
 const [likes, setLikes] = useState(0);
const [isLiked, setIsLiked] = useState(false);


  const [favoriteCount, setFavoriteCount] = useState(0);
const [comments, setComments] = useState([]);
const [newComment, setNewComment] = useState("");
const [similarLessons, setSimilarLessons] = useState([]);
const [recommendedLessons, setRecommendedLessons] = useState([]);
const [authorInfo, setAuthorInfo] = useState({
  totalLessons: 0,
  lessons: []
});
const [views] = useState(() => Math.floor(Math.random() * 10000));

const formatViews = (num) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num;
};


  const shareUrl = window.location.href;

  

  useEffect(() => {
    fetch(`http://localhost:3000/allLessons/${id}`)
      .then((res) => res.json())
      .then((data) => {
      console.log(data);
      setLesson(data);
  });
}, [id]);

useEffect(() => {
  fetch(`http://localhost:3000/comments/${id}`)
    .then((res) => res.json())
    .then((data) => setComments(data));
}, [id]);


useEffect(() => {
  fetch(`http://localhost:3000/allLessons/${id}`)
    .then(res => res.json())
    .then(data => {
      setLesson(data);

      // Fetch Author Lessons Count
      if (data?.email) {
        fetch(`http://localhost:3000/lessons/creator/${data.email}`)
          .then(res => res.json())
          .then(info => setAuthorInfo(info));
      }
    });
}, [id]);








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
  })
    .then((res) => res.json())
    .then(() => {
      // Update UI instantly
      setComments((prev) => [
        { ...commentData, createdAt: new Date() },
        ...prev,
      ]);
      setNewComment("");
    });
};


    useEffect(() => {
  // load lesson
  fetch(`http://localhost:3000/allLessons/${id}`)
    .then(res => res.json())
    .then(data => {
      setLesson(data);

      // fetch similar
      fetch(`http://localhost:3000/lessons/similar/${id}`)
        .then(res => res.json())
        .then(setSimilarLessons);

      // fetch recommended
      fetch(`http://localhost:3000/lessons/recommended/${id}`)
        .then(res => res.json())
        .then(setRecommendedLessons);
    });
}, [id]);




  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!lesson) return <p className="text-center mt-10">Lesson not found!</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="card bg-base-100 shadow-md p-6">
        <h1 className="text-2xl font-bold mb-3">{lesson.title}</h1>
        <p className="text-gray-600 mb-4">{lesson.shortDescription}</p>

     
        <div className="flex flex-wrap items-center gap-6 text-lg font-semibold mb-5">
          <div className="flex items-center gap-2">
            <span className="text-red-500 text-xl">❤️</span>
            <span>{likes.toLocaleString() || 0} Likes</span>
         </div>
         <div className="flex items-center gap-2">
            <span className="text-yellow-500 text-xl">🔖</span>
            <span>{favoriteCount.toLocaleString() || 0} Favorites</span>
         </div>
     <div className="flex items-center gap-2">
  <span className="text-blue-500 text-xl">👀</span>
  <span>{formatViews(views)} Views</span>
</div>
          </div>

        <div className="space-y-2 text-sm mb-6">
          <p><span className="font-bold">Category:</span> {lesson.category}</p>
          <p><span className="font-bold">Emotional Tone:</span> {lesson.emotionalTone}</p>
          <p><span className="font-bold">Creator:</span> {lesson.creator?.name}</p>
          <p><span className="font-bold">Access Level:</span> {lesson.accessLevel}</p>
          <p><span className="font-bold">Created:</span> {lesson.createdAt}</p>
        </div>

      {/* Buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-4 border-t">  
      <button className="btn btn-outline">🔖 Favorite </button>
      <button className="btn btn-outline">❤️ Like </button>
      <button className="btn btn-outline btn-error">🚩 Report </button>

      {/* Share */}
    <div className="flex gap-2 ml-3">
      <FacebookShareButton url={shareUrl}><FacebookIcon size={32} round />
      </FacebookShareButton>
      <WhatsappShareButton url={shareUrl}><WhatsappIcon size={32} round />
      </WhatsappShareButton>
      <TwitterShareButton url={shareUrl}><TwitterIcon size={32} round />
      </TwitterShareButton>
     </div>
    </div>

   </div>

<hr />
{/* AUTHOR / CREATOR SECTION */}
<div className="mt-10 p-5 rounded-xl shadow-lg border bg-base-100">
  <h2 className="text-xl font-bold mb-4">About the Author</h2>

  <div className="flex items-center gap-5">
    {/* Profile Image */}
    <img
      src={lesson.creator?.photo || "/default-user.png"}
      alt="Author"
      className="w-20 h-20 rounded-full border"
    />

    {/* Info */}
    <div>
      <h3 className="text-lg font-semibold">{lesson.creator?.name}</h3>
      <p className="text-gray-500 text-sm">{lesson.email}</p>

      <p className="mt-1 text-sm text-gray-600">
        <span className="font-bold">{authorInfo.totalLessons}</span> lessons created
      </p>

      <Link to={`/authorLessons`} lesson={lesson}
        className="btn btn-sm btn-outline mt-3"
      >
        View All Lessons by This Author
      </Link>
    </div>
  </div>
</div>





   {/* Comment Section */}
   {/* COMMENT SECTION */}
<div className="mt-8 p-4 border-t">
  <h2 className="text-xl font-bold mb-4">Comments</h2>

  {/* Only logged-in users can comment */}
  <div className="mb-4">
    <textarea
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
      className="textarea textarea-bordered w-full"
      placeholder={
        user ? "Write your comment..." : "Login required to comment"
      }
      disabled={!user}
    ></textarea>

    <button
      onClick={handleCommentSubmit}
      className="btn btn-primary mt-2"
      disabled={!user}
    >
      {user ? "Post Comment" : "Login to Comment"}
    </button>
  </div>

  {/* Show all comments */}
  <div className="space-y-4">
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
{/* SIMILAR LESSONS */}
<div className="mt-10">
  <h2 className="text-xl font-bold mb-4">Similar Lessons</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {similarLessons.map(item => (
      <LessonCard key={item._id} item={item} />
    ))}
  </div>
</div>
<hr />
{/* RECOMMENDED LESSONS */}
<div className="mt-10">
  <h2 className="text-xl font-bold mb-4">Recommended Lessons</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {recommendedLessons.map(item => (
      <LessonCard key={item._id} item={item} />
    ))}
  </div>
</div>

  </div>
  );
};

export default LessonDetails;

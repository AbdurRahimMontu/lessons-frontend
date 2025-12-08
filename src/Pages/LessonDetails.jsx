import { useEffect, useState } from "react";
import { useParams } from "react-router";

import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
} from "react-share";

import useAuth from "../Hooks/useAuth";

const LessonDetails = () => {
  const {loading} = useAuth()
  const { id } = useParams();
  const [lesson, setLesson] = useState(0);
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);

  const shareUrl = window.location.href;

  useEffect(() => {
    fetch(`http://localhost:3000/allLessons/${id}`)
      .then((res) => res.json())
      .then((data) => {
      console.log(data);
      setLesson(data);
  });
}, [id]);


  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!lesson) return <p className="text-center mt-10">Lesson not found!</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
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
            <span>{views.toLocaleString()} Views</span>
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
  </div>
  );
};

export default LessonDetails;

import { useEffect, useState } from "react";
import { useParams } from "react-router";

const LessonDetails = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/allLessons/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setLesson(data);        // or data[0] depending on API
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!lesson) return <p className="text-center mt-10">Lesson not found!</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="card bg-base-100 shadow-md p-6">
        <h1 className="text-2xl font-bold mb-3">{lesson.title}</h1>

        <p className="text-gray-600 mb-4">{lesson.shortDescription}</p>

        <div className="space-y-2 text-sm">
          <p><strong>Category:</strong> {lesson.category}</p>
          <p><strong>Emotional Tone:</strong> {lesson.emotionalTone}</p>
          <p><strong>Creator:</strong> {lesson.creator?.name}</p>
          <p><strong>Access Level:</strong> {lesson.accessLevel}</p>
          <p><strong>Created:</strong> {lesson.createdAt}</p>
        </div>
      </div>
    </div>
  );
};

export default LessonDetails;

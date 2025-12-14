import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const AuthorCreatedLessons = () => {
  const { id } = useParams();   

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:5000/publicLessons/creator/${id}`)
      .then(res => {
        setLessons(res.data.lessons || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Author Created Lessons</h2>

      {lessons.length === 0 && <p>No lessons found</p>}

      {lessons.map(lesson => (
        <div
          key={lesson._id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "12px",
            padding: "10px",
            borderRadius: "6px"
          }}
        >
          <h3>{lesson.title}</h3>
          <p>{lesson.shortDescription}</p>
        </div>
      ))}
    </div>
  );
};

export default AuthorCreatedLessons;

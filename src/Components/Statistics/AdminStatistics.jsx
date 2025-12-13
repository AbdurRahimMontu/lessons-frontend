import { useEffect, useState } from "react";
// import useAuth from "../../Hooks/useAuth";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const AdminStatistics = () => {
  // const { user } = useAuth();
  
  // State for fetched data
  const [totalUsers, setTotalUsers] = useState(0);
  const [lessons, setLessons] = useState([]);
  // const [favoriteCount, setFavoriteCount] = useState(0);
  // const [totalPublicLessons, setTotalPublicLessons] = useState(0);


console.log(lessons);
 useEffect(() => {
    fetch("https://lessons-frontend.vercel.app/users") 
      .then((res) => res.json())
      .then((data) => setTotalUsers(data))
      .catch((err) => console.error(err));
  }, []);


  useEffect( ()=>{
    fetch("https://lessons-frontend.vercel.app/allLessons")
    .then(res=>res.json())
    .then(data=>setLessons(data))
  },[])






  // Fetch favorite count
  // useEffect(() => {
  //   if (!user?.email) return;

  //   fetch(`https://lessons-frontend.vercel.app/favorites/count/${user.email}`)
  //     .then((res) => res.json())
  //     .then((data) => setFavoriteCount(data.count))
  //     .catch((err) => console.error(err));
  // }, [user]);

 

  // Sample data for chart (can be replaced with damic data)

  // const chartData = [
  //   { name: "Jan", lessons: 40, users: 120 },
  //   { name: "Feb", lessons: 50, users: 150 },
  
  // ];
  
  const chartData = [
    { name: "Jan", lessons: 40, users: 120 },
    { name: "Feb", lessons: 50, users: 150 },
  
  ];

  return (
    <div className="p-5 space-y-5">
      {/* Statistics Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-6 bg-white flex flex-col justify-center items-center shadow rounded-xl">
          <p className="text-3xl font-bold mt-2">{totalUsers.length}</p>
          <h2 className="text-md font-semibold">Total Users</h2>
        </div>

        <div className="p-6 bg-white flex flex-col justify-center items-center shadow rounded-xl">
          <p className="text-3xl font-bold mt-2">{lessons.totalLessons}</p>
          <h2 className="text-md font-semibold">Total Public Lessons</h2>
        </div>
        <div className="p-6 bg-white flex flex-col justify-center items-center shadow rounded-xl">
          <p className="text-3xl font-bold mt-2">0</p>
          <h2 className="text-md font-semibold">Total Reported Lessons</h2>
        </div>
        <div className="p-6 bg-white flex flex-col justify-center items-center shadow rounded-xl">
          <p className="text-3xl font-bold mt-2">0</p>
          <h2 className="text-md font-semibold">Most Active Contributors</h2>
        </div>
        <div className="p-6 bg-white flex flex-col justify-center items-center shadow rounded-xl">
          <p className="text-3xl font-bold mt-2">0</p>
          <h2 className="text-md font-semibold">Today's New Lessons</h2>
        </div>
      </div>

      {/* Lesson/User Growth Chart */}
      <div className="bg-white shadow p-5 rounded-lg mt-5 w-full max-w-4xl mx-auto">
        <h2 className="text-lg font-semibold mb-3">Lesson Growth & User Growth</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="lessons" stroke="#008000" activeDot={{ r: 8 }}/>
            <Line type="monotone" dataKey="users" direction={lessons.le} stroke="#660066" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminStatistics;

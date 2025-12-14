import { useEffect, useState } from "react";

import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Scatter } from 'recharts';
import useAuth from "../../Hooks/useAuth";


const AdminStatistics = () => {
  const { user } = useAuth();
 console.log(user);
  // State for fetched data
  const [totalUsers, setTotalUsers] = useState(0);
  const [lessons, setLessons] = useState([]);
  // const [favoriteCount, setFavoriteCount] = useState(0);
  // const [totalPublicLessons, setTotalPublicLessons] = useState(0);

 useEffect(() => {
    fetch("http://localhost:5000/users") 
      .then((res) => res.json())
      .then((data) => setTotalUsers(data))
      .catch((err) => console.error(err));
  }, []);


  useEffect( ()=>{
    fetch("http://localhost:5000/publicLessons")
    .then(res=>res.json())
    .then(data=>setLessons(data))
  },[])






  // Fetch favorite count
  // useEffect(() => {
  //   if (!user?.email) return;

  //   fetch(`http://localhost:5000/favorites/count/${user.email}`)
  //     .then((res) => res.json())
  //     .then((data) => setFavoriteCount(data.count))
  //     .catch((err) => console.error(err));
  // }, [user]);

 

 


  
// Sample data
const data = [
  { index: 1000, red: `${lessons.totalLessons}`, blue: `${totalUsers.length}` },
  
  // Calculation of line of best fit is not included in this demo
  { index: 0, redLine: 0 },
  { index: 1000, redLine: `${lessons.totalLessons}` },
  { index: 0, blueLine: 0 },
  { index: 1000, blueLine: `${totalUsers.length}`},
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
        {/* // chart */}
      <div>
    <ComposedChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '50vh', aspectRatio: 1.618 }}
      responsive
      data={data}
      margin={{
        top: 20,
        right: 0,
        bottom: 0,
        left: 0,
      }}>
      <CartesianGrid stroke="#f5f5f5" />
      <Tooltip />
      <Legend />

      <XAxis dataKey="index" type="number" label={{ value: '', position: 'insideBottomRight', offset: 0 }} />
      <YAxis unit="" type="number" label={{ value: '', position: 'insideLeft' }} width="auto" />
      <Scatter name="lesson" dataKey="red" fill="red" />
      <Scatter name="user" dataKey="blue" fill="blue" />
      <Line dataKey="blueLine" stroke="blue" dot={false} activeDot={false} legendType="none" />
      <Line dataKey="redLine" stroke="red" dot={false} activeDot={false} legendType="none" />
    </ComposedChart>


        </div>
        

      </div>
    </div>
  );
};

export default AdminStatistics;

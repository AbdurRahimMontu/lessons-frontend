import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';

const AdminStatistics = () => {
    const [lessons, setLessons] = useState([]);
   const [favoriteCount, setFavoriteCount] = useState(0);
   const { user } = useAuth();  
   useEffect(() => {
     if (!user?.email) return;
   
     fetch(`http://localhost:3000/favorites/count/${user.email}`)
       .then(res => res.json())
       .then(data => setFavoriteCount(data.count))
       .catch(err => console.error(err));
   }, [user]);
   
     useEffect(() => {
       fetch("http://localhost:3000/allLessons") 
         .then(res => res.json())
         .then(data => setLessons(data))
         .catch(err => console.error(err));
     }, []);
    return (
        <div>
               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-lg font-semibold">Total Lessons Created</h2>
          <p className="text-3xl font-bold mt-2">{lessons.length}</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-lg font-semibold">Total Favorites Saved</h2>
          <p className="text-3xl font-bold mt-2">{favoriteCount}</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-lg font-semibold">Weekly Contributions</h2>
          <p className="text-3xl font-bold mt-2">5</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-lg font-semibold">Monthly Reflections</h2>
          <p className="text-3xl font-bold mt-2">18</p>
        </div>

      </div>

      {/* Recently Added Lessons */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Recently Added Lessons</h2>

        <div className="space-y-3">
          <div className="p-4 border rounded-lg">
            <p className="font-medium">🌱 Personal Growth: How I Learned to Stay Calm</p>
            <span className="text-sm text-gray-500">2 days ago</span>
          </div>

          <div className="p-4 border rounded-lg">
            <p className="font-medium">💡 Mindset Shift: Stop Comparing Yourself</p>
            <span className="text-sm text-gray-500">5 days ago</span>
          </div>

          <div className="p-4 border rounded-lg">
            <p className="font-medium">🔥 Career: Importance of Showing Progress</p>
            <span className="text-sm text-gray-500">1 week ago</span>
          </div>
        </div>
      </div>

      {/* Quick Shortcuts */}


      {/* Mini Analytics Placeholder */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          Analytics (Weekly or Monthly Contributions)
        </h2>

        <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">[Chart Placeholder]</span>
        </div>
      </div>
        </div>
    );
};

export default AdminStatistics;
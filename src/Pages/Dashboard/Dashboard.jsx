import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import useAuth from '../../Hooks/useAuth';

const Dashboard = () => {
   const [lessons, setLessons] = useState([]);
   const { user } = useAuth();  
const [favoriteCount, setFavoriteCount] = useState(0);

useEffect(() => {
  if (!user?.email) return;

  fetch(`http://localhost:3000/favorites/count/${user.email}`)
    .then(res => res.json())
    .then(data => setFavoriteCount(data.count))
    .catch(err => console.error(err));
}, [user]);

  useEffect(() => {
    fetch("http://localhost:3000/allLessons") // change to your API route
      .then(res => res.json())
      .then(data => setLessons(data))
      .catch(err => console.error(err));
  }, []);
    return (
        <div>
            <div className="drawer lg:drawer-open">
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Navbar */}
    <nav className="navbar w-full bg-base-300">
      <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
        {/* Sidebar toggle icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
      </label>
      <div className="px-4">Navbar Title</div>
    </nav>
    {/* Page content here */}
    {/* <div className="p-4">Page Content</div> */}
   {/* Top Stats Row */}
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
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Shortcuts</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/dashboard/add-lesson" className="p-4 bg-blue-100 text-center rounded-lg hover:bg-blue-200">
            ➕ Add New Lesson
          </Link>

          <Link to="/dashboard/my-lessons" className="p-4 bg-green-100 text-center rounded-lg hover:bg-green-200">
            📚 My Lessons
          </Link>

          <Link to="/dashboard/my-favorites" className="p-4 bg-amber-100 text-center rounded-lg hover:bg-amber-200">
            ⭐ Favorites
          </Link>

          <Link to="/dashboard/profile" className="p-4 bg-purple-100 text-center rounded-lg hover:bg-purple-200">
            👤 Edit Profile
          </Link>
        </div>
      </div>

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

  <div className="drawer-side is-drawer-close:overflow-visible">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
      {/* Sidebar content here */}
      <ul className="menu w-full grow">
        {/* List item */}
        <li>
          <Link to="/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
            {/* Home icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
            <span className="is-drawer-close:hidden">Homepage</span>
          </Link>
        </li>
             <li className='pt-4'>
              <h2>Statics</h2>
             </li>
        {/* List item */}
        <li>
          <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
            {/* Settings icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
            <span className="is-drawer-close:hidden">Settings</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</div>
        </div>
    );
};

export default Dashboard;
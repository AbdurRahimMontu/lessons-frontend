import React from 'react';

const CustomerStatistics = () => {
    return (
        <div>
          <div>
   <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="p-6 bg-white flex flex-col justify-center items-center shadow rounded-xl">
          <p className="text-3xl font-bold mt-2">{}</p>
          <h2 className="text-md font-semibold">Total lessons created</h2>
        </div>
        <div className="p-6 bg-white flex flex-col justify-center items-center shadow rounded-xl">
          <p className="text-3xl font-bold mt-2">{}</p>
          <h2 className="text-md font-semibold">Total saved (favorites)</h2>
        </div>


      </div>
      <div className='py-5'>
  <h2 className='text-2xl'>Quick shortcuts to important actions Button</h2>
<div className='pt-4'>
    <button className='btn btn-primary '>button1</button>
</div>
</div>
          </div>
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

export default CustomerStatistics;
// app/dashboard/page.tsx

import React from 'react';




const DashboardPage = () => {
 


  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>

      {/* Welcome Message Card (Optional) */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <p className="text-lg text-gray-700">
          👋 Welcome back! Check out the latest stats below.
        </p>
      </div>

      {/* Stat Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Total Users Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-indigo-200">
          <p className="text-sm font-medium text-gray-500">Total Users</p>
          <p className="mt-1 text-4xl font-extrabold text-indigo-600">23</p>
        </div>

        {/* Active Users Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-green-200">
          <p className="text-sm font-medium text-gray-500">Active Users</p>
          <p className="mt-1 text-4xl font-extrabold text-green-600">5</p>
        </div>
        
      </div>
    </div>
  );
};

export default DashboardPage;
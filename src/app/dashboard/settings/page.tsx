// app/dashboard/settings/page.tsx

import React from 'react';

const SettingsPage = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Settings</h1>

      <div className="max-w-xl bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <form className="space-y-6" onSubmit={(e) => {
          e.preventDefault();
          console.log('Settings submitted');
        }}>
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <div className="mt-1">
              <input
                type="text"
                name="name"
                id="name"
                defaultValue="Default User"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                placeholder="Enter your name"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1">
              <input
                type="email"
                name="email"
                id="email"
                defaultValue="user@example.com"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Theme Toggle (Dummy Checkbox) */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <span className="text-sm font-medium text-gray-700">Dark Mode</span>
            <label htmlFor="theme-toggle" className="flex items-center cursor-pointer">
              <div className="relative">
                <input type="checkbox" id="theme-toggle" className="sr-only" />
                <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform translate-x-0 peer-checked:translate-x-full peer-checked:bg-white peer-checked:ring-2 peer-checked:ring-indigo-500"></div>
              </div>
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
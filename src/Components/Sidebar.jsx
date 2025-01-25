import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ setIsAuthenticated }) => {
  return (
    <div className="w-1/5 bg-gray-800 h-screen flex flex-col justify-between p-6 shadow-lg">
      {/* Top Section */}
      <div>
        <h3 className="text-xl font-bold text-white mb-6">Navigation</h3>
        <nav className="space-y-6">
          <NavLink
            to="/dashboard"
            className="block text-gray-300 text-lg hover:text-white hover:bg-gray-600 px-4 py-2 rounded transition"
          >
            View Tools
          </NavLink>
          <NavLink
            to="/dashboard/create"
            className="block text-gray-300 text-lg hover:text-white hover:bg-gray-600 px-4 py-2 rounded transition"
          >
            Create Tool
          </NavLink>
        </nav>
      </div>

      {/* Bottom Section */}
      <button
        className="bg-red-600 text-white text-lg px-4 py-3 rounded hover:bg-red-700 transition"
        onClick={() => setIsAuthenticated(false)}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Sidebar;

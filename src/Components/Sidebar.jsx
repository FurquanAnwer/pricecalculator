import React from "react"
import { NavLink } from "react-router-dom"
import { FaSignOutAlt, FaTools, FaToolbox, FaBars, FaTimes } from "react-icons/fa"

const Sidebar = ({ setIsAuthenticated, isSidebarOpen, setIsSidebarOpen }) => {
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <>
      {/* Hamburger button */}
      <button
        className="md:hidden fixed top-4 left-4 z-20 p-2 bg-gray-800 text-white rounded-md"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
      </button>

      {/* Sidebar */}
      <div
        className={`w-64 bg-gray-800 h-screen flex flex-col justify-between p-6 shadow-lg fixed md:relative transition-all duration-300 ease-in-out z-10 ${
          isSidebarOpen ? "left-0" : "-left-64"
        } md:left-0`}
      >
        <div>
          <h3 className="text-xl font-extrabold text-white mb-6 mt-6">TechCorp</h3>
          <nav className="space-y-6">
            <NavLink
              to="/dashboard"
              className="block text-gray-100 text-lg font-bold hover:text-white hover:bg-gray-700 px-4 py-2 rounded transition flex flex-row gap-3"
              onClick={() => setIsSidebarOpen(false)}
            >
              <FaToolbox />
              <span>View Available Tools</span>
            </NavLink>
            <NavLink
              to="/dashboard/create"
              className="block text-gray-100 text-lg font-bold hover:text-white hover:bg-gray-700 px-4 py-2 rounded transition flex flex-row gap-3"
              onClick={() => setIsSidebarOpen(false)}
            >
              <FaTools /> <span>Create a new Tool</span>
            </NavLink>
          </nav>
        </div>

        <button
          className="flex items-center justify-center gap-2 bg-white text-black font-medium text-lg px-6 py-3 rounded-lg shadow-md hover:bg-gray-200"
          onClick={() => setIsAuthenticated(false)}
        >
          <FaSignOutAlt className="text-xl" />
          <span>Sign Out</span>
        </button>
      </div>
    </>
  )
}

export default Sidebar


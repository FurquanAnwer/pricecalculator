import React, { useState } from "react"
import { Routes, Route } from "react-router-dom"
import Sidebar from "../Components/Sidebar"
import ToolList from "../Components/ToolList"
import CreateTool from "../Components/CreateTool"

const Dashboard = ({ setIsAuthenticated }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar
        setIsAuthenticated={setIsAuthenticated}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex-1 bg-white shadow-lg md:rounded-tl-lg overflow-y-auto">
        <Routes>
          <Route path="/" element={<ToolList />} />
          <Route path="/create" element={<CreateTool />} />
        </Routes>
      </div>
    </div>
  )
}

export default Dashboard


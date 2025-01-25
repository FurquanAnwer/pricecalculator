import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import ToolList from '../Components/ToolList';
import CreateTool from '../Components/CreateTool';

const Dashboard = ({ setIsAuthenticated }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      <Sidebar setIsAuthenticated={setIsAuthenticated} />

      
      <div className="flex-1 p-6 bg-white shadow-lg rounded-tl-lg">
        <Routes>
          <Route path="/" element={<ToolList />} />
          <Route path="/create" element={<CreateTool />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;

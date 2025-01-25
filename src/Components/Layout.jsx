import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-r flex flex-row">
      <Sidebar />
      <div className="flex-1 overflow-auto"> {/* Ensure proper layout */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

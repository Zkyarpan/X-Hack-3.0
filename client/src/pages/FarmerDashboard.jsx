import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const FarmerDashboard = () => {
  return (
    <div className="flex gap-1 bg-gray-50">
      <Sidebar />
      <div className="flex flex-col">
        <Topbar />


      </div>
    </div>
  );
};

export default FarmerDashboard;

import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex">
      {/* Sidebar with glass morphism effect */}
      <div className="hidden md:flex">
        <Sidebar className="w-64 bg-white/80 backdrop-blur-lg border-r border-purple-100 shadow-sm" />
      </div>

      {/* Mobile sidebar toggle would go here */}

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar with subtle gradient */}
        {/* <Navbar className="bg-gradient-to-r from-white to-indigo-50 border-b border-purple-100" /> */}

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-sm p-6 border border-purple-100">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

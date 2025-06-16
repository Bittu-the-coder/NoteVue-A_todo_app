import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-400 opacity-5 rounded-full" />
        <div className="absolute top-1/4 right-10 w-60 h-60 bg-purple-500 opacity-5 rounded-full" />
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-indigo-400 opacity-10 rounded-full" />

        <div className="absolute top-20 right-20 w-32 h-32 border-4 border-blue-200 rounded-full opacity-10" />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              className="fixed inset-y-0 left-0 w-80 bg-white shadow-lg"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <Sidebar />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden p-4 flex items-center justify-between border-b border-blue-100 bg-white/80 backdrop-blur-lg shadow-sm">
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              NoteVue
            </h2>
            <p className="text-xs text-blue-400/80">Productivity Suite</p>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

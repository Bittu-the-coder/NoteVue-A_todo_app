import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

const DashboardLayout = ({ children }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className={`flex h-screen overflow-hidden ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
      }`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className={`absolute -top-40 -left-40 w-80 h-80 ${
            isDarkMode ? "bg-blue-600" : "bg-blue-400"
          } opacity-5 rounded-full`}
        />
        <div
          className={`absolute top-1/4 right-10 w-60 h-60 ${
            isDarkMode ? "bg-purple-600" : "bg-purple-500"
          } opacity-5 rounded-full hidden md:block`}
        />
        <div
          className={`absolute bottom-20 left-1/4 w-40 h-40 ${
            isDarkMode ? "bg-indigo-600" : "bg-indigo-400"
          } opacity-10 rounded-full hidden md:block`}
        />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block h-screen flex-shrink-0">
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
              className={`fixed inset-0 ${
                isDarkMode ? "bg-black/50" : "bg-gray-900/20"
              } backdrop-blur-sm`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              className={`fixed inset-y-0 left-0 w-64 ${
                isDarkMode
                  ? "bg-gray-800/90 border-r border-gray-700"
                  : "bg-white/80 border-r border-blue-100"
              } backdrop-blur-lg shadow-lg`}
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
      <div className="flex-1 flex flex-col h-screen overflow-auto">
        {/* Mobile Header */}
        <div
          className={`md:hidden sticky top-0 px-4 py-3 flex items-center justify-between ${
            isDarkMode
              ? "border-b border-gray-700 bg-gray-800/90"
              : "border-b border-blue-100 bg-white/80"
          } backdrop-blur-lg shadow-sm z-20`}
        >
          <div>
            <h2
              className={`text-xl font-bold bg-gradient-to-r ${
                isDarkMode
                  ? "from-blue-400 to-purple-400"
                  : "from-blue-600 to-purple-600"
              } bg-clip-text text-transparent`}
            >
              NoteVue
            </h2>
            <p
              className={`text-xs ${
                isDarkMode ? "text-blue-400/60" : "text-blue-400/80"
              }`}
            >
              Productivity Suite
            </p>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-2 rounded-lg ${
              isDarkMode
                ? "bg-gray-700 text-blue-400 hover:bg-gray-600 hover:text-blue-300"
                : "bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
            } transition-all`}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 relative z-10">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;

import React, { useState } from "react";
import { FiUser, FiBell, FiLock, FiMoon, FiGlobe } from "react-icons/fi";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-purple-900">Settings</h1>

      <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-purple-100 shadow-sm">
        <h2 className="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
          <FiUser className="text-purple-600" />
          Account Settings
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border-b border-purple-100">
            <div>
              <p className="font-medium text-purple-900">Email</p>
              <p className="text-sm text-purple-500">user@example.com</p>
            </div>
            <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
              Change
            </button>
          </div>

          <div className="flex items-center justify-between p-3 border-b border-purple-100">
            <div>
              <p className="font-medium text-purple-900">Password</p>
              <p className="text-sm text-purple-500">
                Last changed 3 months ago
              </p>
            </div>
            <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
              Change
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-purple-100 shadow-sm">
        <h2 className="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
          <FiBell className="text-purple-600" />
          Notifications
        </h2>

        <div className="flex items-center justify-between p-3">
          <div>
            <p className="font-medium text-purple-900">Email Notifications</p>
            <p className="text-sm text-purple-500">Receive updates via email</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-purple-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-purple-100 shadow-sm">
        <h2 className="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
          <FiMoon className="text-purple-600" />
          Appearance
        </h2>

        <div className="flex items-center justify-between p-3">
          <div>
            <p className="font-medium text-purple-900">Dark Mode</p>
            <p className="text-sm text-purple-500">
              Switch between light and dark theme
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-purple-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Settings;

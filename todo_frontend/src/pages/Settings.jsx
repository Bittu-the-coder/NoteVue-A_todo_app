import React, { useState } from "react";
import { User, Bell, Moon, Globe, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { getMe } from "../services/auth";
import UpdateModal from "../components/UpdateModal";
import { updateProfile } from "../services/auth";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  // const [performance, setPerformance] = useState(false);
  const [userData, setUserData] = React.useState({
    email: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateType, setUpdateType] = useState("");

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getMe();
        setUserData(response);
        // console.log("userData:", response);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async (formData) => {
    try {
      const response = await updateProfile(formData);
      setUserData(response);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const openModal = (type) => {
    setUpdateType(type);
    setIsModalOpen(true);
  };

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="relative" variants={itemVariants}>
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Settings
        </h1>
        <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-600 to-purple-600 rounded-full" />
      </motion.div>

      <motion.div
        className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-blue-100 shadow-lg relative overflow-hidden"
        variants={itemVariants}
      >
        {/* Decorative corner elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-blue-400 rounded-tl-lg" />
        <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-blue-400 rounded-tr-lg" />
        <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-blue-400 rounded-bl-lg" />
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-blue-400 rounded-br-lg" />

        <h2 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <User className="text-blue-600 w-5 h-5" />
          </div>
          Account Settings
        </h2>

        <div className="space-y-4">
          <motion.div
            className="flex items-center justify-between p-3 border-b border-blue-100 hover:bg-blue-50 rounded-lg transition-colors"
            whileHover={{ x: 3 }}
          >
            <div>
              <p className="font-medium text-blue-900">Email</p>
              <p className="text-sm text-blue-500">{userData.email}</p>
            </div>
            <motion.button
              onClick={() => openModal("email")}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Change
            </motion.button>
          </motion.div>

          <motion.div
            className="flex items-center justify-between p-3 border-b border-blue-100 hover:bg-blue-50 rounded-lg transition-colors"
            whileHover={{ x: 3 }}
          >
            <div>
              <p className="font-medium text-blue-900">Password</p>
              <p className="text-sm text-blue-500">Last changed 3 months ago</p>
            </div>
            <motion.button
              onClick={() => openModal("password")}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Change
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-blue-100 shadow-lg relative overflow-hidden"
        variants={itemVariants}
      >
        {/* Decorative corner elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-indigo-400 rounded-tl-lg" />
        <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-indigo-400 rounded-tr-lg" />
        <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-indigo-400 rounded-bl-lg" />
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-indigo-400 rounded-br-lg" />

        <h2 className="text-lg font-semibold text-indigo-800 mb-4 flex items-center gap-2">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Bell className="text-indigo-600 w-5 h-5" />
          </div>
          Notifications
        </h2>

        <motion.div
          className="flex items-center justify-between p-3 hover:bg-indigo-50 rounded-lg transition-colors"
          whileHover={{ x: 3 }}
        >
          <div>
            <p className="font-medium text-indigo-900">Email Notifications</p>
            <p className="text-sm text-indigo-500">Receive updates via email</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-indigo-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-indigo-600"></div>
          </label>
        </motion.div>
      </motion.div>

      <motion.div
        className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-blue-100 shadow-lg relative overflow-hidden"
        variants={itemVariants}
      >
        {/* Decorative corner elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-purple-400 rounded-tl-lg" />
        <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-purple-400 rounded-tr-lg" />
        <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-purple-400 rounded-bl-lg" />
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-purple-400 rounded-br-lg" />

        <h2 className="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Moon className="text-purple-600 w-5 h-5" />
          </div>
          Appearance
        </h2>

        <motion.div
          className="flex items-center justify-between p-3 hover:bg-purple-50 rounded-lg transition-colors mb-4"
          whileHover={{ x: 3 }}
        >
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
            <div className="w-11 h-6 bg-purple-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-blue-600"></div>
          </label>
        </motion.div>

        {/* <motion.div
          className="flex items-center justify-between p-3 hover:bg-purple-50 rounded-lg transition-colors"
          whileHover={{ x: 3 }}
        >
          <div>
            <p className="font-medium text-purple-900">High Performance Mode</p>
            <p className="text-sm text-purple-500">
              Reduce animations for better performance
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={performance}
              onChange={() => setPerformance(!performance)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-purple-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-blue-600"></div>
          </label>
        </motion.div> */}
      </motion.div>

      <UpdateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleUpdate}
        whatToUpdate={updateType}
      />
    </motion.div>
  );
};

export default Settings;

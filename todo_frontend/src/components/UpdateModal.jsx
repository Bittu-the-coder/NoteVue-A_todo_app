import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2,
    },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const UpdateModal = ({ isOpen, onClose, onSubmit, whatToUpdate }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add password validation if updating password
    if (
      whatToUpdate === "password" &&
      formData.password !== formData.confirmPassword
    ) {
      alert("Passwords don't match");
      return;
    }

    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <motion.div
            className={`fixed inset-0 ${
              isDarkMode ? "bg-gray-950/75" : "bg-black/50"
            } backdrop-blur-sm`}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          <motion.div
            className={`${
              isDarkMode ? "bg-gray-900" : "bg-white"
            } rounded-xl w-full max-w-md relative z-10`}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div
              className={`flex justify-between items-center p-4 border-b ${
                isDarkMode ? "border-gray-700" : "border-blue-100"
              }`}
            >
              <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                Update {whatToUpdate}
              </h3>
              <motion.button
                onClick={onClose}
                className={`${
                  isDarkMode
                    ? "text-gray-400 hover:text-gray-300 bg-gray-800 hover:bg-gray-700"
                    : "text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200"
                } rounded-full p-1.5 transition-colors`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={18} />
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              {whatToUpdate === "username" && (
                <div>
                  <label
                    className={`block text-sm font-medium ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    } mb-1`}
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className={`w-full border ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500"
                        : "bg-white border-gray-300 text-black focus:ring-blue-300"
                    } rounded-lg px-3 py-2 focus:ring-2 focus:border-transparent`}
                  />
                </div>
              )}

              {whatToUpdate === "email" && (
                <div>
                  <label
                    className={`block text-sm font-medium ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    } mb-1`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full border ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500"
                        : "bg-white border-gray-300 text-black focus:ring-blue-300"
                    } rounded-lg px-3 py-2 focus:ring-2 focus:border-transparent`}
                  />
                </div>
              )}

              {whatToUpdate === "password" && (
                <>
                  <div>
                    <label
                      className={`block text-sm font-medium ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      } mb-1`}
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className={`w-full border ${
                        isDarkMode
                          ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500"
                          : "bg-white border-gray-300 text-black focus:ring-blue-300"
                      } rounded-lg px-3 py-2 focus:ring-2 focus:border-transparent`}
                    />
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-medium ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      } mb-1`}
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className={`w-full border ${
                        isDarkMode
                          ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500"
                          : "bg-white border-gray-300 text-black focus:ring-blue-300"
                      } rounded-lg px-3 py-2 focus:ring-2 focus:border-transparent`}
                    />
                  </div>
                </>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <motion.button
                  type="button"
                  onClick={onClose}
                  className={`px-4 py-2 border ${
                    isDarkMode
                      ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  } rounded-lg`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Update
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default UpdateModal;

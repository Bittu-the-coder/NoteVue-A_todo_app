import React, { useState } from "react";
import {
  User,
  Edit,
  Mail,
  Calendar,
  Shield,
  Download,
  Trash2,
} from "lucide-react";
import { motion } from "framer-motion";
import { deleteAccount, getMe, updateProfile } from "../services/auth";
import UpdateModal from "../components/UpdateModal";
import DeleteModal from "../components/DeleteModal";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

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

const Profile = () => {
  const [userData, setUserData] = React.useState({
    username: "",
    email: "",
    bio: "Loading profile...",
    createdAt: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateType, setUpdateType] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigation = useNavigate();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getMe();
        setUserData(response);
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

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteAccount();
      navigation("/");
    } catch (error) {
      console.log("Error deleting account:", error);
    }
  };

  return (
    <motion.div
      className={`space-y-4 md:space-y-6 min-h-[85vh] px-2 md:px-0 ${
        isDarkMode ? "text-gray-200" : "text-gray-800"
      }`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <UpdateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleUpdate}
        whatToUpdate={updateType}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
      <motion.div variants={itemVariants} className="relative">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          Profile
        </h1>
        <div
          className={`absolute -left-4 top-0 w-1 h-full bg-gradient-to-b ${
            isDarkMode
              ? "from-blue-400 to-purple-400"
              : "from-blue-600 to-purple-600"
          } rounded-full`}
        />
      </motion.div>
      <motion.div
        className={`${
          isDarkMode
            ? "bg-gray-800/90 border-gray-700 text-gray-200"
            : "bg-white/80 border-blue-100 text-gray-800"
        } backdrop-blur-lg rounded-xl p-4 md:p-6 border shadow-lg relative overflow-hidden`}
        variants={itemVariants}
      >
        {/* Decorative corner elements */}
        <div
          className={`absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 ${
            isDarkMode ? "border-blue-500" : "border-blue-400"
          } rounded-tl-lg`}
        />
        <div
          className={`absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 ${
            isDarkMode ? "border-blue-500" : "border-blue-400"
          } rounded-tr-lg`}
        />
        <div
          className={`absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 ${
            isDarkMode ? "border-blue-500" : "border-blue-400"
          } rounded-bl-lg`}
        />
        <div
          className={`absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 ${
            isDarkMode ? "border-blue-500" : "border-blue-400"
          } rounded-br-lg`}
        />

        <div className="flex flex-col md:flex-row gap-6 items-center">
          <motion.div className="relative" whileHover={{ scale: 1.05 }}>
            <div
              className={`w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden ${
                isDarkMode
                  ? "ring-4 ring-blue-500/30 bg-gradient-to-br from-blue-400 to-purple-400"
                  : "ring-4 ring-blue-100 bg-gradient-to-br from-blue-500 to-purple-600"
              } flex items-center justify-center text-white text-3xl md:text-5xl font-bold shadow-inner`}
            >
              {userData.username?.charAt(0)?.toUpperCase()}
            </div>
          </motion.div>

          <div className="text-center md:text-left flex-1">
            <h2
              className={`text-lg md:text-2xl font-semibold ${
                isDarkMode ? "text-blue-300" : "text-blue-900"
              }`}
            >
              {userData.username}
            </h2>
            <p className={isDarkMode ? "text-blue-400" : "text-blue-500"}>
              {userData.email}
            </p>

            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
              <motion.button
                onClick={() => openModal("username")}
                className={`flex items-center gap-1 ${
                  isDarkMode
                    ? "text-blue-400 hover:text-blue-300 bg-blue-900/30 hover:bg-blue-900/50"
                    : "text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100"
                } px-3 py-1.5 rounded-lg text-sm transition-colors`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Edit size={16} />
                Edit Profile
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        className={`${
          isDarkMode
            ? "bg-gray-800/90 border-gray-700 text-gray-200"
            : "bg-white/80 border-indigo-100 text-gray-800"
        } backdrop-blur-lg rounded-xl p-4 md:p-6 border shadow-lg relative overflow-hidden`}
        variants={itemVariants}
      >
        {/* Decorative corner elements */}
        <div
          className={`absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 ${
            isDarkMode ? "border-indigo-500" : "border-indigo-400"
          } rounded-tl-lg`}
        />
        <div
          className={`absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 ${
            isDarkMode ? "border-indigo-500" : "border-indigo-400"
          } rounded-tr-lg`}
        />
        <div
          className={`absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 ${
            isDarkMode ? "border-indigo-500" : "border-indigo-400"
          } rounded-bl-lg`}
        />
        <div
          className={`absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 ${
            isDarkMode ? "border-indigo-500" : "border-indigo-400"
          } rounded-br-lg`}
        />

        <h2
          className={`text-lg font-semibold ${
            isDarkMode ? "text-indigo-300" : "text-indigo-800"
          } mb-4 flex items-center gap-2`}
        >
          <div
            className={`p-2 ${
              isDarkMode
                ? "bg-indigo-900/30 text-indigo-400"
                : "bg-indigo-100 text-indigo-600"
            } rounded-lg`}
          >
            <User className="w-4 h-4 md:w-5 md:h-5" />
          </div>
          Personal Information
        </h2>

        <div className="space-y-4">
          <motion.div
            className={`flex flex-col md:flex-row md:items-center gap-3 p-3 ${
              isDarkMode
                ? "border-b border-gray-700 hover:bg-gray-700/30"
                : "border-b border-indigo-100 hover:bg-indigo-50"
            } rounded-lg transition-colors`}
            whileHover={{ x: 3 }}
          >
            <div
              className={`p-2 ${
                isDarkMode
                  ? "bg-indigo-900/30 text-indigo-400"
                  : "bg-indigo-100 text-indigo-600"
              } rounded-full md:hidden`}
            >
              <Mail className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className={isDarkMode ? "text-indigo-400" : "text-indigo-500"}>
                Email
              </p>
              <p
                className={`font-medium ${
                  isDarkMode ? "text-indigo-200" : "text-indigo-900"
                } break-all`}
              >
                {userData.email}
              </p>
            </div>
            <motion.button
              onClick={() => openModal("email")}
              className={`${
                isDarkMode
                  ? "text-indigo-400 hover:text-indigo-300 bg-indigo-900/30 hover:bg-indigo-900/50"
                  : "text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100"
              } p-2 rounded-lg self-end md:self-auto transition-colors`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Edit size={16} />
            </motion.button>
          </motion.div>

          <motion.div
            className={`flex flex-col md:flex-row md:items-center gap-3 p-3 ${
              isDarkMode
                ? "border-b border-gray-700 hover:bg-gray-700/30"
                : "border-b border-indigo-100 hover:bg-indigo-50"
            } rounded-lg transition-colors`}
            whileHover={{ x: 3 }}
          >
            <div
              className={`p-2 ${
                isDarkMode
                  ? "bg-indigo-900/30 text-indigo-400"
                  : "bg-indigo-100 text-indigo-600"
              } rounded-full md:hidden`}
            >
              <Calendar className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className={isDarkMode ? "text-indigo-400" : "text-indigo-500"}>
                Member Since
              </p>
              <p
                className={`font-medium ${
                  isDarkMode ? "text-indigo-200" : "text-indigo-900"
                }`}
              >
                {userData.createdAt
                  ? new Date(userData.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : ""}
              </p>
            </div>
          </motion.div>
        </div>
        {/* Danger Zone Card */}
        <motion.div
          variants={itemVariants}
          className={`${
            isDarkMode
              ? "bg-red-900/20 border-red-800/50"
              : "bg-red-50 border-red-200"
          } backdrop-blur-lg mt-4 rounded-xl p-4 md:p-6 shadow-lg border relative overflow-hidden`}
        >
          {/* Decorative corner elements */}
          <div
            className={`absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 ${
              isDarkMode ? "border-red-700" : "border-red-400"
            } rounded-tl-lg hidden sm:block`}
          />
          <div
            className={`absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 ${
              isDarkMode ? "border-red-700" : "border-red-400"
            } rounded-tr-lg hidden sm:block`}
          />
          <div
            className={`absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 ${
              isDarkMode ? "border-red-700" : "border-red-400"
            } rounded-bl-lg hidden sm:block`}
          />
          <div
            className={`absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 ${
              isDarkMode ? "border-red-700" : "border-red-400"
            } rounded-br-lg hidden sm:block`}
          />

          <div className="flex items-start gap-4">
            <div
              className={`p-2 ${
                isDarkMode
                  ? "bg-red-900/50 text-red-300"
                  : "bg-red-100 text-red-600"
              } rounded-lg flex-shrink-0`}
            >
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2
                className={`text-lg font-semibold ${
                  isDarkMode ? "text-red-300" : "text-red-800"
                }`}
              >
                Danger Zone
              </h2>
              <p
                className={`${
                  isDarkMode ? "text-red-400" : "text-red-600"
                } mt-1 mb-4 text-sm`}
              >
                Deleting your account is a permanent action. All your data will
                be lost and cannot be recovered.
              </p>
              <motion.button
                onClick={handleDeleteClick}
                className={`flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 ${
                  isDarkMode
                    ? "bg-gradient-to-r from-red-800 to-red-900 hover:from-red-700 hover:to-red-800 text-red-100"
                    : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white"
                } font-medium rounded-lg shadow-md transition-all`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Trash2 size={16} />
                Delete My Account
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Profile;

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
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="relative" variants={itemVariants}>
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          My Profile
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
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <motion.div className="relative" whileHover={{ scale: 1.05 }}>
            <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-blue-100 shadow-inner bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-5xl font-bold">
              {userData.username
                ? userData.username.charAt(0).toUpperCase()
                : ""}
            </div>
            <motion.button
              className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-1.5 rounded-full shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Edit size={14} />
            </motion.button>
          </motion.div>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-blue-900">
                  {userData.username}
                </h2>
                <p className="text-blue-600">
                  {userData.createdAt
                    ? new Date(userData.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : ""}
                </p>
              </div>
              <motion.button
                onClick={() => openModal("username")}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Edit size={16} />
                Edit
              </motion.button>
            </div>

            {/* <p className="mt-3 text-blue-800">
              {userData.bio || "Hello this is me."}
            </p> */}
          </div>
        </div>
      </motion.div>

      <motion.div
        className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-indigo-100 shadow-lg relative overflow-hidden"
        variants={itemVariants}
      >
        {/* Decorative corner elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-indigo-400 rounded-tl-lg" />
        <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-indigo-400 rounded-tr-lg" />
        <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-indigo-400 rounded-bl-lg" />
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-indigo-400 rounded-br-lg" />

        <h2 className="text-lg font-semibold text-indigo-800 mb-4 flex items-center gap-2">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <User className="text-indigo-600 w-5 h-5" />
          </div>
          Personal Information
        </h2>

        <div className="space-y-4">
          <motion.div
            className="flex items-center gap-3 p-3 border-b border-indigo-100 hover:bg-indigo-50 rounded-lg transition-colors"
            whileHover={{ x: 3 }}
          >
            <div className="p-2 bg-indigo-100 rounded-full">
              <Mail className="text-indigo-600 w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-indigo-500">Email</p>
              <p className="font-medium text-indigo-900">{userData.email}</p>
            </div>
            <motion.button
              onClick={() => openModal("email")}
              className="text-indigo-600 hover:text-indigo-800 bg-indigo-50 p-2 rounded-lg hover:bg-indigo-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Edit size={16} />
            </motion.button>
          </motion.div>

          <motion.div
            className="flex items-center gap-3 p-3 border-b border-indigo-100 hover:bg-indigo-50 rounded-lg transition-colors"
            whileHover={{ x: 3 }}
          >
            <div className="p-2 bg-indigo-100 rounded-full">
              <Calendar className="text-indigo-600 w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-indigo-500">Member Since</p>
              <p className="font-medium text-indigo-900">
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
      </motion.div>

      <motion.div
        className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-purple-100 shadow-lg relative overflow-hidden"
        variants={itemVariants}
      >
        {/* Decorative corner elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-purple-400 rounded-tl-lg" />
        <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-purple-400 rounded-tr-lg" />
        <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-purple-400 rounded-bl-lg" />
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-purple-400 rounded-br-lg" />

        <h2 className="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Shield className="text-purple-600 w-5 h-5" />
          </div>
          Account Actions
        </h2>

        <div className="space-y-2">
          <motion.button
            onClick={() => openModal("password")}
            className="w-full text-left p-3 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-3"
            whileHover={{ x: 3, backgroundColor: "rgba(79, 70, 229, 0.1)" }}
          >
            <Shield className="w-5 h-5" />
            Change Password
          </motion.button>
          <motion.button
            className="w-full text-left p-3 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-3"
            whileHover={{ x: 3, backgroundColor: "rgba(79, 70, 229, 0.1)" }}
          >
            <Download className="w-5 h-5" />
            Download My Data
          </motion.button>
          <motion.button
            onClick={handleDeleteClick}
            className="w-full text-left p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-3"
            whileHover={{ x: 3, backgroundColor: "rgba(239, 68, 68, 0.1)" }}
          >
            <Trash2 className="w-5 h-5" />
            Delete Account
          </motion.button>
        </div>
      </motion.div>

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
    </motion.div>
  );
};

export default Profile;

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Layout,
  FileText,
  Settings,
  Plus,
  Tag,
  LogOut,
  Sparkles,
  Clock,
  Calendar,
  Edit,
  X,
  CircleCheckBig,
  CalendarCheck2,
} from "lucide-react";
import { motion } from "framer-motion";
import AddListModal from "./AddList";
import AddTagModal from "./AddTag";
import { useEffect } from "react";
import { getMe } from "../services/auth";
import { getTags, deleteTag } from "../services/tags";
import { getLists, addList, deleteList, updateList } from "../services/lists";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

const floatingAnimation = {
  animate: {
    y: [0, -5, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigation = useNavigate();
  const [showListModal, setShowListModal] = useState(false);
  const [showTagModal, setShowTagModal] = useState(false);
  const [userData, setUserData] = React.useState({
    username: "",
    email: "",
  });
  const [tags, setTags] = useState([]);
  const [editingList, setEditingList] = useState(null);

  useEffect(() => {
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
  const handleAddList = async (listData) => {
    try {
      // If editing an existing list
      if (listData._id) {
        const updatedList = await updateList(listData._id, listData);
        setLists((prevLists) =>
          prevLists.map((list) =>
            list._id === listData._id ? updatedList : list
          )
        );
      } else {
        // Creating a new list
        // console.log("Adding list:", listData);
        const newList = await addList(listData);
        setLists((prevLists) => [...prevLists, newList]);
      }

      setShowListModal(false);
      setEditingList(null);
    } catch (error) {
      console.error("Error adding/updating list:", error);
    }
  };
  const handleDeleteList = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await deleteList(id);
      setLists((prevLists) => prevLists.filter((list) => list._id !== id));
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };
  const handleEditList = (list, e) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingList(list);
    setShowListModal(true);
  };

  const handleAddTag = (tagData) => {
    // console.log("Adding tag:", tagData);
    setTags((prevTags) => [...prevTags, tagData]);
  };
  const handleDeleteTag = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await deleteTag(id);
      setTags((prevTags) => prevTags.filter((tag) => tag._id !== id));
    } catch (error) {
      console.error("Error deleting tag:", error);
    }
  };

  const navItems = [
    {
      icon: <Layout className="w-5 h-5" />,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: <CalendarCheck2 className="w-5 h-5" />,
      label: "AllTasks",
      path: "/all-tasks",
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: "Upcoming",
      path: "/upcoming",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: "Today",
      path: "/today",
    },
    {
      icon: <CircleCheckBig className="w-5 h-5" />,
      label: "Completed",
      path: "/completed",
    },

    {
      icon: <FileText className="w-5 h-5" />,
      label: "Sticky Wall",
      path: "/sticky-wall",
    },
  ];
  const [lists, setLists] = useState([]);
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await getTags();
        // console.log("Fetched tags:", response);
        setTags(response);
      } catch (error) {
        console.error("Error fetching tags:", error);
        // Set default tags as fallback if API fails
        setTags([
          { _id: "default-1", name: "Work" },
          { _id: "default-2", name: "Personal" },
          { _id: "default-3", name: "Urgent" },
        ]);
      }
    };
    fetchTags();
  }, []);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await getLists();
        // console.log("Fetched lists:", response);
        setLists(response);
      } catch (error) {
        console.error("Error fetching lists:", error);
        // Set default lists as fallback if API fails
        setLists([
          { _id: "default-1", name: "Personal", taskCount: 7 },
          { _id: "default-2", name: "Work", taskCount: 8 },
          { _id: "default-3", name: "Shopping", taskCount: 0 },
        ]);
      }
    };
    fetchLists();
  }, []);

  return (
    <motion.aside
      className="w-64 h-full flex flex-col bg-white/80 backdrop-blur-lg border-r border-indigo-100 shadow-lg"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Logo and Hamburger */}
      <motion.div
        className="p-6 border-b border-indigo-100"
        variants={itemVariants}
      >
        <motion.div
          variants={floatingAnimation}
          animate="animate"
          className="flex items-center justify-between"
        >
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              NoteVue
            </h2>
            <p className="text-xs text-indigo-400/80">Productivity Suite</p>
          </div>
          <button className="p-2 bg-indigo-50 rounded-lg text-indigo-500 hover:bg-indigo-100 transition-colors md:hidden">
            <Layout className="w-5 h-5" />
          </button>
        </motion.div>
      </motion.div>
      {/* modal component */}{" "}
      <AddListModal
        isOpen={showListModal}
        onClose={() => setShowListModal(false)}
        onSubmit={handleAddList}
        editingList={editingList}
      />
      <AddTagModal
        isOpen={showTagModal}
        onClose={() => setShowTagModal(false)}
        onSubmit={handleAddTag}
      />
      {/* Main Navigation */}
      <motion.nav
        className="flex-1 overflow-y-auto px-3 py-6 space-y-8"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <motion.li
                key={item.path}
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    pathname === item.path
                      ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-indigo-700 border border-indigo-100 shadow-sm"
                      : "text-gray-600 hover:bg-indigo-50/50 hover:text-indigo-600"
                  }`}
                >
                  <span
                    className={
                      pathname === item.path
                        ? "text-indigo-600"
                        : "text-gray-500"
                    }
                  >
                    {item.icon}
                  </span>
                  {item.label}
                  {pathname === item.path && (
                    <div className="ml-auto w-1.5 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full" />
                  )}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Lists Section */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between px-4 mb-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Lists
            </h3>
            <div className="h-px flex-1 bg-indigo-100 mx-2"></div>
            <motion.button
              onClick={() => {
                setEditingList(null);
                setShowListModal(true);
              }}
              className="p-1 rounded-md text-indigo-600 hover:bg-indigo-50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          </div>{" "}
          <ul className="space-y-1">
            {lists.map((list) => (
              <motion.li
                key={list._id}
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a
                  href="#"
                  className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-indigo-50/50 hover:text-indigo-600 transition-all duration-200 group"
                  style={{ borderLeft: `3px solid ${list.color || "#8B5CF6"}` }}
                >
                  <span>{list.name}</span>
                  <div className="flex items-center">
                    {list.taskCount > 0 && (
                      <span className="text-xs bg-gradient-to-r from-blue-100 to-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full mr-2">
                        {list.taskCount}
                      </span>
                    )}
                    <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => handleEditList(list, e)}
                        className="p-1 text-gray-500 hover:text-indigo-600"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleDeleteList(list._id, e)}
                        className="p-1 text-gray-500 hover:text-red-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </a>
              </motion.li>
            ))}
            <motion.li
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <button
                onClick={() => {
                  setEditingList(null);
                  setShowListModal(true);
                }}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-indigo-600 hover:bg-indigo-50/50 w-full transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
                Add new list
              </button>
            </motion.li>
          </ul>
        </motion.div>

        {/* Tags Section */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center px-4 mb-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Tags
            </h3>
            <div className="h-px flex-1 bg-indigo-100 mx-2"></div>
          </div>{" "}
          <div className="flex flex-wrap gap-2 px-4">
            {tags.map((tag) => (
              <motion.span
                key={tag._id}
                className="text-xs bg-gradient-to-r from-purple-50 to-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full flex items-center gap-1 border border-indigo-100 group"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 2px 5px rgba(79, 70, 229, 0.1)",
                }}
              >
                <Tag className="w-3 h-3" />
                {tag.name}
                <button
                  onClick={(e) => handleDeleteTag(tag._id, e)}
                  className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.span>
            ))}
          </div>
          <button
            onClick={() => setShowTagModal(true)}
            className="flex items-center gap-3 mt-2 px-4 py-2.5 rounded-xl text-sm font-medium text-indigo-600 hover:bg-indigo-50/50 w-full transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            Add new Tag
          </button>
        </motion.div>
      </motion.nav>
      {/* Settings & Account */}
      <motion.div
        className="p-3 border-t border-indigo-100 space-y-1"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <Link
            to="/settings"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              pathname === "/settings"
                ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-indigo-700 border border-indigo-100 shadow-sm"
                : "text-gray-600 hover:bg-indigo-50/50 hover:text-indigo-600"
            }`}
          >
            <Settings
              className={
                pathname === "/settings"
                  ? "w-5 h-5 text-indigo-600"
                  : "w-5 h-5 text-gray-500"
              }
            />
            Settings
          </Link>
        </motion.div>

        <motion.button
          onClick={() => navigation("/login")}
          className="flex w-full items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50/50 transition-all duration-200"
          variants={itemVariants}
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </motion.button>

        {/* Account Section */}
        <motion.button
          className="mt-3 w-full"
          onClick={() => navigation("/profile")}
          variants={itemVariants}
          whileHover={{ y: -2 }}
        >
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r from-blue-50 to-indigo-50 border border-transparent hover:border-indigo-100 transition-all duration-200">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm shadow-md">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex flex-col items-start">
              <p className="text-sm font-medium text-indigo-900">
                {userData.username}
              </p>
              <p className="text-xs text-indigo-400">{userData.email}</p>
            </div>
          </div>
        </motion.button>
      </motion.div>
    </motion.aside>
  );
};

export default Sidebar;

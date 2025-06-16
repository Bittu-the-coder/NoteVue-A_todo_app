// import React, { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   FiLayout,
//   FiCheckSquare,
//   FiFileText,
//   FiSettings,
//   FiPlus,
//   FiTag,
//   FiLogOut,
// } from "react-icons/fi";
// import { RxHamburgerMenu } from "react-icons/rx";
// import AddListModal from "./AddList";

// const Sidebar = () => {
//   const { pathname } = useLocation();
//   const navigation = useNavigate();
//   const [showListModal, setShowListModal] = useState(false);

//   const handleAddList = (listData) => {
//     console.log("Adding list:", listData);
//     // Call your API here
//   };

//   const navItems = [
//     {
//       icon: <FiLayout className="w-5 h-5" />,
//       label: "Dashboard",
//       path: "/dashboard",
//     },
//     {
//       icon: <FiCheckSquare className="w-5 h-5" />,
//       label: "Upcoming",
//       path: "/upcoming",
//     },
//     {
//       icon: <FiCheckSquare className="w-5 h-5" />,
//       label: "Today",
//       path: "/today",
//     },
//     {
//       icon: <FiFileText className="w-5 h-5" />,
//       label: "Sticky Wall",
//       path: "/sticky-wall",
//     },
//   ];

//   const lists = [
//     { name: "Personal", count: 7 },
//     { name: "Work", count: 8 },
//     { name: "Shopping", count: 0 },
//   ];

//   const tags = ["Urgent", "Important", "Later"];

//   return (
//     <aside className="w-64 bg-white/80 backdrop-blur-lg border-r border-purple-100 p-6 h-full flex flex-col">
//       {/* Logo and Hamburger */}
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//             NoteVue
//           </h2>
//           <p className="text-xs text-purple-400/80">Productivity Suite</p>
//         </div>
//         <button className="text-purple-500 hover:text-purple-700 md:hidden">
//           <RxHamburgerMenu className="w-6 h-6" />
//         </button>
//       </div>

//       {/* modal component */}
//       <AddListModal
//         isOpen={showListModal}
//         onClose={() => setShowListModal(false)}
//         onSubmit={handleAddList}
//       />

//       {/* Main Navigation */}
//       <nav className="flex-1 overflow-y-auto">
//         <ul className="space-y-1">
//           {navItems.map((item) => (
//             <li key={item.path}>
//               <Link
//                 to={item.path}
//                 className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                   pathname === item.path
//                     ? "bg-purple-50 text-purple-700"
//                     : "text-gray-600 hover:bg-purple-50/50 hover:text-purple-600"
//                 }`}
//               >
//                 {item.icon}
//                 {item.label}
//               </Link>
//             </li>
//           ))}
//         </ul>

//         {/* Lists Section */}
//         <div className="mt-8">
//           <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">
//             Lists
//           </h3>
//           <ul className="space-y-1">
//             {lists.map((list) => (
//               <li key={list.name}>
//                 <a
//                   href="#"
//                   className="flex items-center justify-between gap-3 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-purple-50/50 hover:text-purple-600 transition-colors"
//                 >
//                   <span>{list.name}</span>
//                   <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">
//                     {list.count}
//                   </span>
//                 </a>
//               </li>
//             ))}
//             <li>
//               <button
//                 onClick={() => setShowListModal(true)}
//                 className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-purple-600 hover:bg-purple-50/50 w-full transition-colors"
//               >
//                 <FiPlus className="w-4 h-4" />
//                 Add new list
//               </button>
//             </li>
//           </ul>
//         </div>

//         {/* Tags Section */}
//         <div className="mt-6">
//           <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">
//             Tags
//           </h3>
//           <div className="flex flex-wrap gap-2 px-4">
//             {tags.map((tag) => (
//               <span
//                 key={tag}
//                 className="text-xs bg-purple-50 text-purple-600 px-3 py-1 rounded-full flex items-center gap-1"
//               >
//                 <FiTag className="w-3 h-3" />
//                 {tag}
//               </span>
//             ))}
//           </div>
//         </div>
//       </nav>

//       {/* Settings */}
//       <div className="mt-auto pt-4">
//         <Link
//           to="/settings"
//           className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//             pathname === "/settings"
//               ? "bg-purple-50 text-purple-700"
//               : "text-gray-600 hover:bg-purple-50/50 hover:text-purple-600"
//           }`}
//         >
//           <FiSettings className="w-5 h-5" />
//           Settings
//         </Link>
//         <button
//           onClick={navigation.bind(null, "/login")}
//           className="flex items-center gap-3 p-3 rounded-lg text-purple-900 hover:bg-purple-50 transition-colors w-full cursor-pointer"
//         >
//           <FiLogOut className="text-purple-600" />
//           <span>Sign Out</span>
//         </button>
//       </div>

//       {/* Account Section */}
//       <button className="cursor-pointer" onClick={() => navigation("/profile")}>
//         <div className="mt-auto border-t border-purple-100">
//           <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer">
//             <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center justify-center text-white text-sm">
//               JD
//             </div>
//             <div className="flex flex-col items-start">
//               <p className="text-sm font-medium text-purple-900">John Doe</p>
//               <p className="text-xs text-purple-400">john@example.com</p>
//             </div>
//           </div>
//         </div>
//       </button>
//     </aside>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Layout,
  CheckSquare,
  FileText,
  Settings,
  Plus,
  Tag,
  LogOut,
  Sparkles,
  Clock,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";
import AddListModal from "./AddList";
import AddTagModal from "./AddTag";
import { useEffect } from "react";
import { getMe } from "../services/auth";

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getMe();
        setUserData(response);
        console.log("userData:", response);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleAddList = (listData) => {
    console.log("Adding list:", listData);
    // Call your API here
  };

  const handleAddTag = (tagData) => {
    console.log("Adding tag:", tagData);
    // Call your API here
  };

  const navItems = [
    {
      icon: <Layout className="w-5 h-5" />,
      label: "Dashboard",
      path: "/dashboard",
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
      icon: <FileText className="w-5 h-5" />,
      label: "Sticky Wall",
      path: "/sticky-wall",
    },
  ];

  const lists = [
    { name: "Personal", count: 7 },
    { name: "Work", count: 8 },
    { name: "Shopping", count: 0 },
  ];

  const tags = ["Urgent", "Important", "Later"];

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

      {/* modal component */}
      <AddListModal
        isOpen={showListModal}
        onClose={() => setShowListModal(false)}
        onSubmit={handleAddList}
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
              onClick={() => setShowListModal(true)}
              className="p-1 rounded-md text-indigo-600 hover:bg-indigo-50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          </div>
          <ul className="space-y-1">
            {lists.map((list) => (
              <motion.li
                key={list.name}
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a
                  href="#"
                  className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-indigo-50/50 hover:text-indigo-600 transition-all duration-200"
                >
                  <span>{list.name}</span>
                  {list.count > 0 && (
                    <span className="text-xs bg-gradient-to-r from-blue-100 to-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full">
                      {list.count}
                    </span>
                  )}
                </a>
              </motion.li>
            ))}
            <motion.li
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <button
                onClick={() => setShowListModal(true)}
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
          </div>
          <div className="flex flex-wrap gap-2 px-4">
            {tags.map((tag) => (
              <motion.span
                key={tag}
                className="text-xs bg-gradient-to-r from-purple-50 to-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full flex items-center gap-1 border border-indigo-100"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 2px 5px rgba(79, 70, 229, 0.1)",
                }}
              >
                <Tag className="w-3 h-3" />
                {tag}
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

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiLayout,
  FiCheckSquare,
  FiFileText,
  FiSettings,
  FiPlus,
  FiTag,
  FiLogOut,
} from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import AddListModal from "./AddList";

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigation = useNavigate();
  const [showListModal, setShowListModal] = useState(false);

  const handleAddList = (listData) => {
    console.log("Adding list:", listData);
    // Call your API here
  };

  const navItems = [
    {
      icon: <FiLayout className="w-5 h-5" />,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: <FiCheckSquare className="w-5 h-5" />,
      label: "Upcoming",
      path: "/upcoming",
    },
    {
      icon: <FiCheckSquare className="w-5 h-5" />,
      label: "Today",
      path: "/today",
    },
    {
      icon: <FiFileText className="w-5 h-5" />,
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
    <aside className="w-64 bg-white/80 backdrop-blur-lg border-r border-purple-100 p-6 h-full flex flex-col">
      {/* Logo and Hamburger */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            NoteVue
          </h2>
          <p className="text-xs text-purple-400/80">Productivity Suite</p>
        </div>
        <button className="text-purple-500 hover:text-purple-700 md:hidden">
          <RxHamburgerMenu className="w-6 h-6" />
        </button>
      </div>

      {/* modal component */}
      <AddListModal
        isOpen={showListModal}
        onClose={() => setShowListModal(false)}
        onSubmit={handleAddList}
      />

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === item.path
                    ? "bg-purple-50 text-purple-700"
                    : "text-gray-600 hover:bg-purple-50/50 hover:text-purple-600"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Lists Section */}
        <div className="mt-8">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">
            Lists
          </h3>
          <ul className="space-y-1">
            {lists.map((list) => (
              <li key={list.name}>
                <a
                  href="#"
                  className="flex items-center justify-between gap-3 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-purple-50/50 hover:text-purple-600 transition-colors"
                >
                  <span>{list.name}</span>
                  <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">
                    {list.count}
                  </span>
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={() => setShowListModal(true)}
                className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-purple-600 hover:bg-purple-50/50 w-full transition-colors"
              >
                <FiPlus className="w-4 h-4" />
                Add new list
              </button>
            </li>
          </ul>
        </div>

        {/* Tags Section */}
        <div className="mt-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2 px-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-purple-50 text-purple-600 px-3 py-1 rounded-full flex items-center gap-1"
              >
                <FiTag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </nav>

      {/* Settings */}
      <div className="mt-auto pt-4">
        <Link
          to="/settings"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            pathname === "/settings"
              ? "bg-purple-50 text-purple-700"
              : "text-gray-600 hover:bg-purple-50/50 hover:text-purple-600"
          }`}
        >
          <FiSettings className="w-5 h-5" />
          Settings
        </Link>
        <button
          onClick={navigation.bind(null, "/login")}
          className="flex items-center gap-3 p-3 rounded-lg text-purple-900 hover:bg-purple-50 transition-colors w-full cursor-pointer"
        >
          <FiLogOut className="text-purple-600" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Account Section */}
      <button className="cursor-pointer" onClick={() => navigation("/profile")}>
        <div className="mt-auto border-t border-purple-100">
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center justify-center text-white text-sm">
              JD
            </div>
            <div className="flex flex-col items-start">
              <p className="text-sm font-medium text-purple-900">John Doe</p>
              <p className="text-xs text-purple-400">john@example.com</p>
            </div>
          </div>
        </div>
      </button>
    </aside>
  );
};

export default Sidebar;

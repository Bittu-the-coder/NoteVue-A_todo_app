import React, { useState, useEffect } from "react";
import { Edit, Plus, Sparkles, NotebookPen } from "lucide-react";
import { motion } from "framer-motion";
import { getMe } from "../services/auth";
import AddTaskModal from "../components/AddTask";
import AddNoteModal from "../components/AddNote";
import { useTaskContext } from "../contexts/TaskContext";
import { useNotesContext } from "../contexts/NoteContext";
import { useTheme } from "../contexts/ThemeContext";
import DOMPurify from "dompurify";
import StatsMotivationCard from "../components/ProgressCard";
import QuickNotesCard from "../components/QuickNotesCard";
import TodayTasksCard from "../components/TodayTasksCard";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

const rotatingAnimation = {
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

const floatingAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const Dashboard = () => {
  const [userData, setUserData] = React.useState({
    username: "",
  });
  const [todaysTasks, setTodaysTasks] = useState([]);
  const { getTodayTasks } = useTaskContext();
  const { notes } = useNotesContext();
  // console.log("Notes in Dashboard:", notes);

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
    // Load today's tasks when component mounts
    const tasks = getTodayTasks();
    setTodaysTasks(tasks);

    fetchUserData();
  }, [getTodayTasks, notes]);

  const [quote, setQuote] = useState({
    content: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  });
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);

  const recentNotes = notes;

  // Fetch quote (simulated)
  useEffect(() => {
    // Simulate quote fetch with timeout
    const timer = setTimeout(() => {
      setQuote({
        content:
          "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt",
      });
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  // Background Decorative Elements
  const BackgroundElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Rotating Diamonds */}
      <motion.div
        variants={rotatingAnimation}
        animate="animate"
        className="absolute -top-20 -left-20 hidden md:block"
      >
        <div
          className={`w-32 h-32 ${
            isDarkMode ? "bg-blue-600" : "bg-blue-400"
          } opacity-5 rounded-md transform rotate-45`}
        />
      </motion.div>

      <motion.div
        variants={rotatingAnimation}
        animate="animate"
        className="absolute top-1/4 right-10 hidden lg:block"
      >
        <div
          className={`w-24 h-24 ${
            isDarkMode ? "bg-purple-600" : "bg-purple-500"
          } opacity-5 rounded-md transform rotate-45`}
        />
      </motion.div>

      <motion.div
        variants={rotatingAnimation}
        animate="animate"
        className="absolute bottom-20 left-1/4 hidden md:block"
      >
        <div
          className={`w-16 h-16 ${
            isDarkMode ? "bg-indigo-600" : "bg-indigo-400"
          } opacity-10 rounded-md transform rotate-45`}
        />
      </motion.div>

      {/* Background Circles */}
      <div
        className={`fixed -bottom-40 -right-20 w-96 h-96 ${
          isDarkMode ? "bg-red-600" : "bg-red-400"
        } rounded-full opacity-5 hidden md:block`}
      />

      <motion.div
        variants={rotatingAnimation}
        animate="animate"
        className="fixed top-14 -left-10 md:right-40"
      >
        <div
          className={`w-32 h-32 border-4 ${
            isDarkMode ? "border-blue-500" : "border-blue-200"
          } rounded-full opacity-10`}
        />
      </motion.div>

      {/* Pattern overlay */}
      <div
        className={`absolute inset-0 ${
          isDarkMode
            ? "bg-gradient-to-br from-gray-900/50 via-gray-800/0 to-indigo-900/30"
            : "bg-gradient-to-br from-blue-50/50 via-white/0 to-purple-50/50"
        } opacity-80`}
      />
    </div>
  );
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <div
      className={`relative min-h-screen ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-blue-50 via-white to-pink-50"
      } overflow-hidden`}
    >
      <BackgroundElements />

      {/* Modal components */}
      <AddTaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
      />

      <AddNoteModal
        isOpen={showNoteModal}
        onClose={() => setShowNoteModal(false)}
      />

      <motion.div
        className="container mx-auto max-w-7xl px-4 py-6 md:py-8 space-y-6 relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Welcome Header */}{" "}
        <motion.div
          className={`${
            isDarkMode
              ? "bg-gray-800/90 backdrop-blur-lg border-gray-700 text-white"
              : "bg-white/80 backdrop-blur-lg border-blue-100"
          } rounded-2xl p-4 md:p-6 border shadow-lg relative overflow-hidden`}
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <div className="relative z-10">
            {/* Welcome Badge */}
            <motion.div
              variants={floatingAnimation}
              animate="animate"
              className={`inline-flex items-center gap-2 ${
                isDarkMode
                  ? "bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border-blue-800"
                  : "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100"
              } px-3 md:px-4 py-2 rounded-full border mb-4 md:mb-6 shadow-sm`}
            >
              <Sparkles
                className={`w-4 h-4 ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                }`}
              />
              <span
                className={`text-sm font-medium ${
                  isDarkMode ? "text-blue-300" : "text-blue-900"
                }`}
              >
                Welcome back
              </span>
            </motion.div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
              <div className="relative">
                {" "}
                <motion.h1
                  className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {userData.username.split(" ")[0]}'s Dashboard
                </motion.h1>
                <motion.p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  } mt-2`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Tuesday, April 22, 2025 • Let's be productive today!
                </motion.p>
                <div
                  className={`absolute -left-4 top-0 w-1 h-full bg-gradient-to-b ${
                    isDarkMode
                      ? "from-blue-500 to-purple-500"
                      : "from-blue-600 to-purple-600"
                  } rounded-full`}
                />
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-3 md:gap-4"
              >
                <motion.button
                  onClick={() => setShowTaskModal(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white px-4 py-2 md:px-5 md:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm md:text-base w-full md:w-auto justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus className="w-4 h-4 md:w-5 md:h-5" />
                  Add New Task
                </motion.button>{" "}
                <motion.button
                  onClick={() => setShowNoteModal(true)}
                  className={`flex items-center gap-2 ${
                    isDarkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
                      : "bg-white hover:bg-gray-50 text-gray-900 border-gray-200"
                  } px-4 py-2 md:px-5 md:py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border text-sm md:text-base w-full md:w-auto justify-center`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NotebookPen className="w-4 h-4 md:w-5 md:h-5" />
                  New Note
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -bottom-6 -right-6 w-24 md:w-32 h-24 md:h-32 bg-purple-200 rounded-full opacity-20" />
          <div className="absolute top-10 right-20 w-12 md:w-16 h-12 md:h-16 bg-blue-200 rounded-full opacity-30 hidden md:block" />
        </motion.div>
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Tasks Section */}
          <TodayTasksCard />

          {/* Stats & Motivation Section */}
          <StatsMotivationCard quote={quote} />

          {/* Quick Notes Section */}
          <QuickNotesCard
            recentNotes={recentNotes}
            onAddNote={() => setShowNoteModal(true)}
            showEmptyState={true}
          />
        </div>
        {/* Bottom Action Buttons (Mobile) */}
        <div className="fixed bottom-6 right-6 flex gap-3 z-20 md:hidden">
          <motion.button
            onClick={() => setShowTaskModal(true)}
            className="p-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full shadow-lg"
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)",
            }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Plus size={22} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;

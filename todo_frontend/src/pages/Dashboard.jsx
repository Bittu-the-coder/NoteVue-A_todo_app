import React, { useState, useEffect } from "react";
import {
  Check,
  Clock,
  Flag,
  Edit,
  Plus,
  Sparkles,
  ArrowRight,
  BarChart3,
  LucideCalendarClock,
  NotebookPen,
} from "lucide-react";
import { motion } from "framer-motion";
import { getMe } from "../services/auth";
import AddTaskModal from "../components/AddTask";
import AddNoteModal from "../components/AddNote";
import { useNavigate } from "react-router-dom";
import { useTaskContext } from "../contexts/TaskContext";

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
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getTodayTasks, toggleTaskComplete } = useTaskContext();

  const navigate = useNavigate();

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
  }, [getTodayTasks]);

  const [quote, setQuote] = useState({
    content: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  });
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);

  const handleAddNote = (noteData) => {
    console.log("Adding note:", noteData);
    // Call your API here
  };

  const handleToggleComplete = (taskId) => {
    console.log("Toggling task completion for ID:", taskId);
    toggleTaskComplete(taskId);
    setTodaysTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Sample notes data
  const recentNotes = [
    {
      id: 1,
      content:
        "Ideas for the new marketing campaign: focus on sustainability, target Gen Z audience, use Instagram and TikTok for promotion.",
      updatedAt: "2 hours ago",
      color: "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100",
    },
    {
      id: 2,
      content:
        "Meeting notes with design team regarding new product interface. Key points: simplified navigation, dark mode support, accessibility improvements.",
      updatedAt: "Yesterday",
      color: "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-100",
    },
  ];

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
        <div className="w-32 h-32 bg-blue-400 opacity-5 rounded-md transform rotate-45" />
      </motion.div>

      <motion.div
        variants={rotatingAnimation}
        animate="animate"
        className="absolute top-1/4 right-10 hidden lg:block"
      >
        <div className="w-24 h-24 bg-purple-500 opacity-5 rounded-md transform rotate-45" />
      </motion.div>

      <motion.div
        variants={rotatingAnimation}
        animate="animate"
        className="absolute bottom-20 left-1/4 hidden md:block"
      >
        <div className="w-16 h-16 bg-indigo-400 opacity-10 rounded-md transform rotate-45" />
      </motion.div>

      {/* Background Circles */}
      <div className="fixed -bottom-40 -right-20 w-96 h-96 bg-red-400 rounded-full opacity-5 hidden md:block" />

      <motion.div
        variants={rotatingAnimation}
        animate="animate"
        className="fixed top-14 -left-10 md:right-40"
      >
        <div className="w-32 h-32 border-4 border-blue-200 rounded-full opacity-10" />
      </motion.div>

      {/* Pattern overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/0 to-purple-50/50 opacity-80" />
    </div>
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 overflow-hidden">
      <BackgroundElements />

      {/* Modal components */}
      <AddTaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
      />

      <AddNoteModal
        isOpen={showNoteModal}
        onClose={() => setShowNoteModal(false)}
        onSubmit={handleAddNote}
      />

      <motion.div
        className="container mx-auto px-4 py-8 space-y-6 relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Welcome Header */}
        <motion.div
          className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-blue-100 shadow-lg relative overflow-hidden"
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <div className="relative z-10">
            {/* Welcome Badge */}
            <motion.div
              variants={floatingAnimation}
              animate="animate"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-full border border-blue-100 mb-6 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">
                Welcome back
              </span>
            </motion.div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="relative">
                <motion.h1
                  className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {userData.username.split(" ")[0]}'s Dashboard
                </motion.h1>
                <motion.p
                  className="text-gray-600 mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Tuesday, April 22, 2025 • Let's be productive today!
                </motion.p>
                <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-600 to-purple-600 rounded-full" />
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <motion.button
                  onClick={() => setShowTaskModal(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus className="w-5 h-5" />
                  Add New Task
                </motion.button>

                <motion.button
                  onClick={() => setShowNoteModal(true)}
                  className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-900 px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NotebookPen className="w-5 h-5" />
                  New Note
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-200 rounded-full opacity-20" />
          <div className="absolute top-10 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-30" />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tasks Section */}
          <motion.div
            className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-blue-100 shadow-lg lg:col-span-2 relative overflow-hidden"
            variants={itemVariants}
            whileHover={{ boxShadow: "0 8px 30px rgba(59, 130, 246, 0.15)" }}
          >
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="p-2 bg-blue-100 rounded-lg">
                <LucideCalendarClock className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-blue-900">
                Today's Tasks
              </h2>
            </div>

            <motion.div
              className="space-y-3 relative z-10"
              variants={containerVariants}
            >
              {todaysTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  className="group flex items-start gap-3 p-4 hover:bg-blue-50 rounded-xl transition-all duration-300 border border-transparent hover:border-blue-100"
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ scale: 1.01 }}
                >
                  <motion.button
                    className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                      task.completed
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "border-2 border-blue-300 group-hover:border-blue-500"
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => handleToggleComplete(task._id)}
                  >
                    {task.completed && <Check size={12} />}
                  </motion.button>

                  <div className="flex-1">
                    <p
                      className={`font-medium ${
                        task.completed
                          ? "text-blue-400 line-through"
                          : "text-blue-900"
                      }`}
                    >
                      {task.title}
                    </p>
                    <p className="text-sm text-gray-500">{task.description}</p>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="flex items-center gap-1 text-xs text-blue-500">
                        <Clock size={12} /> {task.time}
                      </span>

                      {task.priority === "high" && (
                        <motion.span
                          className="flex items-center gap-1 text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Flag size={12} /> High
                        </motion.span>
                      )}
                      {task.priority === "medium" && (
                        <motion.span
                          className="flex items-center gap-1 text-xs bg-yellow-50 text-yellow-600 px-2 py-0.5 rounded-full"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Flag size={12} /> Medium
                        </motion.span>
                      )}
                      {task.priority === "low" && (
                        <motion.span
                          className="flex items-center gap-1 text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Flag size={12} /> Low
                        </motion.span>
                      )}
                    </div>
                  </div>

                  <motion.button
                    className="opacity-0 group-hover:opacity-100 p-1 text-blue-600 hover:bg-blue-100 rounded-md transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Edit size={16} />
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="mt-6 flex justify-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <button
                onClick={() => navigate("/today")}
                className="text-blue-600 flex items-center gap-1 group"
              >
                View all tasks
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* Decorative corner elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-blue-400 rounded-tl-lg" />
            <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-blue-400 rounded-tr-lg" />
            <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-blue-400 rounded-bl-lg" />
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-blue-400 rounded-br-lg" />
          </motion.div>

          {/* Stats & Motivation Section */}
          <motion.div
            className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-purple-100 shadow-lg relative overflow-hidden"
            variants={itemVariants}
            whileHover={{ boxShadow: "0 8px 30px rgba(139, 92, 246, 0.15)" }}
          >
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-purple-900">Progress</h2>
            </div>

            <div className="space-y-6 relative z-10">
              <div>
                <div className="flex justify-between mb-2">
                  <p className="text-sm text-purple-700">Today's completion</p>
                  <p className="text-sm font-bold text-purple-700">25%</p>
                </div>
                <div className="w-full bg-purple-100 rounded-full h-2.5">
                  <motion.div
                    className="bg-gradient-to-r from-indigo-400 to-purple-600 h-2.5 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "25%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                  ></motion.div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <p className="text-sm text-purple-700">Weekly goals</p>
                  <p className="text-sm font-bold text-purple-700">75%</p>
                </div>
                <div className="w-full bg-purple-100 rounded-full h-2.5">
                  <motion.div
                    className="bg-gradient-to-r from-blue-400 to-indigo-600 h-2.5 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "75%" }}
                    transition={{ duration: 1, delay: 0.7 }}
                  ></motion.div>
                </div>
              </div>

              {/* Motivational Quote */}
              <motion.div
                className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.8,
                  duration: 0.6,
                  type: "spring",
                }}
                whileHover={{ scale: 1.01 }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="mb-2"
                >
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                </motion.div>
                <p className="text-indigo-800 italic">{`"${quote.content}"`}</p>
                <p className="text-indigo-600 text-sm mt-1">{`- ${quote.author}`}</p>
              </motion.div>
            </div>

            {/* Decorative corner elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-purple-400 rounded-tl-lg" />
            <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-purple-400 rounded-tr-lg" />
            <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-purple-400 rounded-bl-lg" />
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-purple-400 rounded-br-lg" />
          </motion.div>

          {/* Quick Notes Section */}
          <motion.div
            className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-indigo-100 shadow-lg lg:col-span-3 relative overflow-hidden"
            variants={itemVariants}
            whileHover={{ boxShadow: "0 8px 30px rgba(79, 70, 229, 0.15)" }}
          >
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <NotebookPen className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-indigo-900">
                Quick Notes
              </h2>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10"
              variants={containerVariants}
            >
              {recentNotes.map((note, index) => (
                <motion.div
                  key={note.id}
                  className={`p-5 ${note.color} rounded-xl border shadow-sm`}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 4px 20px rgba(79, 70, 229, 0.1)",
                  }}
                >
                  <p className="text-indigo-800">{note.content}</p>
                  <p className="text-xs text-indigo-500 mt-3 flex items-center gap-1">
                    <Clock size={12} />
                    {note.updatedAt}
                  </p>
                </motion.div>
              ))}

              <motion.div
                className="p-5 bg-gradient-to-r from-green-50 to-teal-50 border border-green-100 rounded-xl shadow-sm flex items-center justify-center cursor-pointer"
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 4px 20px rgba(79, 70, 229, 0.1)",
                }}
                onClick={() => setShowNoteModal(true)}
              >
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className="p-3 bg-white rounded-full shadow-sm">
                      <Plus className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <p className="text-green-800">Add new note</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Decorative corner elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-indigo-400 rounded-tl-lg" />
            <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-indigo-400 rounded-tr-lg" />
            <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-indigo-400 rounded-bl-lg" />
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-indigo-400 rounded-br-lg" />
          </motion.div>
        </div>

        {/* Bottom Action Buttons (Mobile) */}
        <div className="lg:hidden fixed bottom-6 right-6 flex gap-3 z-20">
          <motion.button
            className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg"
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
            }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Edit size={20} />
          </motion.button>
          <motion.button
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
            <Plus size={20} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;

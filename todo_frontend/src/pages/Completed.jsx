import React from "react";
import { CheckCircle, X, RotateCcw, Trash2, List } from "lucide-react";
import { motion } from "framer-motion";
import { useTaskContext } from "../contexts/TaskContext";
import { useTheme } from "../contexts/ThemeContext";

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

const CompletedTasks = () => {
  const { tasks, toggleTaskComplete, removeTask } = useTaskContext();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  // Sample data - replace with your actual completed tasks
  const completedTasks = tasks
    .filter((task) => task.completed)
    .map((task) => ({
      id: task._id,
      title: task.title,
      description: task.description,
      completedDate: task.completedAt,
      completedTime: task.completedAt,
      list: task.list,
    }));

  const reStartTask = async (taskId) => {
    try {
      await toggleTaskComplete(taskId);
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };
  const handleDeleteTask = async (taskId) => {
    // console.log("Deleting task with ID:", taskId);
    try {
      await removeTask(taskId);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <motion.div
      className="space-y-6 min-h-[85vh]"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="flex justify-between items-center"
        variants={itemVariants}
      >
        <div className="relative">
          <h1
            className={`text-2xl font-bold ${
              isDarkMode
                ? "text-gray-100"
                : "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
            }`}
          >
            Completed Tasks
          </h1>
          <div
            className={`absolute -left-4 top-0 w-1 h-full bg-gradient-to-b ${
              isDarkMode
                ? "from-purple-400 to-pink-400"
                : "from-purple-600 to-pink-600"
            } rounded-full`}
          />
        </div>
      </motion.div>

      <motion.div
        className={`${
          isDarkMode
            ? "bg-gray-800/90 border-gray-700 text-white"
            : "bg-white/80 border-purple-100"
        } backdrop-blur-lg rounded-xl p-6 border shadow-lg relative overflow-hidden`}
        variants={itemVariants}
      >
        {/* Decorative corner elements */}
        <div
          className={`absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 ${
            isDarkMode ? "border-purple-500/30" : "border-purple-400"
          } rounded-tl-lg`}
        />
        <div
          className={`absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 ${
            isDarkMode ? "border-purple-500/30" : "border-purple-400"
          } rounded-tr-lg`}
        />
        <div
          className={`absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 ${
            isDarkMode ? "border-purple-500/30" : "border-purple-400"
          } rounded-bl-lg`}
        />
        <div
          className={`absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 ${
            isDarkMode ? "border-purple-500/30" : "border-purple-400"
          } rounded-br-lg`}
        />

        {completedTasks.length > 0 ? (
          <motion.div className="space-y-4" variants={containerVariants}>
            {completedTasks.map((task, index) => (
              <motion.div
                key={task.id}
                className={`flex flex-col sm:flex-row items-start gap-4 p-4 rounded-xl transition-all duration-200 ${
                  isDarkMode
                    ? "bg-purple-900/20 border-purple-800/30 hover:border-purple-700/50"
                    : "bg-purple-50/30 border-purple-100/50 hover:border-purple-200/70"
                } border shadow-sm`}
                variants={itemVariants}
                custom={index}
                whileHover={{
                  scale: 1.01,
                  boxShadow: isDarkMode
                    ? "0 4px 12px -2px rgba(168, 85, 247, 0.15)"
                    : "0 4px 12px -2px rgba(168, 85, 247, 0.15)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Task Content */}
                <div className="flex w-full items-start gap-4">
                  {/* Status Icon */}
                  <div
                    className={`flex-shrink-0 w-12 h-12 ${
                      isDarkMode
                        ? "bg-gradient-to-br from-purple-900/50 to-pink-900/50 text-purple-400"
                        : "bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600"
                    } rounded-xl flex items-center justify-center shadow-inner`}
                  >
                    <CheckCircle size={22} className="opacity-90" />
                  </div>

                  {/* Task Details */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <h3
                        className={`font-medium text-base ${
                          isDarkMode
                            ? "text-purple-300 line-through opacity-80"
                            : "text-purple-900 line-through opacity-80"
                        }`}
                      >
                        {task.title}
                      </h3>

                      {/* Desktop Actions */}
                      <div className="hidden sm:flex items-center gap-2">
                        <button
                          onClick={() => reStartTask(task.id)}
                          className={`w-9 h-9 rounded-lg border ${
                            isDarkMode
                              ? "border-purple-700 text-purple-400 hover:bg-purple-900/50"
                              : "border-purple-200 text-purple-500 hover:bg-purple-100"
                          } flex items-center justify-center transition-colors`}
                        >
                          <RotateCcw size={16} />
                        </button>
                        <button
                          className={`w-9 h-9 rounded-lg border ${
                            isDarkMode
                              ? "border-red-900 text-red-400 hover:bg-red-900/50"
                              : "border-red-200 text-red-500 hover:bg-red-50"
                          } flex items-center justify-center transition-colors`}
                          onClick={() => handleDeleteTask(task._id)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>

                    {task.description && (
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        } line-clamp-2`}
                      >
                        {task.description}
                      </p>
                    )}

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-lg ${
                          isDarkMode
                            ? "bg-purple-900/30 text-purple-300"
                            : "bg-purple-100/50 text-purple-700"
                        } flex items-center gap-1.5`}
                      >
                        <CheckCircle size={12} />
                        Completed {task.completedDate} • {task.completedTime}
                      </span>

                      {task.list && (
                        <span
                          className={`text-xs px-2.5 py-1 rounded-lg border ${
                            isDarkMode ? "border-opacity-30" : ""
                          }`}
                          style={{
                            backgroundColor: isDarkMode
                              ? `${task.list.color}20`
                              : `${task.list.color}10`,
                            borderColor: isDarkMode
                              ? `${task.list.color}30`
                              : `${task.list.color}30`,
                            color: isDarkMode
                              ? `${task.list.color}BB`
                              : task.list.color,
                          }}
                        >
                          <List size={12} />
                          {task.list.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Mobile Actions */}
                <div className="flex sm:hidden w-full gap-2 mt-3">
                  <button
                    onClick={() => reStartTask(task.id)}
                    className={`flex-1 py-2.5 rounded-lg ${
                      isDarkMode
                        ? "bg-gray-800 border-purple-700 text-purple-400 hover:bg-gray-700"
                        : "bg-white border-purple-300 text-purple-600 hover:bg-purple-50"
                    } border flex items-center justify-center gap-2 transition-colors`}
                  >
                    <RotateCcw size={16} />
                    Restart
                  </button>
                  <button
                    className={`flex-1 py-2.5 rounded-lg ${
                      isDarkMode
                        ? "bg-gray-800 border-red-900 text-red-400 hover:bg-gray-700"
                        : "bg-white border-red-300 text-red-600 hover:bg-red-50"
                    } border flex items-center justify-center gap-2 transition-colors`}
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <div
              className={`mx-auto w-24 h-24 ${
                isDarkMode
                  ? "bg-gradient-to-r from-purple-900/30 to-pink-900/30 text-purple-400"
                  : "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-400"
              } rounded-full flex items-center justify-center mb-4`}
            >
              <CheckCircle size={32} />
            </div>
            <h3
              className={`text-lg font-medium ${
                isDarkMode ? "text-gray-200" : "text-purple-800"
              }`}
            >
              No completed tasks
            </h3>
            <p
              className={`${
                isDarkMode ? "text-purple-400" : "text-purple-500"
              } mt-1`}
            >
              Tasks you complete will appear here
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CompletedTasks;

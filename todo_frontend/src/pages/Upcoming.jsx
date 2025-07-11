import React, { useEffect, useState } from "react";
import {
  Calendar,
  Plus,
  Check,
  Flag,
  X,
  Pencil,
  ArrowDown,
  AlertCircle,
  AlertTriangle,
} from "lucide-react";
import { motion } from "framer-motion";
import AddTaskModal from "../components/AddTask";
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

const UpcomingTasks = () => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const { getUpcomingTasks, removeTask } = useTaskContext();
  const [upcomingTasks, setUpcomingTask] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  useEffect(() => {
    const tasks = getUpcomingTasks();
    setUpcomingTask(tasks);
  }, [getUpcomingTasks]);

  return (
    <motion.div
      className="space-y-4 sm:space-y-6 min-h-[85vh] px-3 sm:px-0"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Modal components */}
      <AddTaskModal
        isOpen={showTaskModal}
        onClose={() => {
          setShowTaskModal(false);
          setEditingTask(null);
        }}
        isEditing={!!editingTask}
        taskId={editingTask?._id}
        task={editingTask}
      />

      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0"
        variants={itemVariants}
      >
        <div className="relative">
          <h1
            className={`text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${
              darkMode
                ? "from-blue-400 to-purple-400"
                : "from-blue-600 to-purple-600"
            }`}
          >
            Upcoming Tasks
          </h1>
          <div
            className={`absolute -left-4 top-0 w-1 h-full bg-gradient-to-b ${
              darkMode
                ? "from-blue-400 to-purple-400"
                : "from-blue-600 to-purple-600"
            } rounded-full`}
          />
        </div>

        <motion.button
          onClick={() => setShowTaskModal(true)}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r ${
            darkMode
              ? "from-blue-500 to-purple-500"
              : "from-blue-600 to-purple-600"
          } hover:from-purple-600 hover:to-blue-600 text-white px-4 py-3 sm:py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={18} />
          Add Task
        </motion.button>
      </motion.div>

      <motion.div
        className={`${
          darkMode
            ? "bg-gray-800/90 border-gray-700 text-white"
            : "bg-white/80 border-blue-100"
        } backdrop-blur-lg rounded-lg sm:rounded-xl p-4 sm:p-6 border shadow-lg relative overflow-hidden`}
        variants={itemVariants}
      >
        {/* Decorative corner elements - hidden on mobile */}
        <div
          className={`absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 ${
            darkMode ? "border-blue-600" : "border-blue-400"
          } rounded-tl-lg hidden sm:block`}
        />
        <div
          className={`absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 ${
            darkMode ? "border-blue-600" : "border-blue-400"
          } rounded-tr-lg hidden sm:block`}
        />
        <div
          className={`absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 ${
            darkMode ? "border-blue-600" : "border-blue-400"
          } rounded-bl-lg hidden sm:block`}
        />
        <div
          className={`absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 ${
            darkMode ? "border-blue-600" : "border-blue-400"
          } rounded-br-lg hidden sm:block`}
        />

        {upcomingTasks.length > 0 ? (
          <motion.div
            className="space-y-3 sm:space-y-4"
            variants={containerVariants}
          >
            {upcomingTasks.map((task, index) => (
              <motion.div
                key={task._id}
                className={`flex flex-col lg:flex-row lg:items-center lg:justify-between sm:flex-row items-start gap-4 p-4 rounded-xl transition-all duration-200 group border ${
                  darkMode
                    ? "border-gray-700 hover:border-gray-600 bg-gray-800/50 hover:bg-gray-700/50"
                    : "border-blue-100/30 hover:border-blue-200/50 bg-white hover:bg-blue-50/30"
                } shadow-sm`}
                variants={itemVariants}
                custom={index}
                whileHover={{
                  scale: 1.01,
                  boxShadow: darkMode
                    ? "0 4px 12px -2px rgba(30, 64, 175, 0.2)"
                    : "0 4px 12px -2px rgba(59, 130, 246, 0.2)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Icon and Content */}
                <div className="flex w-full sm:w-auto items-start gap-4">
                  <div
                    className={`flex-shrink-0 w-12 h-12 ${
                      darkMode
                        ? "bg-gradient-to-br from-blue-900 to-indigo-900"
                        : "bg-gradient-to-br from-blue-100 to-indigo-100"
                    } rounded-xl flex items-center justify-center ${
                      darkMode ? "text-blue-400" : "text-blue-600"
                    } shadow-inner`}
                  >
                    <Calendar size={22} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-medium text-base ${
                        darkMode ? "text-gray-200" : "text-gray-800"
                      }`}
                    >
                      {task.title}
                    </h3>
                    {task.description && (
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        } line-clamp-2 mt-1`}
                      >
                        {task.description}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-lg ${
                          darkMode
                            ? "bg-blue-900/50 text-blue-300"
                            : "bg-blue-50 text-blue-600"
                        } flex items-center gap-1.5`}
                      >
                        <Calendar size={12} />
                        {new Date(task.dueDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}{" "}
                      </span>

                      {task.priority === "high" && (
                        <motion.span
                          className={`text-xs ${
                            darkMode
                              ? "bg-red-900/50 text-red-300 border-red-800"
                              : "bg-red-50 text-red-600 border-red-100"
                          } px-2.5 py-1 rounded-lg border flex items-center gap-1.5`}
                          animate={{
                            scale: [1, 1.05, 1],
                            backgroundColor: darkMode
                              ? [
                                  "rgba(127, 29, 29, 0.5)",
                                  "rgba(127, 29, 29, 0.3)",
                                  "rgba(127, 29, 29, 0.5)",
                                ]
                              : [
                                  "rgba(254, 226, 226, 1)",
                                  "rgba(254, 226, 226, 0.7)",
                                  "rgba(254, 226, 226, 1)",
                                ],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <AlertTriangle size={12} />
                          High priority
                        </motion.span>
                      )}

                      {task.priority === "medium" && (
                        <span
                          className={`text-xs ${
                            darkMode
                              ? "bg-yellow-900/50 text-yellow-300 border-yellow-800"
                              : "bg-yellow-50 text-yellow-600 border-yellow-100"
                          } px-2.5 py-1 rounded-lg border flex items-center gap-1.5`}
                        >
                          <AlertCircle size={12} />
                          Medium
                        </span>
                      )}

                      {task.priority === "low" && (
                        <span
                          className={`text-xs ${
                            darkMode
                              ? "bg-green-900/50 text-green-300 border-green-800"
                              : "bg-green-50 text-green-600 border-green-100"
                          } px-2.5 py-1 rounded-lg border flex items-center gap-1.5`}
                        >
                          <ArrowDown size={12} />
                          Low
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex sm:flex-col lg:flex-row items-center gap-2 w-full sm:w-auto justify-end mt-3 sm:mt-0">
                  <button
                    onClick={() => handleEditTask(task)}
                    className={`w-full sm:w-10 h-10 rounded-lg border ${
                      darkMode
                        ? "border-indigo-700 text-indigo-400 hover:bg-indigo-900/50"
                        : "border-indigo-200 text-indigo-500 hover:bg-indigo-50"
                    } flex items-center justify-center transition-colors`}
                  >
                    <Pencil size={18} className="sm:block hidden" />
                    <span className="sm:hidden">Edit Task</span>
                  </button>

                  <button
                    className={`w-full sm:w-10 h-10 rounded-lg border ${
                      darkMode
                        ? "border-red-700 text-red-400 hover:bg-red-900/50"
                        : "border-red-200 text-red-500 hover:bg-red-50"
                    } flex items-center justify-center transition-colors`}
                    onClick={() => removeTask(task._id)}
                  >
                    <X size={18} className="sm:block hidden" />
                    <span className="sm:hidden">Delete</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <div
              className={`mx-auto w-16 h-16 sm:w-24 sm:h-24 ${
                darkMode
                  ? "bg-gradient-to-r from-blue-900 to-indigo-900 text-blue-400"
                  : "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-400"
              } rounded-full flex items-center justify-center mb-4`}
            >
              <Calendar size={24} className="sm:w-8 sm:h-8" />
            </div>
            <h3
              className={`text-base sm:text-lg font-medium ${
                darkMode ? "text-blue-300" : "text-blue-800"
              }`}
            >
              No upcoming tasks
            </h3>
            <p
              className={`text-sm ${
                darkMode ? "text-blue-400" : "text-blue-500"
              } mt-1 px-4`}
            >
              Tasks with future due dates will appear here
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default UpcomingTasks;

import React, { useEffect, useState, useCallback } from "react";
import {
  ListTodo,
  Plus,
  Check,
  Flag,
  Calendar,
  CheckCircle,
  Pencil,
  X,
  List,
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

const AllTasks = () => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [filter, setFilter] = useState("all"); // "all", "active", "completed"
  const { toggleTaskComplete, getAllTasks, removeTask } = useTaskContext();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const fetchTasks = useCallback(async () => {
    try {
      const fetchedTasks = await getAllTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, [getAllTasks]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleToggleComplete = async (taskId) => {
    try {
      await toggleTaskComplete(taskId);
      await fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await removeTask(taskId);
      await fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <motion.div
      className="space-y-4 md:space-y-6 min-h-[85vh] px-2 md:px-0"
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
        className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0"
        variants={itemVariants}
      >
        <div className="relative w-full sm:w-auto">
          <h1
            className={`text-xl md:text-2xl font-bold ${
              isDarkMode
                ? "text-gray-100"
                : "text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600"
            }`}
          >
            All Tasks
          </h1>
          <div
            className={`absolute -left-4 top-0 w-1 h-full bg-gradient-to-b ${
              isDarkMode
                ? "from-indigo-400 to-cyan-400"
                : "from-indigo-600 to-cyan-600"
            } rounded-full`}
          />
        </div>
        <motion.button
          onClick={() => setShowTaskModal(true)}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 ${
            isDarkMode
              ? "bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-cyan-500 hover:to-indigo-500"
              : "bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-cyan-600 hover:to-indigo-600"
          } text-white px-6 py-3 sm:px-4 sm:py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={18} />
          Add Task
        </motion.button>
      </motion.div>

      <div className="flex items-center justify-center gap-2 mb-4 overflow-x-auto whitespace-nowrap py-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-6 py-2.5 sm:px-4 sm:py-2 rounded-lg text-sm font-medium transition-colors min-w-[80px] ${
            filter === "all"
              ? isDarkMode
                ? "bg-indigo-900/50 text-indigo-300"
                : "bg-indigo-100 text-indigo-800"
              : isDarkMode
              ? "text-gray-300 hover:bg-gray-800"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`px-6 py-2.5 sm:px-4 sm:py-2 rounded-lg text-sm font-medium transition-colors min-w-[80px] ${
            filter === "active"
              ? isDarkMode
                ? "bg-indigo-900/50 text-indigo-300"
                : "bg-indigo-100 text-indigo-800"
              : isDarkMode
              ? "text-gray-300 hover:bg-gray-800"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-6 py-2.5 sm:px-4 sm:py-2 rounded-lg text-sm font-medium transition-colors min-w-[80px] ${
            filter === "completed"
              ? isDarkMode
                ? "bg-indigo-900/50 text-indigo-300"
                : "bg-indigo-100 text-indigo-800"
              : isDarkMode
              ? "text-gray-300 hover:bg-gray-800"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Completed
        </button>
      </div>

      <motion.div
        className={`${
          isDarkMode
            ? "bg-gray-800/90 border-gray-700 text-white"
            : "bg-white/80 border-indigo-100"
        } backdrop-blur-lg rounded-xl p-3 sm:p-6 border shadow-lg relative overflow-hidden`}
        variants={itemVariants}
      >
        {/* Decorative corner elements */}
        <div
          className={`absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 ${
            isDarkMode ? "border-indigo-500/30" : "border-indigo-400"
          } rounded-tl-lg hidden sm:block`}
        />
        <div
          className={`absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 ${
            isDarkMode ? "border-indigo-500/30" : "border-indigo-400"
          } rounded-tr-lg hidden sm:block`}
        />
        <div
          className={`absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 ${
            isDarkMode ? "border-indigo-500/30" : "border-indigo-400"
          } rounded-bl-lg hidden sm:block`}
        />
        <div
          className={`absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 ${
            isDarkMode ? "border-indigo-500/30" : "border-indigo-400"
          } rounded-br-lg hidden sm:block`}
        />

        {filteredTasks.length > 0 ? (
          <motion.div
            className="space-y-3 sm:space-y-4"
            variants={containerVariants}
          >
            {filteredTasks.map((task, index) => (
              <motion.div
                key={task._id}
                className={`flex flex-col items-start gap-3 p-4 rounded-xl transition-colors group border ${
                  task.completed
                    ? isDarkMode
                      ? "bg-purple-900/20 hover:bg-purple-900/30 border-purple-800/30"
                      : "bg-purple-50/50 hover:bg-purple-50 border-purple-100/50"
                    : isDarkMode
                    ? "bg-gray-800/50 hover:bg-gray-700/50 border-gray-700"
                    : "bg-white hover:bg-indigo-50/50 border-indigo-100/50"
                } shadow-sm`}
                variants={itemVariants}
                custom={index}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Top Row - Icon + Title + Actions */}
                <div className="flex items-start w-full gap-3">
                  {/* Status Icon */}
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                      task.completed
                        ? isDarkMode
                          ? "bg-gradient-to-br from-purple-900/50 to-pink-900/50 text-purple-300"
                          : "bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600"
                        : isDarkMode
                        ? "bg-gradient-to-br from-indigo-900/50 to-blue-900/50 text-indigo-300"
                        : "bg-gradient-to-br from-indigo-100 to-blue-100 text-indigo-600"
                    } shadow-inner`}
                  >
                    {task.completed ? (
                      <CheckCircle size={20} className="opacity-90" />
                    ) : (
                      <Calendar size={20} className="opacity-90" />
                    )}
                  </div>

                  {/* Title and Description */}
                  <div className={`flex-1 min-w-0`}>
                    <h3
                      className={`font-medium text-base  ${
                        task.completed
                          ? isDarkMode
                            ? "text-purple-300 line-through opacity-80"
                            : "text-purple-900 line-through opacity-80"
                          : isDarkMode
                          ? "text-gray-100"
                          : "text-gray-800"
                      }`}
                    >
                      {task.title}
                    </h3>
                    {task.description && (
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        } line-clamp-2 mt-1`}
                      >
                        {task.description}
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-1 sm:gap-2">
                    {!task.completed && (
                      <>
                        <button
                          className={`p-2 rounded-lg ${
                            isDarkMode
                              ? "text-gray-400 hover:bg-gray-900/50"
                              : "text-gray-600 hover:bg-gray-100"
                          } transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300`}
                          onClick={() => handleEditTask(task)}
                          aria-label="Edit task"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          className={`p-2 rounded-lg ${
                            isDarkMode
                              ? "text-indigo-400 hover:bg-indigo-900/50"
                              : "text-indigo-600 hover:bg-indigo-100"
                          } transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-300`}
                          onClick={() => handleToggleComplete(task._id)}
                          aria-label="Complete task"
                        >
                          <Check size={18} />
                        </button>
                      </>
                    )}
                    <button
                      className={`p-2 rounded-lg ${
                        isDarkMode
                          ? "text-red-400 hover:bg-red-900/50"
                          : "text-red-600 hover:bg-red-50"
                      } transition-colors focus:outline-none focus:ring-2 focus:ring-red-300`}
                      onClick={() => handleDeleteTask(task._id)}
                      aria-label="Delete task"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* Bottom Row - Metadata */}
                <div className="w-full pl-15">
                  <div className="flex items-center gap-3 flex-wrap">
                    {/* Due Date/Completion Date */}
                    <span
                      className={`text-xs flex items-center gap-1.5 ${
                        task.completed
                          ? isDarkMode
                            ? "text-purple-400"
                            : "text-purple-600"
                          : isDarkMode
                          ? "text-indigo-400"
                          : "text-indigo-600"
                      }`}
                    >
                      {task.completed ? (
                        <>
                          <CheckCircle size={12} className="opacity-70" />
                          Completed {formatDate(task.completedAt)}
                        </>
                      ) : (
                        <>
                          <Calendar size={12} className="opacity-70" />
                          Due {formatDate(task.dueDate)}
                        </>
                      )}
                    </span>

                    {/* List Badge */}
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
                            : `${task.list.color}20`,
                          color: isDarkMode
                            ? `${task.list.color}BB`
                            : task.list.color,
                        }}
                      >
                        <List size={12} className="opacity-80" />
                        {task.name}
                      </span>
                    )}

                    {/* Priority Badge */}
                    {!task.completed && task.priority && (
                      <span
                        className={`text-xs px-2.5 py-1 rounded-lg border flex items-center gap-1.5 ${
                          isDarkMode
                            ? task.priority === "high"
                              ? "bg-red-900/30 border-red-800/30 text-red-400"
                              : task.priority === "medium"
                              ? "bg-yellow-900/30 border-yellow-800/30 text-yellow-400"
                              : "bg-green-900/30 border-green-800/30 text-green-400"
                            : task.priority === "high"
                            ? "bg-red-50/80 border-red-100 text-red-600"
                            : task.priority === "medium"
                            ? "bg-yellow-50/80 border-yellow-100 text-yellow-600"
                            : "bg-green-50/80 border-green-100 text-green-600"
                        }`}
                      >
                        <Flag size={12} className="opacity-80" />
                        {task.priority === "high"
                          ? "High"
                          : task.priority === "medium"
                          ? "Medium"
                          : "Low"}
                      </span>
                    )}
                  </div>

                  {/* Edit Button (mobile only) */}
                  <div className="mt-3 sm:hidden w-full">
                    <button
                      onClick={() => handleEditTask(task)}
                      className={`w-full py-2 text-sm rounded-lg ${
                        isDarkMode
                          ? "bg-indigo-700 hover:bg-indigo-800"
                          : "bg-indigo-600 hover:bg-indigo-700"
                      } text-white flex items-center justify-center gap-2 transition-colors`}
                    >
                      <Pencil size={14} />
                      Edit Task
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <div
              className={`mx-auto w-16 h-16 sm:w-24 sm:h-24 ${
                isDarkMode
                  ? "bg-gradient-to-r from-indigo-900/30 to-cyan-900/30"
                  : "bg-gradient-to-r from-indigo-100 to-cyan-100"
              } rounded-full flex items-center justify-center ${
                isDarkMode ? "text-indigo-400" : "text-indigo-400"
              } mb-4`}
            >
              <ListTodo size={24} className="sm:w-8 sm:h-8" />
            </div>
            <h3
              className={`text-base sm:text-lg font-medium ${
                isDarkMode ? "text-gray-200" : "text-indigo-800"
              }`}
            >
              No tasks found
            </h3>
            <p
              className={`text-sm sm:text-base ${
                isDarkMode ? "text-indigo-400" : "text-indigo-500"
              } mt-1 px-4`}
            >
              {filter === "all" &&
                "You don't have any tasks yet. Create one to get started."}
              {filter === "active" && "You don't have any active tasks."}
              {filter === "completed" && "You haven't completed any tasks yet."}
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AllTasks;

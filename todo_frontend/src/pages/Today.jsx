import React, { useEffect, useState } from "react";
import {
  Calendar,
  Plus,
  Check,
  CheckCircle,
  Pencil,
  X,
  Trash2,
  Clock,
  AlertTriangle,
  AlertCircle,
  ArrowDown,
} from "lucide-react";
import { motion } from "framer-motion";
import AddTaskModal from "../components/AddTask";
import { useTaskContext } from "../contexts/TaskContext";

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

const TodayTasks = () => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [todaysTasks, setTodaysTasks] = useState([]);
  const { getTodayTasks, toggleTaskComplete, removeTask } = useTaskContext();
  const [editingTask, setEditingTask] = useState(null);

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const tasks = todaysTasks;

  useEffect(() => {
    // Load today's tasks when component mounts
    const tasks = getTodayTasks();
    setTodaysTasks(tasks);
  }, [getTodayTasks]);

  const toggleTaskCompletion = (id) => {
    toggleTaskComplete(id);
  };

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
          <h1 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600">
            Today's Tasks
          </h1>
          <motion.div
            className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-green-600 to-teal-600 rounded-full"
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>

        <motion.button
          onClick={() => setShowTaskModal(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-teal-600 hover:from-teal-600 hover:to-green-600 text-white px-4 py-3 sm:py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={18} className="animate-pulse" />
          Add Task
        </motion.button>
      </motion.div>

      <motion.div
        className="bg-white/80 backdrop-blur-lg rounded-lg sm:rounded-xl p-4 sm:p-6 border border-green-100 shadow-lg relative overflow-hidden"
        variants={itemVariants}
        whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
      >
        {/* Decorative corner elements - hidden on mobile */}
        <motion.div
          className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-green-400 rounded-tl-lg hidden sm:block"
          initial={{ opacity: 0, x: -10, y: -10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
        <motion.div
          className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-green-400 rounded-tr-lg hidden sm:block"
          initial={{ opacity: 0, x: 10, y: -10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        <motion.div
          className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-green-400 rounded-bl-lg hidden sm:block"
          initial={{ opacity: 0, x: -10, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        <motion.div
          className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-green-400 rounded-br-lg hidden sm:block"
          initial={{ opacity: 0, x: 10, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />

        {/* Task progress */}
        <motion.div
          className="mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex justify-between mb-2">
            <p className="text-xs sm:text-sm font-medium text-green-800">
              Today's progress
            </p>
            <motion.p
              className="text-xs sm:text-sm font-medium text-green-800"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {tasks.filter((t) => t.completed).length}/{tasks.length} completed
            </motion.p>
          </div>
          <div className="w-full h-1.5 sm:h-2 bg-green-100 rounded-full overflow-hidden shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-green-500 to-teal-500"
              initial={{ width: "0%" }}
              animate={{
                width: `${
                  tasks.length
                    ? (tasks.filter((t) => t.completed).length / tasks.length) *
                      100
                    : 0
                }%`,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {todaysTasks.length > 0 ? (
          <motion.div
            className="space-y-3 sm:space-y-4"
            variants={containerVariants}
          >
            {todaysTasks.map((task, index) => (
              <motion.div
                key={task._id}
                className={`flex flex-col items-start gap-3 p-4 rounded-xl transition-all duration-200 group border-2 ${
                  task.completed
                    ? "bg-green-50/70 border-green-200/50"
                    : "bg-white hover:bg-green-50/50 border-green-100/30 hover:border-green-200/50"
                } shadow-sm`}
                variants={itemVariants}
                custom={index}
                whileHover={{
                  scale: 1.01,
                  boxShadow: "0 4px 12px -2px rgba(16, 185, 129, 0.2)",
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                {/* Main Content Row */}
                <div className="flex w-full items-start gap-3">
                  {/* Status Icon */}
                  <motion.div
                    className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                      task.completed
                        ? "bg-gradient-to-br from-green-100 to-teal-100 text-green-600"
                        : "bg-gradient-to-br from-green-50 to-teal-50 text-green-500"
                    } shadow-inner`}
                    whileHover={{ rotate: 10 }}
                  >
                    {task.completed ? (
                      <CheckCircle size={20} className="opacity-90" />
                    ) : (
                      <Calendar size={20} className="opacity-90" />
                    )}
                  </motion.div>

                  {/* Task Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <h3
                        className={`font-medium text-base ${
                          task.completed
                            ? "text-green-600 line-through"
                            : "text-gray-800"
                        }`}
                      >
                        {task.title}
                      </h3>

                      {/* Actions - Desktop */}
                      <div className="hidden sm:flex items-center gap-2">
                        <motion.button
                          className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                            task.completed
                              ? "bg-green-500 text-white"
                              : "border border-green-200 text-green-500 hover:bg-green-100"
                          }`}
                          onClick={() => toggleTaskCompletion(task._id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Check size={16} />
                        </motion.button>
                        {!task.completed && (
                          <button
                            onClick={() => handleEditTask(task)}
                            className="w-9 h-9 rounded-lg border border-blue-200 flex items-center justify-center text-blue-500 hover:bg-blue-50 transition-colors"
                          >
                            <Pencil size={16} />
                          </button>
                        )}
                        <button
                          className="w-9 h-9 rounded-lg border border-red-200 flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
                          onClick={() => removeTask(task._id)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>

                    {task.description && (
                      <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                        {task.description}
                      </p>
                    )}

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5 ${
                          task.completed
                            ? "bg-green-100/50 text-green-700"
                            : "bg-green-50 text-green-600"
                        }`}
                      >
                        <Clock size={12} />
                        Today • {task.time}
                      </span>

                      {task.priority === "high" && (
                        <motion.span
                          className="text-xs bg-red-50 text-red-600 px-2.5 py-1 rounded-lg border border-red-100 flex items-center gap-1.5"
                          animate={{
                            scale: [1, 1.05, 1],
                            backgroundColor: [
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
                        <span className="text-xs bg-yellow-50 text-yellow-600 px-2.5 py-1 rounded-lg border border-yellow-100 flex items-center gap-1.5">
                          <AlertCircle size={12} />
                          Medium
                        </span>
                      )}

                      {task.priority === "low" && (
                        <span className="text-xs bg-green-50 text-green-600 px-2.5 py-1 rounded-lg border border-green-100 flex items-center gap-1.5">
                          <ArrowDown size={12} />
                          Low
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions - Mobile */}
                <div className="flex sm:hidden w-full gap-2 mt-3">
                  <motion.button
                    className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 ${
                      task.completed
                        ? "bg-green-500 text-white"
                        : "border border-green-300 text-green-600 bg-green-50"
                    }`}
                    onClick={() => toggleTaskCompletion(task._id)}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Check size={16} />
                    {task.completed ? "Completed" : "Complete"}
                  </motion.button>

                  {!task.completed && (
                    <button
                      onClick={() => handleEditTask(task)}
                      className="flex-1 py-2 rounded-lg border border-blue-300 text-blue-600 bg-blue-50 flex items-center justify-center gap-2"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>
                  )}

                  <button
                    className="flex-1 py-2 rounded-lg border border-red-300 text-red-600 bg-red-50 flex items-center justify-center gap-2"
                    onClick={() => removeTask(task._id)}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-8 sm:py-12"
            variants={itemVariants}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="mx-auto w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-green-100 to-teal-100 rounded-full flex items-center justify-center text-green-400 mb-4 shadow-inner"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, 0],
                boxShadow: [
                  "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <Calendar size={24} className="sm:w-8 sm:h-8" />
            </motion.div>
            <motion.h3
              className="text-base sm:text-lg font-medium text-green-800"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              No tasks for today
            </motion.h3>
            <p className="text-sm text-green-500 mt-1 px-4 hover:text-green-600 transition-colors duration-300">
              Your day is clear! Add a task to get started.
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default TodayTasks;

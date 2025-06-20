import React from "react";
import { CheckCircle, X, RotateCcw, Trash2, List } from "lucide-react";
import { motion } from "framer-motion";
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

const CompletedTasks = () => {
  const { tasks, toggleTaskComplete, removeTask } = useTaskContext();

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
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Completed Tasks
          </h1>
          <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-purple-600 to-pink-600 rounded-full" />
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

        {completedTasks.length > 0 ? (
          <motion.div className="space-y-4" variants={containerVariants}>
            {completedTasks.map((task, index) => (
              <motion.div
                key={task.id}
                className="flex flex-col sm:flex-row items-start gap-4 p-4 rounded-xl transition-all duration-200 bg-purple-50/30 border border-purple-100/50 hover:border-purple-200/70 shadow-sm"
                variants={itemVariants}
                custom={index}
                whileHover={{
                  scale: 1.01,
                  boxShadow: "0 4px 12px -2px rgba(168, 85, 247, 0.15)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Task Content */}
                <div className="flex w-full items-start gap-4">
                  {/* Status Icon */}
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center text-purple-600 shadow-inner">
                    <CheckCircle size={22} className="opacity-90" />
                  </div>

                  {/* Task Details */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <h3 className="font-medium text-base text-purple-900 line-through opacity-80">
                        {task.title}
                      </h3>

                      {/* Desktop Actions */}
                      <div className="hidden sm:flex items-center gap-2">
                        <button
                          onClick={() => reStartTask(task.id)}
                          className="w-9 h-9 rounded-lg border border-purple-200 flex items-center justify-center text-purple-500 hover:bg-purple-100 transition-colors"
                        >
                          <RotateCcw size={16} />
                        </button>
                        <button
                          className="w-9 h-9 rounded-lg border border-red-200 flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
                          onClick={() => handleDeleteTask(task._id)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>

                    {task.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {task.description}
                      </p>
                    )}

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-xs px-2.5 py-1 rounded-lg bg-purple-100/50 text-purple-700 flex items-center gap-1.5">
                        <CheckCircle size={12} />
                        Completed {task.completedDate} • {task.completedTime}
                      </span>

                      {task.list && (
                        <span
                          className="text-xs px-2.5 py-1 rounded-lg border flex items-center gap-1.5"
                          style={{
                            backgroundColor: `${task.list.color}10`,
                            borderColor: `${task.list.color}30`,
                            color: task.list.color,
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
                    className="flex-1 py-2.5 rounded-lg bg-white border border-purple-300 text-purple-600 flex items-center justify-center gap-2 hover:bg-purple-50 transition-colors"
                  >
                    <RotateCcw size={16} />
                    Restart
                  </button>
                  <button
                    className="flex-1 py-2.5 rounded-lg bg-white border border-red-300 text-red-600 flex items-center justify-center gap-2 hover:bg-red-50 transition-colors"
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
            <div className="mx-auto w-24 h-24 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center text-purple-400 mb-4">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-lg font-medium text-purple-800">
              No completed tasks
            </h3>
            <p className="text-purple-500 mt-1">
              Tasks you complete will appear here
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CompletedTasks;

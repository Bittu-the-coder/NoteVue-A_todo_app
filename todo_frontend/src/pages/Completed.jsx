import React from "react";
import { CheckCircle, CircleX, RotateCcw } from "lucide-react";
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
                className="flex items-center gap-4 p-4 hover:bg-purple-50 rounded-lg transition-colors group border border-transparent hover:border-purple-100"
                variants={itemVariants}
                custom={index}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center text-purple-600">
                  <CheckCircle size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-purple-900 line-through opacity-70">
                    {task.title}
                  </h3>
                  <p className="text-sm text-gray-500">{task.description}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm text-purple-500 flex items-center gap-1">
                      Completed {task.completedDate} {task.completedTime}
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full border flex items-center gap-1"
                      style={{
                        backgroundColor: `${task.list.color}10`,
                        borderColor: `${task.list.color}30`,
                        color: task.list.color,
                      }}
                    >
                      {task.list.name}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => reStartTask(task.id)}
                    className="w-8 h-8 rounded-full border border-purple-200 flex items-center justify-center text-purple-500 hover:bg-purple-100 transition-colors"
                  >
                    <RotateCcw size={14} />
                  </button>
                  <CircleX
                    onClick={() => handleDeleteTask(task.id)}
                    className="w-8 h-8 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
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

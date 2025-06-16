import React, { useState } from "react";
import { Calendar, Plus, Check, Flag, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import AddTaskModal from "../components/AddTask";

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
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Morning standup",
      time: "9:00 AM",
      priority: "high",
      completed: false,
    },
    {
      id: 2,
      title: "Prepare project proposal",
      time: "11:30 AM",
      priority: "medium",
      completed: false,
    },
    {
      id: 3,
      title: "Call with marketing team",
      time: "2:00 PM",
      priority: "low",
      completed: false,
    },
  ]);

  const handleAddTask = (taskData) => {
    console.log("Adding task:", taskData);
    // Call your API here
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Sample data - replace with your actual data
  const lists = [
    { id: "1", name: "Personal", color: "#8B5CF6" },
    { id: "2", name: "Work", color: "#3B82F6" },
  ];

  const tags = [
    { id: "1", name: "Important" },
    { id: "2", name: "Urgent" },
  ];

  const todayTasks = tasks;

  return (
    <motion.div
      className="space-y-6 min-h-[85vh]"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Modal components */}
      <AddTaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        onSubmit={handleAddTask}
        lists={lists}
        tags={tags}
      />

      <motion.div
        className="flex justify-between items-center"
        variants={itemVariants}
      >
        <div className="relative">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600">
            Today's Tasks
          </h1>
          <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-green-600 to-teal-600 rounded-full" />
        </div>

        <motion.button
          onClick={() => setShowTaskModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-teal-600 hover:from-teal-600 hover:to-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={18} />
          Add Task
        </motion.button>
      </motion.div>

      <motion.div
        className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-green-100 shadow-lg relative overflow-hidden"
        variants={itemVariants}
      >
        {/* Decorative corner elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-green-400 rounded-tl-lg" />
        <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-green-400 rounded-tr-lg" />
        <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-green-400 rounded-bl-lg" />
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-green-400 rounded-br-lg" />

        {/* Task progress */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex justify-between mb-2">
            <p className="text-sm font-medium text-green-800">
              Today's progress
            </p>
            <p className="text-sm font-medium text-green-800">
              {tasks.filter((t) => t.completed).length}/{tasks.length} completed
            </p>
          </div>
          <div className="w-full h-2 bg-green-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-500 to-teal-500"
              initial={{ width: "0%" }}
              animate={{
                width: `${
                  (tasks.filter((t) => t.completed).length / tasks.length) * 100
                }%`,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {todayTasks.length > 0 ? (
          <motion.div className="space-y-4" variants={containerVariants}>
            {todayTasks.map((task, index) => (
              <motion.div
                key={task.id}
                className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-200 group border ${
                  task.completed
                    ? "bg-green-50/50 border-green-100"
                    : "hover:bg-green-50 border-transparent hover:border-green-100"
                }`}
                variants={itemVariants}
                custom={index}
                whileHover={{
                  scale: 1.01,
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
                }}
              >
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-green-100 to-teal-100 rounded-full flex items-center justify-center text-green-600">
                  <Calendar size={20} />
                </div>
                <div className="flex-1">
                  <h3
                    className={`font-medium ${
                      task.completed
                        ? "text-green-400 line-through"
                        : "text-green-900"
                    }`}
                  >
                    {task.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm text-green-500 flex items-center gap-1">
                      Today • {task.time}
                    </span>
                    {task.priority === "high" && (
                      <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full border border-red-100 flex items-center gap-1">
                        <Flag size={10} /> High priority
                      </span>
                    )}
                    {task.priority === "medium" && (
                      <span className="text-xs bg-yellow-50 text-yellow-600 px-2 py-0.5 rounded-full border border-yellow-100 flex items-center gap-1">
                        <Flag size={10} /> Medium
                      </span>
                    )}
                    {task.priority === "low" && (
                      <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full border border-green-100 flex items-center gap-1">
                        <Flag size={10} /> Low
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      task.completed
                        ? "bg-gradient-to-r from-green-600 to-teal-500 text-white"
                        : "border border-green-200 text-green-500 hover:bg-green-100"
                    }`}
                    onClick={() => toggleTaskCompletion(task.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Check size={16} />
                  </motion.button>
                  <motion.div
                    className="text-green-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: -5, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                  >
                    <ChevronRight />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-12"
            variants={itemVariants}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="mx-auto w-24 h-24 bg-gradient-to-r from-green-100 to-teal-100 rounded-full flex items-center justify-center text-green-400 mb-4"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <Calendar size={32} />
            </motion.div>
            <h3 className="text-lg font-medium text-green-800">
              No tasks for today
            </h3>
            <p className="text-green-500 mt-1">
              Your day is clear! Add a task to get started.
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default TodayTasks;

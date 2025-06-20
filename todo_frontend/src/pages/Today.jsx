import React, { useEffect, useState } from "react";
import { Calendar, Plus, Check, Flag, CircleX, Pencil } from "lucide-react";
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
      className="space-y-6 min-h-[85vh]"
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
        className="flex justify-between items-center"
        variants={itemVariants}
      >
        <div className="relative">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600">
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
          className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-teal-600 hover:from-teal-600 hover:to-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
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
        className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-green-100 shadow-lg relative overflow-hidden"
        variants={itemVariants}
        whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
      >
        {/* Decorative corner elements */}
        <motion.div
          className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-green-400 rounded-tl-lg"
          initial={{ opacity: 0, x: -10, y: -10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
        <motion.div
          className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-green-400 rounded-tr-lg"
          initial={{ opacity: 0, x: 10, y: -10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        <motion.div
          className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-green-400 rounded-bl-lg"
          initial={{ opacity: 0, x: -10, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        <motion.div
          className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-green-400 rounded-br-lg"
          initial={{ opacity: 0, x: 10, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />

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
            <motion.p
              className="text-sm font-medium text-green-800"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {tasks.filter((t) => t.completed).length}/{tasks.length} completed
            </motion.p>
          </div>
          <div className="w-full h-2 bg-green-100 rounded-full overflow-hidden shadow-inner">
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
          <motion.div className="space-y-4" variants={containerVariants}>
            {todaysTasks.map((task, index) => (
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
                  backgroundColor: task.completed
                    ? "rgba(240, 253, 244, 0.8)"
                    : "rgba(240, 253, 244, 0.5)",
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <motion.div
                  className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-green-100 to-teal-100 rounded-full flex items-center justify-center text-green-600"
                  whileHover={{ rotate: 15 }}
                >
                  <Calendar size={20} />
                </motion.div>
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
                  <p className="text-sm text-gray-500">{task.description}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm text-green-500 flex items-center gap-1">
                      Today • {task.time}
                    </span>
                    {task.priority === "high" && (
                      <motion.span
                        className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full border border-red-100 flex items-center gap-1"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <Flag size={10} /> High priority
                      </motion.span>
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
                    onClick={() => toggleTaskCompletion(task._id)}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Check size={16} />
                  </motion.button>
                  {!task.completed && (
                    <button
                      onClick={() => handleEditTask(task)}
                      className="w-8 h-8 rounded-full border border-indigo-200 flex items-center justify-center text-indigo-500 hover:bg-indigo-100 transition-colors"
                    >
                      <Pencil size={16} />
                    </button>
                  )}
                  <motion.button
                    onClick={() => removeTask(task._id)}
                    whileHover={{ scale: 1.1, color: "#EF4444" }}
                    whileTap={{ scale: 0.9 }}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <CircleX size={30} />
                  </motion.button>
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
              className="mx-auto w-24 h-24 bg-gradient-to-r from-green-100 to-teal-100 rounded-full flex items-center justify-center text-green-400 mb-4 shadow-inner"
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
              <Calendar size={32} />
            </motion.div>
            <motion.h3
              className="text-lg font-medium text-green-800"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              No tasks for today
            </motion.h3>
            <p className="text-green-500 mt-1 hover:text-green-600 transition-colors duration-300">
              Your day is clear! Add a task to get started.
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default TodayTasks;

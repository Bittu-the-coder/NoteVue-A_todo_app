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

const UpcomingTasks = () => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const { getUpcomingTasks, removeTask } = useTaskContext();
  const [upcomingTasks, setUpcomingTask] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  useEffect(() => {
    const tasks = getUpcomingTasks();
    setUpcomingTask(tasks);
  }, [getUpcomingTasks]);

  console.log("upcoming-------------", upcomingTasks);

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
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Upcoming Tasks
          </h1>
          <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-600 to-purple-600 rounded-full" />
        </div>

        <motion.button
          onClick={() => setShowTaskModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={18} />
          Add Task
        </motion.button>
      </motion.div>

      <motion.div
        className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-blue-100 shadow-lg relative overflow-hidden"
        variants={itemVariants}
      >
        {/* Decorative corner elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-blue-400 rounded-tl-lg" />
        <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-blue-400 rounded-tr-lg" />
        <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-blue-400 rounded-bl-lg" />
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-blue-400 rounded-br-lg" />

        {upcomingTasks.length > 0 ? (
          <motion.div className="space-y-4" variants={containerVariants}>
            {upcomingTasks.map((task, index) => (
              <motion.div
                key={task.id}
                className="flex items-center gap-4 p-4 hover:bg-blue-50 rounded-lg transition-colors group border border-transparent hover:border-blue-100"
                variants={itemVariants}
                custom={index}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center text-blue-600">
                  <Calendar size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-blue-900">{task.title}</h3>
                  <p className="text-sm text-gray-500">{task.description}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm text-blue-500 flex items-center gap-1">
                      {task.date} • {task.time}
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
                {!task.completed && (
                  <button
                    onClick={() => handleEditTask(task)}
                    className="w-8 h-8 rounded-full border border-indigo-200 flex items-center justify-center text-indigo-500 hover:bg-indigo-100 transition-colors"
                  >
                    <Pencil size={16} />
                  </button>
                )}
                <CircleX
                  onClick={() => removeTask(task._id)}
                  className="text-red-600 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center text-blue-400 mb-4">
              <Calendar size={32} />
            </div>
            <h3 className="text-lg font-medium text-blue-800">
              No upcoming tasks
            </h3>
            <p className="text-blue-500 mt-1">
              Tasks with future due dates will appear here
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default UpcomingTasks;

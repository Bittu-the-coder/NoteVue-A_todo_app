import React, { useEffect, useState } from "react";
import {
  ListTodo,
  Plus,
  Check,
  Flag,
  Calendar,
  CheckCircle,
  CircleX,
  Pencil,
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

const AllTasks = () => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [filter, setFilter] = useState("all"); // "all", "active", "completed"
  const { toggleTaskComplete, getAllTasks, removeTask } = useTaskContext();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await getAllTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

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
        onSuccess={fetchTasks}
      />

      <motion.div
        className="flex justify-between items-center"
        variants={itemVariants}
      >
        <div className="relative">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600">
            All Tasks
          </h1>
          <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-indigo-600 to-cyan-600 rounded-full" />
        </div>

        <motion.button
          onClick={() => setShowTaskModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-cyan-600 hover:to-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={18} />
          Add Task
        </motion.button>
      </motion.div>

      <div className="flex items-center justify-center gap-2 mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === "all"
              ? "bg-indigo-100 text-indigo-800"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === "active"
              ? "bg-indigo-100 text-indigo-800"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === "completed"
              ? "bg-indigo-100 text-indigo-800"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Completed
        </button>
      </div>

      <motion.div
        className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-indigo-100 shadow-lg relative overflow-hidden"
        variants={itemVariants}
      >
        {/* Decorative corner elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-indigo-400 rounded-tl-lg" />
        <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-indigo-400 rounded-tr-lg" />
        <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-indigo-400 rounded-bl-lg" />
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-indigo-400 rounded-br-lg" />

        {filteredTasks.length > 0 ? (
          <motion.div className="space-y-4" variants={containerVariants}>
            {filteredTasks.map((task, index) => (
              <motion.div
                key={task._id}
                className={`flex items-center gap-4 p-4 rounded-lg transition-colors group border border-transparent ${
                  task.completed
                    ? "hover:bg-purple-50 hover:border-purple-100"
                    : "hover:bg-indigo-50 hover:border-indigo-100"
                }`}
                variants={itemVariants}
                custom={index}
                whileHover={{ scale: 1.01 }}
              >
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    task.completed
                      ? "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600"
                      : "bg-gradient-to-r from-indigo-100 to-cyan-100 text-indigo-600"
                  }`}
                >
                  {task.completed ? (
                    <CheckCircle size={20} />
                  ) : (
                    <Calendar size={20} />
                  )}
                </div>
                <div className="flex-1">
                  <h3
                    className={`font-medium ${
                      task.completed
                        ? "text-purple-900 line-through opacity-70"
                        : "text-indigo-900"
                    }`}
                  >
                    {task.title}
                  </h3>
                  <p className="text-sm text-gray-500">{task.description}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span
                      className={`text-sm flex items-center gap-1 ${
                        task.completed ? "text-purple-500" : "text-indigo-500"
                      }`}
                    >
                      {task.completed
                        ? `Completed on ${formatDate(task.completedAt)}`
                        : `Due: ${formatDate(task.dueDate)}`}
                    </span>

                    {task.list && (
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
                    )}

                    {!task.completed && task.priority === "high" && (
                      <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full border border-red-100 flex items-center gap-1">
                        <Flag size={10} /> High priority
                      </span>
                    )}
                    {!task.completed && task.priority === "medium" && (
                      <span className="text-xs bg-yellow-50 text-yellow-600 px-2 py-0.5 rounded-full border border-yellow-100 flex items-center gap-1">
                        <Flag size={10} /> Medium
                      </span>
                    )}
                    {!task.completed && task.priority === "low" && (
                      <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full border border-green-100 flex items-center gap-1">
                        <Flag size={10} /> Low
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!task.completed && (
                    <button
                      className="w-8 h-8 rounded-full border border-indigo-200 flex items-center justify-center text-indigo-500 hover:bg-indigo-100 transition-colors"
                      onClick={() => handleToggleComplete(task._id)}
                    >
                      <Check size={16} />
                    </button>
                  )}
                  {!task.completed && (
                    <button
                      onClick={() => handleEditTask(task)}
                      className="w-8 h-8 rounded-full border border-indigo-200 flex items-center justify-center text-indigo-500 hover:bg-indigo-100 transition-colors"
                    >
                      <Pencil size={16} />
                    </button>
                  )}
                  <button onClick={() => handleDeleteTask(task._id)}>
                    <CircleX className="w-8 h-8 text-red-500 hover:text-red-600 transition-colors group-hover:opacity-100 opacity-0" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gradient-to-r from-indigo-100 to-cyan-100 rounded-full flex items-center justify-center text-indigo-400 mb-4">
              <ListTodo size={32} />
            </div>
            <h3 className="text-lg font-medium text-indigo-800">
              No tasks found
            </h3>
            <p className="text-indigo-500 mt-1">
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

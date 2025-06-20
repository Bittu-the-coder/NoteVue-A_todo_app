import { motion } from "framer-motion";
import { CalendarClock, Check, Clock, Flag, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTaskContext } from "../contexts/TaskContext";

const TodayTasksCard = () => {
  const { getTodayTasks, toggleTaskComplete } = useTaskContext();
  const navigate = useNavigate();
  const todaysTasks = getTodayTasks();

  // Animation variants
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

  const handleToggleComplete = async (taskId) => {
    await toggleTaskComplete(taskId);
  };

  return (
    <motion.div
      className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 md:p-6 border border-blue-100 shadow-lg lg:col-span-2 relative overflow-hidden"
      variants={itemVariants}
      whileHover={{ boxShadow: "0 8px 30px rgba(59, 130, 246, 0.15)" }}
    >
      <div className="flex items-center justify-between gap-3 mb-4 md:mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <CalendarClock className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-blue-900">
            Today's Tasks
          </h2>
        </div>
        <button
          onClick={() => navigate("/today")}
          className="text-blue-600 flex items-center gap-1 group text-sm hover:text-blue-800 transition-colors"
        >
          View all
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <motion.div
        className="space-y-3 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {todaysTasks.map((task, index) => (
          <motion.div
            key={task._id}
            className="group flex items-start gap-3 p-3 md:p-4 hover:bg-blue-50 rounded-xl transition-all duration-300 border border-transparent hover:border-blue-100"
            variants={itemVariants}
            custom={index}
            whileHover={{ scale: 1.01 }}
          >
            <motion.button
              className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                task.completed
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  : "border-2 border-blue-300 group-hover:border-blue-500"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => handleToggleComplete(task._id)}
            >
              {task.completed && <Check size={12} />}
            </motion.button>

            <div className="flex-1 min-w-0">
              <p
                className={`font-medium ${
                  task.completed
                    ? "text-blue-400 line-through"
                    : "text-blue-900"
                } truncate`}
              >
                {task.title}
              </p>
              {task.description && (
                <p className="text-sm text-gray-500 line-clamp-2">
                  {task.description}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="text-xs text-blue-500">
                  {task.time || "Anytime"}
                </span>

                {task.priority === "high" && (
                  <motion.span
                    className="flex items-center gap-1 text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Flag size={12} /> High
                  </motion.span>
                )}
                {task.priority === "medium" && (
                  <motion.span
                    className="flex items-center gap-1 text-xs bg-yellow-50 text-yellow-600 px-2 py-0.5 rounded-full"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Flag size={12} /> Medium
                  </motion.span>
                )}
                {task.priority === "low" && (
                  <motion.span
                    className="flex items-center gap-1 text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Flag size={12} /> Low
                  </motion.span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty state */}
      {todaysTasks.length === 0 && (
        <motion.div
          className="text-center py-8 md:py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="mx-auto w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center text-blue-400 mb-4"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 5, 0],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <CalendarClock size={24} className="md:w-8 md:h-8" />
          </motion.div>
          <h3 className="text-base md:text-lg font-medium text-blue-800">
            No tasks for today
          </h3>
          <p className="text-sm text-blue-500 mt-1">
            Your schedule is clear. Add tasks to get started!
          </p>
        </motion.div>
      )}

      {/* Decorative corner elements */}
      <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-blue-400 rounded-tl-lg" />
      <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-blue-400 rounded-tr-lg" />
      <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-blue-400 rounded-bl-lg" />
      <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-blue-400 rounded-br-lg" />
    </motion.div>
  );
};

export default TodayTasksCard;

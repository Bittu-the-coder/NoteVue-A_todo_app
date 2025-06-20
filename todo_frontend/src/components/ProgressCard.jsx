import { motion } from "framer-motion";
import { BarChart3, Sparkles } from "lucide-react";
import { useTaskContext } from "../contexts/TaskContext";
import { useTheme } from "../contexts/ThemeContext";

const StatsMotivationCard = ({ quote }) => {
  const { getTodayTasks, getWeeklyTasks } = useTaskContext();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  // Calculate today's completion percentage
  const todayTasks = getTodayTasks();
  const todayCompleted = todayTasks.filter((t) => t.completed).length;
  const todayTotal = todayTasks.length;
  const todayPercentage = Math.round(
    (todayCompleted / Math.max(1, todayTotal)) * 100
  );

  // Calculate overall completion percentage (or weekly if you implement it)
  const tasks = getWeeklyTasks();
  const totalCompleted = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;
  const overallPercentage = Math.round(
    (totalCompleted / Math.max(1, totalTasks)) * 100
  );

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className={`${
        isDarkMode
          ? "bg-gray-800/90 border-gray-700 text-white"
          : "bg-white/80 border-purple-100"
      } backdrop-blur-lg rounded-2xl p-6 border shadow-lg relative overflow-hidden`}
      variants={itemVariants}
      whileHover={{
        boxShadow: isDarkMode
          ? "0 8px 30px rgba(139, 92, 246, 0.15)"
          : "0 8px 30px rgba(139, 92, 246, 0.15)",
      }}
    >
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div
          className={`p-2 ${
            isDarkMode ? "bg-purple-900/50" : "bg-purple-100"
          } rounded-lg`}
        >
          <BarChart3
            className={`w-6 h-6 ${
              isDarkMode ? "text-purple-400" : "text-purple-600"
            }`}
          />
        </div>
        <h2
          className={`text-2xl font-bold ${
            isDarkMode ? "text-purple-300" : "text-purple-900"
          }`}
        >
          Progress
        </h2>
      </div>

      <div className="space-y-6 relative z-10">
        {/* Today's Completion */}
        <div>
          <div className="flex justify-between mb-2">
            <p
              className={`text-sm ${
                isDarkMode ? "text-purple-300" : "text-purple-700"
              }`}
            >
              Today's completion
            </p>
            <p
              className={`text-sm font-bold ${
                isDarkMode ? "text-purple-300" : "text-purple-700"
              }`}
            >
              {todayPercentage}%
            </p>
          </div>
          <div
            className={`w-full ${
              isDarkMode ? "bg-purple-900/30" : "bg-purple-100"
            } rounded-full h-2.5`}
          >
            <motion.div
              className={`bg-gradient-to-r ${
                isDarkMode
                  ? "from-indigo-500 to-purple-500"
                  : "from-indigo-400 to-purple-600"
              } h-2.5 rounded-full`}
              initial={{ width: "0%" }}
              animate={{ width: `${todayPercentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>

        {/* Weekly Goals */}
        <div>
          <div className="flex justify-between mb-2">
            <p
              className={`text-sm ${
                isDarkMode ? "text-purple-300" : "text-purple-700"
              }`}
            >
              Weekly goals
            </p>
            <p
              className={`text-sm font-bold ${
                isDarkMode ? "text-purple-300" : "text-purple-700"
              }`}
            >
              {overallPercentage}%
            </p>
          </div>
          <div
            className={`w-full ${
              isDarkMode ? "bg-purple-900/30" : "bg-purple-100"
            } rounded-full h-2.5`}
          >
            <motion.div
              className={`bg-gradient-to-r ${
                isDarkMode
                  ? "from-blue-500 to-indigo-500"
                  : "from-blue-400 to-indigo-600"
              } h-2.5 rounded-full`}
              initial={{ width: "0%" }}
              animate={{ width: `${overallPercentage}%` }}
              transition={{ duration: 1, delay: 0.7 }}
            />
          </div>
        </div>

        {/* Motivational Quote */}
        {quote && (
          <motion.div
            className={`mt-6 p-4 ${
              isDarkMode
                ? "bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-gray-700"
                : "bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-100"
            } rounded-lg border`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.8,
              duration: 0.6,
              type: "spring",
            }}
            whileHover={{ scale: 1.01 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mb-2"
            >
              <Sparkles
                className={`w-4 h-4 ${
                  isDarkMode ? "text-indigo-400" : "text-indigo-600"
                }`}
              />
            </motion.div>
            <p
              className={`${
                isDarkMode ? "text-indigo-200" : "text-indigo-800"
              } italic`}
            >
              {`"${quote.content}"`}
            </p>
            <p
              className={`${
                isDarkMode ? "text-indigo-400" : "text-indigo-600"
              } text-sm mt-1`}
            >
              {`- ${quote.author || "Unknown"}`}
            </p>
          </motion.div>
        )}
      </div>

      {/* Decorative corner elements */}
      <div
        className={`absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 ${
          isDarkMode ? "border-purple-500/30" : "border-purple-400"
        } rounded-tl-lg`}
      />
      <div
        className={`absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 ${
          isDarkMode ? "border-purple-500/30" : "border-purple-400"
        } rounded-tr-lg`}
      />
      <div
        className={`absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 ${
          isDarkMode ? "border-purple-500/30" : "border-purple-400"
        } rounded-bl-lg`}
      />
      <div
        className={`absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 ${
          isDarkMode ? "border-purple-500/30" : "border-purple-400"
        } rounded-br-lg`}
      />
    </motion.div>
  );
};

export default StatsMotivationCard;

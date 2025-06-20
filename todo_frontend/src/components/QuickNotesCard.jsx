import { motion } from "framer-motion";
import { NotebookPen, ArrowRight, Plus, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { useTheme } from "../contexts/ThemeContext";

const QuickNotesCard = ({
  recentNotes = [],
  onAddNote,
  showEmptyState = true,
}) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className={`${
        isDarkMode
          ? "bg-gray-800/90 border-gray-700 text-white"
          : "bg-white/80 border-indigo-100"
      } backdrop-blur-lg rounded-2xl p-6 border shadow-lg lg:col-span-3 relative overflow-hidden`}
      variants={itemVariants}
      whileHover={{
        boxShadow: isDarkMode
          ? "0 8px 30px rgba(79, 70, 229, 0.15)"
          : "0 8px 30px rgba(79, 70, 229, 0.15)",
      }}
    >
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 ${
              isDarkMode ? "bg-indigo-900/50" : "bg-indigo-100"
            } rounded-lg`}
          >
            <NotebookPen
              className={`w-6 h-6 ${
                isDarkMode ? "text-indigo-400" : "text-indigo-600"
              }`}
            />
          </div>
          <h2
            className={`text-2xl font-bold ${
              isDarkMode ? "text-indigo-300" : "text-indigo-900"
            }`}
          >
            Quick Notes
          </h2>
        </div>
        <button
          onClick={() => navigate("/sticky-wall")}
          className={`${
            isDarkMode
              ? "text-indigo-400 hover:text-indigo-300"
              : "text-indigo-600 hover:text-indigo-800"
          } flex items-center gap-1 group text-sm transition-colors`}
        >
          View all notes
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {recentNotes.length > 0
          ? recentNotes.slice(0, 5).map((note, index) => (
              <motion.div
                key={note._id || index}
                className={`p-5 ${
                  isDarkMode
                    ? note.color
                      ? `${note.color.replace("bg-", "bg-opacity-90 ")}`
                      : "bg-gray-700"
                    : note.color || "bg-white"
                } rounded-xl border ${
                  isDarkMode ? "border-gray-600" : "border-indigo-50"
                } shadow-sm overflow-hidden h-48 flex flex-col`}
                variants={itemVariants}
                custom={index}
                whileHover={{
                  scale: 1.02,
                  boxShadow: `0 4px 20px ${
                    isDarkMode
                      ? "rgba(79, 70, 229, 0.2)"
                      : "rgba(79, 70, 229, 0.1)"
                  }`,
                }}
              >
                <div
                  className={`prose prose-sm max-w-none ${
                    isDarkMode ? "text-gray-200" : "text-indigo-800"
                  } flex-grow overflow-hidden line-clamp-5`}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(note.content),
                  }}
                />

                <div
                  className={`mt-3 flex items-center justify-between pt-2 border-t ${
                    isDarkMode ? "border-gray-600" : "border-indigo-50"
                  }`}
                >
                  <div
                    className={`flex items-center gap-1 text-xs ${
                      isDarkMode ? "text-indigo-400" : "text-indigo-500"
                    }`}
                  >
                    <Clock size={12} />
                    {new Date(note.updatedAt || Date.now()).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </div>

                  {note.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1 justify-end">
                      {note.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag._id || tag}
                          className={`px-2 py-0.5 text-xs ${
                            isDarkMode
                              ? "bg-gray-800/50 text-indigo-300 border-gray-600"
                              : "bg-white/50 text-indigo-600 border-indigo-100"
                          } rounded-full border`}
                        >
                          {tag.name || tag}
                        </span>
                      ))}
                      {note.tags.length > 2 && (
                        <span
                          className={`px-2 py-0.5 text-xs ${
                            isDarkMode
                              ? "bg-gray-800/50 text-indigo-300 border-gray-600"
                              : "bg-white/50 text-indigo-600 border-indigo-100"
                          } rounded-full border`}
                        >
                          +{note.tags.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          : showEmptyState && (
              <motion.div
                variants={itemVariants}
                className={`md:col-span-2 lg:col-span-3 p-8 text-center ${
                  isDarkMode ? "text-indigo-400" : "text-indigo-500"
                }`}
              >
                No notes yet. Create your first note!
              </motion.div>
            )}

        <motion.div
          className={`p-5 ${
            isDarkMode
              ? "bg-gradient-to-r from-green-900/30 to-teal-900/30 border-gray-700"
              : "bg-gradient-to-r from-green-50 to-teal-50 border-green-100"
          } border rounded-xl shadow-sm flex items-center justify-center cursor-pointer h-48`}
          variants={itemVariants}
          whileHover={{
            scale: 1.02,
            boxShadow: `0 4px 20px ${
              isDarkMode ? "rgba(79, 70, 229, 0.2)" : "rgba(79, 70, 229, 0.1)"
            }`,
          }}
          onClick={onAddNote}
        >
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <div
                className={`p-3 ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } rounded-full shadow-sm`}
              >
                <Plus
                  className={`w-6 h-6 ${
                    isDarkMode ? "text-green-500" : "text-green-600"
                  }`}
                />
              </div>
            </div>
            <p className={isDarkMode ? "text-green-500" : "text-green-800"}>
              Add new note
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative corner elements */}
      <div
        className={`absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 ${
          isDarkMode ? "border-indigo-500/30" : "border-indigo-400"
        } rounded-tl-lg`}
      />
      <div
        className={`absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 ${
          isDarkMode ? "border-indigo-500/30" : "border-indigo-400"
        } rounded-tr-lg`}
      />
      <div
        className={`absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 ${
          isDarkMode ? "border-indigo-500/30" : "border-indigo-400"
        } rounded-bl-lg`}
      />
      <div
        className={`absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 ${
          isDarkMode ? "border-indigo-500/30" : "border-indigo-400"
        } rounded-br-lg`}
      />
    </motion.div>
  );
};

export default QuickNotesCard;

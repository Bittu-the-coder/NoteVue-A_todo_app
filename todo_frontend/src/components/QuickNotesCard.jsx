import { motion } from "framer-motion";
import { NotebookPen, ArrowRight, Plus, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

const QuickNotesCard = ({
  recentNotes = [],
  onAddNote,
  showEmptyState = true,
}) => {
  const navigate = useNavigate();

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
      className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-indigo-100 shadow-lg lg:col-span-3 relative overflow-hidden"
      variants={itemVariants}
      whileHover={{ boxShadow: "0 8px 30px rgba(79, 70, 229, 0.15)" }}
    >
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <NotebookPen className="w-6 h-6 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-indigo-900">Quick Notes</h2>
        </div>
        <button
          onClick={() => navigate("/sticky-wall")}
          className="text-indigo-600 flex items-center gap-1 group text-sm hover:text-indigo-800 transition-colors"
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
                  note.color || "bg-white"
                } rounded-xl border shadow-sm overflow-hidden h-48 flex flex-col`}
                variants={itemVariants}
                custom={index}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 4px 20px rgba(79, 70, 229, 0.1)",
                }}
              >
                <div
                  className="prose prose-sm max-w-none text-indigo-800 flex-grow overflow-hidden line-clamp-5"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(note.content),
                  }}
                />

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-indigo-50">
                  <div className="flex items-center gap-1 text-xs text-indigo-500">
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
                          className="px-2 py-0.5 text-xs bg-white/50 rounded-full text-indigo-600 border border-indigo-100"
                        >
                          {tag.name || tag}
                        </span>
                      ))}
                      {note.tags.length > 2 && (
                        <span className="px-2 py-0.5 text-xs bg-white/50 rounded-full text-indigo-600 border border-indigo-100">
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
                className="md:col-span-2 lg:col-span-3 p-8 text-center text-indigo-500"
              >
                No notes yet. Create your first note!
              </motion.div>
            )}

        <motion.div
          className="p-5 bg-gradient-to-r from-green-50 to-teal-50 border border-green-100 rounded-xl shadow-sm flex items-center justify-center cursor-pointer h-48"
          variants={itemVariants}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 4px 20px rgba(79, 70, 229, 0.1)",
          }}
          onClick={onAddNote}
        >
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <div className="p-3 bg-white rounded-full shadow-sm">
                <Plus className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-green-800">Add new note</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative corner elements */}
      <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-indigo-400 rounded-tl-lg" />
      <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-indigo-400 rounded-tr-lg" />
      <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-indigo-400 rounded-bl-lg" />
      <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-indigo-400 rounded-br-lg" />
    </motion.div>
  );
};

export default QuickNotesCard;

import React, { useState, useEffect } from "react";
import { FiPlus, FiX, FiEdit2, FiTrash2, FiClock } from "react-icons/fi";
import { motion } from "framer-motion";
import AddNoteModal from "../components/AddNote";
import { useNotesContext } from "../contexts/NoteContext";
import { useTheme } from "../contexts/ThemeContext";
import DOMPurify from "dompurify";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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

const StickyWall = () => {
  const { notes, loading, error, getAllNotes, removeNote } = useNotesContext();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const fetchNotes = async () => {
    try {
      await getAllNotes();
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []); // Initial fetch

  const handleDeleteNote = async (id) => {
    try {
      await removeNote(id);
      await fetchNotes(); // Refresh the notes list
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setShowNoteModal(true);
  };

  const handleCloseModal = () => {
    setShowNoteModal(false);
    setEditingNote(null);
  };

  if (loading)
    return (
      <div
        className={`text-center py-20 ${
          isDarkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        Loading notes...
      </div>
    );
  if (error)
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;

  return (
    <motion.div
      className={`space-y-4 md:space-y-6 min-h-[85vh] px-2 md:px-0 ${
        isDarkMode ? "text-gray-200" : "text-gray-800"
      }`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <AddNoteModal
        isOpen={showNoteModal}
        onClose={handleCloseModal}
        isEditing={!!editingNote}
        note={editingNote}
        noteId={editingNote?._id}
        onSuccess={fetchNotes}
      />
      <motion.div variants={itemVariants} className="relative">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
          Sticky Wall
        </h1>
        <div
          className={`absolute -left-4 top-0 w-1 h-full bg-gradient-to-b ${
            isDarkMode
              ? "from-purple-400 to-indigo-400"
              : "from-purple-600 to-indigo-600"
          } rounded-full`}
        />
      </motion.div>
      <motion.div
        className={`${
          isDarkMode
            ? "bg-gray-800/90 border-gray-700 text-gray-200"
            : "bg-white/80 border-purple-100 text-gray-800"
        } backdrop-blur-lg rounded-xl p-4 md:p-6 border shadow-lg relative overflow-hidden`}
        variants={itemVariants}
      >
        {/* Decorative corner elements */}
        <div
          className={`absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 ${
            isDarkMode ? "border-purple-500" : "border-purple-400"
          } rounded-tl-lg`}
        />
        <div
          className={`absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 ${
            isDarkMode ? "border-purple-500" : "border-purple-400"
          } rounded-tr-lg`}
        />
        <div
          className={`absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 ${
            isDarkMode ? "border-purple-500" : "border-purple-400"
          } rounded-bl-lg`}
        />
        <div
          className={`absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 ${
            isDarkMode ? "border-purple-500" : "border-purple-400"
          } rounded-br-lg`}
        />

        <motion.div className="flex justify-center">
          <motion.button
            onClick={() => setShowNoteModal(true)}
            className={`flex items-center gap-2 bg-gradient-to-r ${
              isDarkMode
                ? "from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500"
                : "from-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600"
            } text-white px-4 py-2 md:px-5 md:py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-sm md:text-base`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiPlus size={18} />
            Create New Note
          </motion.button>
        </motion.div>
      </motion.div>
      {/* Sticky notes grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
        variants={containerVariants}
      >
        {notes.map((note) => (
          <motion.div
            key={note._id}
            className={`${
              note.color
            } rounded-xl p-4 md:p-5 shadow-md relative min-h-[180px] flex flex-col border ${
              isDarkMode ? "border-gray-700" : "border-opacity-30"
            } backdrop-blur-sm`}
            variants={itemVariants}
            whileHover={{
              scale: 1.02,
              boxShadow: isDarkMode
                ? "0 10px 15px -3px rgba(0, 0, 0, 0.3)"
                : "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            }}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.1}
          >
            {/* Note content with HTML rendering */}
            <div
              className={`prose prose-sm max-w-none flex-1 ${
                isDarkMode
                  ? "text-black prose-headings:text-gray-200"
                  : "text-gray-800"
              } break-words`}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(note.content),
              }}
            />

            {/* Note footer with metadata and actions */}
            <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
              <div className="flex gap-2 items-center flex-1 min-w-0">
                <div
                  className={`flex items-center gap-1 text-xs ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  } flex-shrink-0`}
                >
                  <FiClock size={12} />
                  {new Date(note.updatedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>

                {/* Tags display */}
                {note.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1 overflow-hidden">
                    {note.tags
                      .slice(0, window.innerWidth < 640 ? 1 : 2)
                      .map((tag) => (
                        <span
                          key={tag._id}
                          className={`px-2 py-0.5 text-xs ${
                            isDarkMode
                              ? "bg-violet-700/50 text-indigo-100 border-gray-600"
                              : "bg-white/50 text-indigo-600 border-indigo-100"
                          } rounded-full border whitespace-nowrap`}
                        >
                          {tag.name}
                        </span>
                      ))}
                    {note.tags.length > (window.innerWidth < 640 ? 1 : 2) && (
                      <span
                        className={`px-2 py-0.5 text-xs ${
                          isDarkMode
                            ? "bg-gray-700/50 text-indigo-300 border-gray-600"
                            : "bg-white/50 text-indigo-600 border-indigo-100"
                        } rounded-full border`}
                      >
                        +{note.tags.length - (window.innerWidth < 640 ? 1 : 2)}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <motion.button
                  onClick={() => handleEditNote(note)}
                  className={`p-2 ${
                    isDarkMode
                      ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700/30"
                      : "text-gray-600 hover:text-gray-800 hover:bg-white/30"
                  } rounded-full transition-colors`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiEdit2 size={16} />
                </motion.button>
                <motion.button
                  onClick={() => handleDeleteNote(note._id)}
                  className={`p-2 ${
                    isDarkMode
                      ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700/30"
                      : "text-gray-600 hover:text-gray-800 hover:bg-white/30"
                  } rounded-full transition-colors`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiTrash2 size={16} />
                </motion.button>
              </div>
            </div>

            {/* Decorative corner element */}
            <div
              className={`absolute -bottom-1 -right-1 w-5 h-5 ${
                isDarkMode ? "bg-gray-700/40" : "bg-white/40"
              } rounded-tl-lg`}
            />
          </motion.div>
        ))}
      </motion.div>
      {/* Empty state */}
      {notes.length === 0 && (
        <motion.div
          className={`text-center py-12 md:py-20 ${
            isDarkMode ? "text-gray-300" : "text-gray-800"
          }`}
          variants={itemVariants}
        >
          <motion.div
            className={`mx-auto w-20 h-20 md:w-24 md:h-24 ${
              isDarkMode
                ? "bg-gradient-to-r from-purple-900/50 to-indigo-900/50 text-purple-400"
                : "bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-500"
            } rounded-full flex items-center justify-center mb-4`}
            whileHover={{ rotate: 5 }}
            whileTap={{ rotate: -5, scale: 0.9 }}
          >
            <FiPlus size={36} />
          </motion.div>
          <h3
            className={`text-lg font-medium ${
              isDarkMode ? "text-purple-300" : "text-purple-800"
            }`}
          >
            No notes yet
          </h3>
          <p className={isDarkMode ? "text-purple-400" : "text-purple-500"}>
            Create your first note to get started!
          </p>
        </motion.div>
      )}
      {/* Mobile Add Button */}
      <motion.button
        className={`fixed bottom-6 right-6 p-3 bg-gradient-to-r ${
          isDarkMode
            ? "from-purple-500 to-indigo-500"
            : "from-purple-600 to-indigo-600"
        } text-white rounded-full shadow-lg md:hidden z-20`}
        whileHover={{
          scale: 1.1,
          boxShadow: isDarkMode
            ? "0 0 15px rgba(167, 139, 250, 0.3)"
            : "0 0 15px rgba(139, 92, 246, 0.5)",
        }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => setShowNoteModal(true)}
      >
        <FiPlus size={24} />
      </motion.button>
    </motion.div>
  );
};

export default StickyWall;

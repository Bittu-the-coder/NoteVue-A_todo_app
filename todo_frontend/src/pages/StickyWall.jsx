import React, { useState, useEffect } from "react";
import { FiPlus, FiX, FiEdit2, FiTrash2, FiClock } from "react-icons/fi";
import { motion } from "framer-motion";
import AddNoteModal from "../components/AddNote";
import { useNotesContext } from "../contexts/NoteContext";
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

  if (loading) return <div className="text-center py-20">Loading notes...</div>;
  if (error)
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;

  return (
    <motion.div
      className="space-y-6 min-h-[85vh]"
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
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
          Sticky Wall
        </h1>
        <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-purple-600 to-indigo-600 rounded-full" />
      </motion.div>

      {/* Add new note button */}
      <motion.div
        className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-purple-100 shadow-lg relative overflow-hidden"
        variants={itemVariants}
      >
        {/* Decorative corner elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-purple-400 rounded-tl-lg" />
        <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-purple-400 rounded-tr-lg" />
        <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-purple-400 rounded-bl-lg" />
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-purple-400 rounded-br-lg" />

        <motion.div className="flex justify-center">
          <motion.button
            onClick={() => setShowNoteModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 text-white px-5 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        variants={containerVariants}
      >
        {notes.map((note) => (
          <motion.div
            key={note._id}
            className={`${note.color} rounded-xl p-5 shadow-md relative min-h-[180px] flex flex-col border border-opacity-30 backdrop-blur-sm`}
            variants={itemVariants}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            }}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.1}
          >
            {/* Note content with HTML rendering */}
            <div
              className="prose prose-sm max-w-none flex-1 text-gray-800 break-words"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(note.content),
              }}
            />

            {/* Note footer with metadata and actions */}
            <div className="mt-3 flex items-center justify-between">
              <div className="flex gap-2 items-center flex-1">
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <FiClock size={12} />
                  {new Date(note.updatedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
                {/* Tags display */}
                {note.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {note.tags.map((tag) => (
                      <span
                        key={tag._id}
                        className="px-2 py-0.5 text-xs bg-white/50 rounded-full text-indigo-600 border border-indigo-100"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <motion.button
                  onClick={() => handleEditNote(note)}
                  className="p-2 text-gray-600 hover:text-gray-800 rounded-full hover:bg-white/30 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiEdit2 size={16} />
                </motion.button>
                <motion.button
                  onClick={() => handleDeleteNote(note._id)}
                  className="p-2 text-gray-600 hover:text-gray-800 rounded-full hover:bg-white/30 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiTrash2 size={16} />
                </motion.button>
              </div>
            </div>

            {/* Decorative corner element */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white/40 rounded-tl-lg" />
          </motion.div>
        ))}
      </motion.div>

      {/* Empty state */}
      {notes.length === 0 && (
        <motion.div className="text-center py-20" variants={itemVariants}>
          <motion.div
            className="mx-auto w-24 h-24 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full flex items-center justify-center text-purple-500 mb-4"
            whileHover={{ rotate: 5 }}
            whileTap={{ rotate: -5, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => setShowNoteModal(true)}
          >
            <FiPlus size={36} />
          </motion.div>
          <h3 className="text-xl font-medium text-purple-800 mb-2">
            No notes yet
          </h3>
          <p className="text-purple-600">
            Create your first note to get started!
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default StickyWall;

import React, { useState } from "react";
import { FiPlus, FiX, FiEdit2, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";
import AddNoteModal from "../components/AddNote";

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
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: "Brainstorm ideas for new project",
      color: "bg-yellow-100",
    },
    { id: 2, content: "Meeting notes with design team", color: "bg-blue-100" },
    { id: 3, content: "Personal goals for this month", color: "bg-green-100" },
  ]);
  const [newNote, setNewNote] = useState("");
  const [showNoteModal, setShowNoteModal] = useState(false);

  const handleAddNote = (noteData) => {
    console.log("Adding note:", noteData);
    // Call your API here
  };

  // const addNote = () => {
  //   if (newNote.trim()) {
  //     const colors = [
  //       "bg-gradient-to-br from-yellow-50 to-yellow-100",
  //       "bg-gradient-to-br from-blue-50 to-blue-100",
  //       "bg-gradient-to-br from-pink-50 to-pink-100",
  //       "bg-gradient-to-br from-green-50 to-green-100",
  //       "bg-gradient-to-br from-purple-50 to-purple-100",
  //     ];
  //     const randomColor = colors[Math.floor(Math.random() * colors.length)];

  //     setNotes([
  //       ...notes,
  //       {
  //         id: Date.now(),
  //         content: newNote,
  //         color: randomColor,
  //       },
  //     ]);
  //     setNewNote("");
  //     setShowAddNote(false);
  //   }
  // };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <motion.div
      className="space-y-6 min-h-[85vh]"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <AddNoteModal
        isOpen={showNoteModal}
        onClose={() => setShowNoteModal(false)}
        onSubmit={handleAddNote}
      />
      <motion.div variants={itemVariants} className="relative">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
          Sticky Wall
        </h1>
        <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-purple-600 to-indigo-600 rounded-full" />
      </motion.div>

      {/* Add new note */}
      <motion.div
        className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-purple-100 shadow-lg relative overflow-hidden"
        variants={itemVariants}
      >
        {/* Decorative corner elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-purple-400 rounded-tl-lg" />
        <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-purple-400 rounded-tr-lg" />
        <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-purple-400 rounded-bl-lg" />
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-purple-400 rounded-br-lg" />

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
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
            key={note.id}
            className={`${note.color} rounded-xl p-5 shadow-md relative min-h-[180px] flex flex-col border border-opacity-30 backdrop-blur-sm`}
            variants={itemVariants}
            whileHover={{
              scale: 1.03,
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            }}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.1}
          >
            <p className="flex-1 text-gray-800 whitespace-pre-wrap break-words">
              {note.content}
            </p>
            <div className="flex justify-end gap-2 mt-3">
              <motion.button
                className="p-2 text-gray-600 hover:text-gray-800 rounded-full hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiEdit2 size={16} />
              </motion.button>
              <motion.button
                onClick={() => deleteNote(note.id)}
                className="p-2 text-gray-600 hover:text-gray-800 rounded-full hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiTrash2 size={16} />
              </motion.button>
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

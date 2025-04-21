import React, { useState } from "react";
import { FiPlus, FiX, FiEdit2, FiTrash2 } from "react-icons/fi";

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

  const addNote = () => {
    if (newNote.trim()) {
      const colors = [
        "bg-yellow-100",
        "bg-blue-100",
        "bg-pink-100",
        "bg-green-100",
        "bg-purple-100",
      ];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      setNotes([
        ...notes,
        {
          id: Date.now(),
          content: newNote,
          color: randomColor,
        },
      ]);
      setNewNote("");
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-900">Sticky Wall</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
            <FiPlus size={18} />
            Add Note
          </button>
        </div>
      </div>

      {/* Add new note */}
      <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-purple-100 shadow-sm">
        <div className="flex gap-3">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Write your note here..."
            className="flex-1 bg-white border border-purple-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <button
            onClick={addNote}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Save
          </button>
        </div>
      </div>

      {/* Sticky notes grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`${note.color} rounded-xl p-4 shadow-md relative min-h-[150px] flex flex-col`}
          >
            <p className="flex-1 text-gray-800">{note.content}</p>
            <div className="flex justify-end gap-2 mt-3">
              <button className="p-1.5 text-gray-600 hover:text-gray-800 rounded-full hover:bg-white/30 transition-colors">
                <FiEdit2 size={16} />
              </button>
              <button
                onClick={() => deleteNote(note.id)}
                className="p-1.5 text-gray-600 hover:text-gray-800 rounded-full hover:bg-white/30 transition-colors"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StickyWall;

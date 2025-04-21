import { useState } from "react";
import { FiX } from "react-icons/fi";

const COLORS = [
  { name: "Yellow", value: "bg-yellow-100" },
  { name: "Blue", value: "bg-blue-100" },
  { name: "Green", value: "bg-green-100" },
  { name: "Pink", value: "bg-pink-100" },
  { name: "Purple", value: "bg-purple-100" },
];

const AddNoteModal = ({ isOpen, onClose, onSubmit }) => {
  const [noteData, setNoteData] = useState({
    content: "",
    color: COLORS[0].value,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(noteData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-purple-900">
            Add New Note
          </h3>
          <button
            onClick={onClose}
            className="text-purple-400 hover:text-purple-600"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Note Content
            </label>
            <textarea
              value={noteData.content}
              onChange={(e) =>
                setNoteData({ ...noteData, content: e.target.value })
              }
              className="w-full h-32 border text-black border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-300 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <div className="flex gap-2">
              {COLORS.map((color) => (
                <button
                  type="button"
                  key={color.value}
                  onClick={() =>
                    setNoteData({ ...noteData, color: color.value })
                  }
                  className={`w-8 h-8 rounded-full ${color.value} ${
                    noteData.color === color.value
                      ? "ring-2 ring-offset-2 ring-purple-500"
                      : ""
                  }`}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
            >
              Add Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNoteModal;

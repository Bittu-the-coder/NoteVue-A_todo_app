import { useState } from "react";
import { FiX } from "react-icons/fi";

const COLORS = [
  { name: "Purple", value: "#8B5CF6" },
  { name: "Blue", value: "#3B82F6" },
  { name: "Red", value: "#EF4444" },
  { name: "Green", value: "#10B981" },
  { name: "Yellow", value: "#F59E0B" },
];

const AddListModal = ({ isOpen, onClose, onSubmit }) => {
  const [listData, setListData] = useState({
    name: "",
    color: COLORS[0].value,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(listData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2">
      <div className="bg-white rounded-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-purple-900">
            Create New List
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
              List Name
            </label>
            <input
              type="text"
              value={listData.name}
              onChange={(e) =>
                setListData({ ...listData, name: e.target.value })
              }
              className="w-full border text-black border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-300 focus:border-transparent"
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
                    setListData({ ...listData, color: color.value })
                  }
                  className={`w-8 h-8 rounded-full ${
                    listData.color === color.value
                      ? "ring-2 ring-offset-2 ring-purple-500"
                      : ""
                  }`}
                  style={{ backgroundColor: color.value }}
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
              Create List
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListModal;

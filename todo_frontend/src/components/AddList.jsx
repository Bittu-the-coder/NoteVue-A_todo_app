import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext";

const COLORS = [
  { name: "Purple", value: "#8B5CF6" },
  { name: "Blue", value: "#3B82F6" },
  { name: "Red", value: "#EF4444" },
  { name: "Green", value: "#10B981" },
  { name: "Yellow", value: "#F59E0B" },
];

const AddListModal = ({ isOpen, onClose, onSubmit, editingList }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [listData, setListData] = useState({
    name: "",
    color: COLORS[0].value,
  });

  // Update form when editing a list
  useEffect(() => {
    if (editingList) {
      setListData({
        name: editingList.name || "",
        color: editingList.color || COLORS[0].value,
      });
    } else {
      // Reset form when not editing
      setListData({
        name: "",
        color: COLORS[0].value,
      });
    }
  }, [editingList, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingList) {
      // If editing, pass the ID with the updated data
      onSubmit({ ...listData, _id: editingList._id });
    } else {
      // If creating new list
      onSubmit(listData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 ${
        isDarkMode ? "bg-gray-950/75" : "bg-black/50"
      } flex items-center justify-center z-50 p-2 backdrop-blur-sm`}
    >
      <div
        className={`${
          isDarkMode ? "bg-gray-900" : "bg-white"
        } rounded-xl w-full max-w-md`}
      >
        <div
          className={`flex justify-between items-center p-4 border-b ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <h3
            className={`text-lg font-semibold ${
              isDarkMode ? "text-purple-400" : "text-purple-900"
            }`}
          >
            {editingList ? "Edit List" : "Create New List"}
          </h3>
          <button
            onClick={onClose}
            className={`${
              isDarkMode
                ? "text-gray-400 hover:text-gray-300"
                : "text-purple-400 hover:text-purple-600"
            }`}
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label
              className={`block text-sm font-medium ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              } mb-1`}
            >
              List Name
            </label>
            <input
              type="text"
              value={listData.name}
              onChange={(e) =>
                setListData({ ...listData, name: e.target.value })
              }
              className={`w-full border ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700 text-white focus:ring-purple-500"
                  : "bg-white border-gray-300 text-black focus:ring-purple-300"
              } rounded-lg px-3 py-2 focus:ring-2 focus:border-transparent`}
              required
            />
          </div>

          <div>
            <label
              className={`block text-sm font-medium ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              } mb-1`}
            >
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
                      ? `ring-2 ring-offset-2 ${
                          isDarkMode
                            ? "ring-purple-400 ring-offset-gray-900"
                            : "ring-purple-500 ring-offset-white"
                        }`
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
              className={`px-4 py-2 border ${
                isDarkMode
                  ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              } rounded-lg`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 ${
                isDarkMode
                  ? "bg-purple-700 hover:bg-purple-800"
                  : "bg-purple-600 hover:bg-purple-700"
              } text-white rounded-lg`}
            >
              {editingList ? "Update List" : "Create List"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListModal;

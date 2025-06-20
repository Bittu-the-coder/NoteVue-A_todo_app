import { useState } from "react";
import { FiX, FiTag } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { addTag } from "../services/tags";
import { useTheme } from "../contexts/ThemeContext";

const AddTagModal = ({ isOpen, onClose, onSubmit }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tag = await addTag({ name });
    setName("");
    // console.log("Tag added:", tag);
    onSubmit(tag);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 ${
        isDarkMode ? "bg-gray-950/75" : "bg-black/50"
      } flex items-center justify-center z-50 p-4 backdrop-blur-sm`}
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
            Create New Tag
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
          <div
            className={`flex items-center gap-3 p-3 ${
              isDarkMode ? "bg-purple-900/20" : "bg-purple-50"
            } rounded-lg`}
          >
            <FiTag
              className={isDarkMode ? "text-purple-400" : "text-purple-600"}
            />
            <div
              className={`flex-1 ${
                isDarkMode ? "text-gray-200" : "text-purple-900"
              }`}
            >
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`flex-1 bg-transparent focus:outline-none ${
                  isDarkMode
                    ? "text-gray-200 placeholder-gray-500"
                    : "text-purple-900 placeholder-purple-400"
                }`}
                placeholder="Tag name"
                required
              />
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
              <AiOutlineClose size={16} />
            </button>
            <button
              type="submit"
              className={`px-4 py-2 ${
                isDarkMode
                  ? "bg-purple-700 hover:bg-purple-800"
                  : "bg-purple-600 hover:bg-purple-700"
              } text-white rounded-lg`}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTagModal;

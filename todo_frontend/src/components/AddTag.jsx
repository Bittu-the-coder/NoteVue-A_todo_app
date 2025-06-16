import { useState } from "react";
import { FiX, FiTag } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

const AddTagModal = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-purple-900">
            Create New Tag
          </h3>
          <button
            onClick={onClose}
            className="text-purple-400 hover:text-purple-600"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
            <FiTag className="text-purple-600" />
            <div className="flex-1 text-purple-900">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 bg-transparent focus:outline-none color-purple-900 placeholder-purple-400"
                placeholder="Tag name"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <AiOutlineClose size={16} />
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
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

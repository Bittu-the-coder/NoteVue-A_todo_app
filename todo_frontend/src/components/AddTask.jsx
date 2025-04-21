import { useState } from "react";
import { FiX, FiCalendar, FiFlag, FiList } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddTaskModal = ({
  isOpen,
  onClose,
  lists,
  tags,
  onSubmit,
  className,
}) => {
  const [taskData, setTaskData] = useState({
    title: "",
    dueDate: null,
    priority: "medium",
    listId: lists[0]?.id || "",
    tagIds: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(taskData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={`${className} fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4`}
    >
      <div className="bg-white rounded-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-purple-900">
            Add New Task
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
              Task Title
            </label>
            <input
              type="text"
              value={taskData.title}
              onChange={(e) =>
                setTaskData({ ...taskData, title: e.target.value })
              }
              className="w-full border text-black border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-300 focus:border-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <FiCalendar /> Due Date
              </label>
              <DatePicker
                selected={taskData.dueDate}
                onChange={(date) => setTaskData({ ...taskData, dueDate: date })}
                className="w-full border text-black border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-300 focus:border-transparent"
                placeholderText="Select date"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <FiFlag /> Priority
              </label>
              <select
                value={taskData.priority}
                onChange={(e) =>
                  setTaskData({ ...taskData, priority: e.target.value })
                }
                className="w-full border text-black border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-300 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <FiList /> List
            </label>
            <select
              value={taskData.listId}
              onChange={(e) =>
                setTaskData({ ...taskData, listId: e.target.value })
              }
              className="w-full border text-black border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-300 focus:border-transparent"
              required
            >
              {lists.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  type="button"
                  key={tag.id}
                  onClick={() => {
                    const updatedTags = taskData.tagIds.includes(tag.id)
                      ? taskData.tagIds.filter((id) => id !== tag.id)
                      : [...taskData.tagIds, tag.id];
                    setTaskData({ ...taskData, tagIds: updatedTags });
                  }}
                  className={`px-3 py-1 rounded-full text-sm ${
                    taskData.tagIds.includes(tag.id)
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tag.name}
                </button>
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
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;

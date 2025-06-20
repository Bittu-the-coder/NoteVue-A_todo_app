/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { X, Calendar, Flag, List, Tag, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTaskContext } from "../contexts/TaskContext";
import { getLists } from "../services/lists";
import { getTags } from "../services/tags";
import { useTheme } from "../contexts/ThemeContext";

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2,
    },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const AddTaskModal = ({
  isOpen,
  onClose,
  className,
  isEditing = false,
  taskId = null,
  task = null,
  onSuccess = () => {},
}) => {
  const [lists, setLists] = useState([]);
  const [tags, setTags] = useState([]);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: null,
    priority: "medium",
    listId: "",
    tagIds: [],
  });
  const { createTask, resetNewTaskForm, editTask } = useTaskContext();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const getAllLists = async () => {
    try {
      const response = await getLists();
      setLists(response);
      return response;
    } catch (error) {
      console.error("Error fetching lists:", error);
      return [];
    }
  };

  const getAllTags = async () => {
    try {
      const response = await getTags();
      setTags(response);
      return response;
    } catch (error) {
      console.error("Error fetching tags:", error);
      return [];
    }
  };

  const newTask = {
    title: taskData.title,
    description: taskData.description || "",
    dueDate: taskData.dueDate,
    priority: taskData.priority,
    list: taskData.listId,
    tags: taskData.tagIds,
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!taskData.title.trim()) {
  //     alert("Task title is required");
  //     return;
  //   }
  //   const newTask = {
  //     title: taskData.title,
  //     description: taskData.description || "",
  //     dueDate: taskData.dueDate,
  //     priority: taskData.priority,
  //     list: taskData.listId,
  //     tags: taskData.tagIds,
  //   };
  //   console.log("new task", newTask);

  //   createTask(newTask);
  //   resetNewTaskForm();
  //   onSuccess();
  //   onClose();
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await editTask(taskId, newTask);
      } else {
        await createTask(newTask);
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  // const handleEditTask = (id, task) => {
  //   if (!task.title.trim()) {
  //     alert("Task title is required");
  //     return;
  //   }
  //   const updatedTask = {
  //     title: task.title,
  //     description: task.description || "",
  //     dueDate: task.dueDate,
  //     priority: task.priority,
  //     list: task.listId,
  //     tags: task.tagIds,
  //   };
  //   editTask(id, updatedTask);
  //   resetNewTaskForm();
  //   onClose();
  // };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedLists = await getAllLists();
      await getAllTags();
      if (fetchedLists.length > 0 && !taskData.listId) {
        setTaskData((prev) => ({
          ...prev,
          listId: fetchedLists[0]._id,
        }));
      }
    };
    fetchData();
  }, [taskData.listId]);

  useEffect(() => {
    if (isEditing && task) {
      setTaskData({
        title: task.title || "",
        description: task.description || "",
        dueDate: task.dueDate ? new Date(task.dueDate) : null,
        priority: task.priority || "medium",
        listId: task.list?._id || task.list || "",
        tagIds: task.tags?.map((tag) => tag._id) || task.tags || [],
      });
    }
  }, [isEditing, task]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          <motion.div
            className={`${className} ${
              isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white"
            } rounded-xl w-full max-w-md relative z-10`}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div
              className={`flex justify-between items-center p-4 border-b ${
                isDarkMode ? "border-gray-700" : "border-blue-100"
              }`}
            >
              <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {isEditing ? "Edit your Task" : "Add New Task"}
              </h3>
              <motion.button
                onClick={onClose}
                className={`${
                  isDarkMode
                    ? "text-gray-400 hover:text-gray-200 bg-gray-700 hover:bg-gray-600"
                    : "text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200"
                } rounded-full p-1.5 transition-colors`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={18} />
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label
                  className={`block text-sm font-medium ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  } mb-1`}
                >
                  Task Title
                </label>
                <input
                  type="text"
                  value={taskData.title}
                  onChange={(e) =>
                    setTaskData({ ...taskData, title: e.target.value })
                  }
                  className={`w-full border ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-200 focus:ring-blue-500"
                      : "bg-white border-gray-300 text-black focus:ring-blue-300"
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
                  Task Description
                </label>
                <textarea
                  rows="2"
                  type="text"
                  value={taskData.description}
                  onChange={(e) =>
                    setTaskData({ ...taskData, description: e.target.value })
                  }
                  className={`w-full border ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-200 focus:ring-blue-500"
                      : "bg-white border-gray-300 text-black focus:ring-blue-300"
                  } rounded-lg px-3 py-2 focus:ring-2 focus:border-transparent`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className={`flex items-center gap-2 text-sm font-medium ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    } mb-1`}
                  >
                    <Calendar
                      className={isDarkMode ? "text-blue-400" : "text-blue-600"}
                      size={16}
                    />{" "}
                    Due Date
                  </label>
                  <DatePicker
                    selected={taskData.dueDate}
                    onChange={(date) =>
                      setTaskData({ ...taskData, dueDate: date })
                    }
                    className={`w-full border ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-gray-200 focus:ring-blue-500"
                        : "bg-white border-gray-300 text-black focus:ring-blue-300"
                    } rounded-lg px-3 py-2 focus:ring-2 focus:border-transparent`}
                    placeholderText="Select date"
                  />
                </div>

                <div>
                  <label
                    className={`flex items-center gap-2 text-sm font-medium ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    } mb-1`}
                  >
                    <Flag
                      className={isDarkMode ? "text-blue-400" : "text-blue-600"}
                      size={16}
                    />{" "}
                    Priority
                  </label>
                  <select
                    value={taskData.priority}
                    onChange={(e) =>
                      setTaskData({ ...taskData, priority: e.target.value })
                    }
                    className={`w-full border ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-gray-200 focus:ring-blue-500"
                        : "bg-white border-gray-300 text-black focus:ring-blue-300"
                    } rounded-lg px-3 py-2 focus:ring-2 focus:border-transparent`}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  className={`flex items-center gap-2 text-sm font-medium ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  } mb-1`}
                >
                  <List
                    className={isDarkMode ? "text-blue-400" : "text-blue-600"}
                    size={16}
                  />{" "}
                  List
                </label>
                <select
                  value={isEditing ? task.listId : taskData.listId}
                  onChange={(e) => {
                    setTaskData({ ...taskData, listId: e.target.value });
                  }}
                  className={`w-full border ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-200 focus:ring-blue-500"
                      : "bg-white border-gray-300 text-black focus:ring-blue-300"
                  } rounded-lg px-3 py-2 focus:ring-2 focus:border-transparent`}
                  required
                >
                  {lists.map((list) => (
                    <option key={list._id} value={list._id}>
                      {list.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className={`flex items-center gap-2 text-sm font-medium ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  } mb-1`}
                >
                  <Tag
                    className={isDarkMode ? "text-blue-400" : "text-blue-600"}
                    size={16}
                  />{" "}
                  Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <motion.button
                      type="button"
                      key={tag._id}
                      onClick={() => {
                        const updatedTags = taskData.tagIds.includes(tag._id)
                          ? taskData.tagIds.filter((id) => id !== tag._id)
                          : [...taskData.tagIds, tag._id];
                        setTaskData({ ...taskData, tagIds: updatedTags });
                      }}
                      className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                        taskData.tagIds.includes(tag._id)
                          ? "bg-gradient-to-r from-blue-400 to-purple-400 text-white"
                          : isDarkMode
                          ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Tag size={12} />
                      {tag.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <motion.button
                  type="button"
                  onClick={onClose}
                  className={`px-4 py-2 border rounded-lg ${
                    isDarkMode
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className={`px-4 py-2 ${
                    isDarkMode
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600"
                  } text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isEditing ? "Save Changes" : "Add Task"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddTaskModal;

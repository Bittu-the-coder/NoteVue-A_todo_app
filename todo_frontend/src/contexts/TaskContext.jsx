import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { addTask, deleteTask, getTasks, updateTask } from "../services/task";
import API from "../services/api";

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: new Date(),
    priority: "medium",
    list: "",
    tags: [],
    completed: false,
  });

  // Fetch all tasks on initial load
  useEffect(() => {
    getAllTasks();
  }, []);

  // Create new task
  const createTask = async (taskData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await addTask(taskData || newTask);
      if (response) {
        setTasks((prevTasks) => [...prevTasks, response]);
        // Reset the new task form
        setNewTask({
          title: "",
          description: "",
          dueDate: new Date(),
          priority: "medium",
          list: "",
          tags: [],
          completed: false,
        });
        return response;
      }
    } catch (err) {
      setError(err.message || "Failed to create task");
      console.error("Failed to create task:", err);
    } finally {
      setLoading(false);
    }
    return null;
  };

  // Update an existing task
  const editTask = async (id, updatedTask) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateTask(id, updatedTask);
      if (response) {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task._id === id ? response : task))
        );
        return response;
      }
    } catch (err) {
      setError(err.message || "Failed to update task");
      console.error("Failed to update task:", err);
    } finally {
      setLoading(false);
    }
    return null;
  };

  // Delete a task
  const removeTask = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await deleteTask(id);
      if (response) {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
        return true;
      }
    } catch (err) {
      setError(err.message || "Failed to delete task");
      console.error("Failed to delete task:", err);
    } finally {
      setLoading(false);
    }
    return false;
  };
  // Get all tasks
  const getAllTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getTasks();
      setTasks(response || []);
      return response;
    } catch (err) {
      setError(err.message || "Failed to fetch tasks");
      console.error("Failed to fetch tasks:", err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
    return [];
  };

  // Toggle task completion status
  const toggleTaskComplete = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.patch(`/tasks/${id}/complete`);
      if (response && response.data.success) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === id ? { ...task, completed: !task.completed } : task
          )
        );
        return response.data.data;
      }
    } catch (err) {
      setError(err.message || "Failed to toggle task completion");
      console.error("Failed to toggle task completion:", err);
    } finally {
      setLoading(false);
    }
    return null;
  };

  // Filter tasks by different criteria
  const filterTasks = useCallback(
    (criteria = {}) => {
      const { priority, completed, list, dueDate, search } = criteria;

      return tasks.filter((task) => {
        // Filter by priority
        if (priority && task.priority !== priority) return false;

        // Filter by completion status
        if (completed !== undefined && task.completed !== completed)
          return false;

        // Filter by list
        if (list && task.list?._id !== list) return false;

        // Filter by due date (today, upcoming, etc.)
        if (dueDate) {
          const taskDate = new Date(task.dueDate);
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          if (dueDate === "today") {
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            if (!(taskDate >= today && taskDate < tomorrow)) return false;
          } else if (dueDate === "upcoming") {
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            if (!(taskDate >= tomorrow)) return false;
          } else if (dueDate === "overdue") {
            if (!(taskDate < today && !task.completed)) return false;
          }
        }

        // Filter by search term
        if (search) {
          const searchLower = search.toLowerCase();
          return (
            task.title.toLowerCase().includes(searchLower) ||
            (task.description &&
              task.description.toLowerCase().includes(searchLower))
          );
        }

        return true;
      });
    },
    [tasks]
  );

  // Get tasks by list ID
  const getTasksByList = useCallback(
    (listId) => {
      return tasks.filter((task) => task.list && task.list._id === listId);
    },
    [tasks]
  );

  // Get tasks by tag ID
  const getTasksByTag = useCallback(
    (tagId) => {
      return tasks.filter(
        (task) => task.tags && task.tags.some((tag) => tag._id === tagId)
      );
    },
    [tasks]
  );

  // Handle input change for new task form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  // Add or remove a tag from a task
  const toggleTaskTag = async (taskId, tagId) => {
    const task = tasks.find((t) => t._id === taskId);
    if (!task) return null;

    const hasTag = task.tags && task.tags.some((tag) => tag._id === tagId);
    let updatedTags;

    if (hasTag) {
      updatedTags = task.tags.filter((tag) => tag._id !== tagId);
    } else {
      updatedTags = [...(task.tags || []), { _id: tagId }];
    }

    return await editTask(taskId, {
      ...task,
      tags: updatedTags.map((tag) => tag._id),
    });
  };

  // Reset new task form
  const resetNewTaskForm = () => {
    setNewTask({
      title: "",
      description: "",
      dueDate: new Date(),
      priority: "medium",
      list: "",
      tags: [],
      completed: false,
    });
  };

  // Get today's tasks
  const getTodayTasks = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayTasks = tasks.filter((task) => {
      // Skip tasks without dueDate
      if (!task.dueDate) {
        // console.log(`Task ${task.title}: No due date`);
        return false;
      }

      // Parse the ISO date string
      const taskDate = new Date(task.dueDate);

      const isSameDay =
        taskDate.getFullYear() === today.getFullYear() &&
        taskDate.getMonth() === today.getMonth() &&
        taskDate.getDate() === today.getDate();

      return isSameDay;
    });

    return todayTasks;
  }, [tasks]);

  // get Upcoming tasks
  const getUpcomingTasks = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingTasks = tasks.filter((task) => {
      if (!task.dueDate) {
        // console.log(`Task "${task.title}": No due date`);
        return false;
      }

      const taskDate = new Date(task.dueDate);

      // Task is due after today
      return taskDate > today;
    });

    return upcomingTasks;
  }, [tasks]);

  const getWeeklyTasks = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    return tasks.filter((task) => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      return taskDate >= today && taskDate < nextWeek;
    });
  }, [tasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        newTask,
        createTask,
        editTask,
        removeTask,
        getAllTasks,
        toggleTaskComplete,
        filterTasks,
        getTasksByList,
        getTasksByTag,
        handleInputChange,
        setNewTask,
        toggleTaskTag,
        resetNewTaskForm,
        getTodayTasks,
        getUpcomingTasks,
        getWeeklyTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
export { TaskProvider, useTaskContext };

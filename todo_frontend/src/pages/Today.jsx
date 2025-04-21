import React, { useState } from "react";
import { FiPlus, FiCheck, FiFlag, FiClock, FiEdit } from "react-icons/fi";
import AddTaskModal from "../components/AddTask";

const TodayTasks = () => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const handleAddTask = (taskData) => {
    console.log("Adding task:", taskData);
    // Call your API here
  };
  // Sample data - replace with your actual data
  const lists = [
    { id: "1", name: "Personal", color: "#8B5CF6" },
    { id: "2", name: "Work", color: "#3B82F6" },
  ];

  const tags = [
    { id: "1", name: "Important" },
    { id: "2", name: "Urgent" },
  ];
  const todaysTasks = [
    {
      id: 1,
      title: "Morning standup meeting",
      time: "9:30 AM",
      priority: "medium",
      completed: false,
    },
    {
      id: 2,
      title: "Review design mockups",
      time: "11:00 AM",
      priority: "high",
      completed: false,
    },
    {
      id: 3,
      title: "Lunch with team",
      time: "1:00 PM",
      priority: "low",
      completed: true,
    },
  ];

  return (
    <div className="space-y-6 h-[100vh]">
      {/* Modal components */}
      <AddTaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        onSubmit={handleAddTask}
        lists={lists}
        tags={tags}
      />
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-purple-900">Today's Tasks</h1>
          <p className="text-purple-600">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <button
          onClick={() => setShowTaskModal(true)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FiPlus size={18} />
          Add Task
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-purple-100 shadow-sm">
        {todaysTasks.length > 0 ? (
          <div className="space-y-3">
            {todaysTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start gap-3 p-3 hover:bg-purple-50 rounded-lg transition-colors"
              >
                <button
                  className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border ${
                    task.completed
                      ? "bg-purple-600 border-purple-600 text-white"
                      : "border-purple-300"
                  }`}
                >
                  {task.completed && <FiCheck size={14} className="m-auto" />}
                </button>
                <div className="flex justify-between w-full">
                  <div className="flex flex-col justify-between">
                    <p
                      className={`font-medium ${
                        task.completed
                          ? "text-purple-400 line-through"
                          : "text-purple-800"
                      }`}
                    >
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="flex items-center gap-1 text-xs text-purple-500">
                        <FiClock size={12} /> {task.time}
                      </span>
                      {task.priority === "high" && (
                        <span className="flex items-center gap-1 text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full">
                          <FiFlag size={12} /> High
                        </span>
                      )}
                    </div>
                  </div>
                  <button className="mt-2 mx-2 text-purple-500 hover:text-purple-700 transition-colors">
                    <FiEdit size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center text-purple-400 mb-4">
              <FiCheck size={32} />
            </div>
            <h3 className="text-lg font-medium text-purple-800">
              No tasks for today
            </h3>
            <p className="text-purple-500 mt-1">Add tasks to plan your day</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodayTasks;

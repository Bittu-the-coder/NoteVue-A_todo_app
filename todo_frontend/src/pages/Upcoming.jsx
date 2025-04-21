import React, { useState } from "react";
import {
  FiPlus,
  FiCheck,
  FiCalendar,
  FiFlag,
  FiChevronRight,
} from "react-icons/fi";
import AddTaskModal from "../components/AddTask";

const UpcomingTasks = () => {
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
  const upcomingTasks = [
    {
      id: 1,
      title: "Client presentation",
      date: "Tomorrow",
      time: "10:00 AM",
      priority: "high",
    },
    {
      id: 2,
      title: "Submit monthly report",
      date: "Jun 15",
      time: "3:00 PM",
      priority: "medium",
    },
    {
      id: 3,
      title: "Team building activity",
      date: "Jun 20",
      time: "All day",
      priority: "low",
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
        <h1 className="text-2xl font-bold text-purple-900">Upcoming Tasks</h1>
        <button
          onClick={() => setShowTaskModal(true)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FiPlus size={18} />
          Add Task
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-purple-100 shadow-sm">
        {upcomingTasks.length > 0 ? (
          <div className="space-y-4">
            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-4 p-4 hover:bg-purple-50 rounded-lg transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                  <FiCalendar size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-purple-900">{task.title}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm text-purple-500 flex items-center gap-1">
                      {task.date} • {task.time}
                    </span>
                    {task.priority === "high" && (
                      <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full">
                        High priority
                      </span>
                    )}
                  </div>
                </div>
                <FiChevronRight className="text-purple-400" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center text-purple-400 mb-4">
              <FiCalendar size={32} />
            </div>
            <h3 className="text-lg font-medium text-purple-800">
              No upcoming tasks
            </h3>
            <p className="text-purple-500 mt-1">
              Tasks with future due dates will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingTasks;

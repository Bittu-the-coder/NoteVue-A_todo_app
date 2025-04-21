/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// import { FiPlus, FiCheck, FiClock, FiFlag, FiEdit } from "react-icons/fi";
// import AddTaskModal from "../components/AddTask";
// import AddNoteModal from "../components/AddNote";

// const Dashboard = () => {
//   const user = { name: "Alex" };
//   const [quote, setQuote] = useState({});
//   const [showTaskModal, setShowTaskModal] = useState(false);
//   const [showNoteModal, setShowNoteModal] = useState(false);
//   const [showListModal, setShowListModal] = useState(false);
//   const [showTagModal, setShowTagModal] = useState(false);

//   // Sample data - replace with your actual data
//   const lists = [
//     { id: "1", name: "Personal", color: "#8B5CF6" },
//     { id: "2", name: "Work", color: "#3B82F6" },
//   ];

//   const tags = [
//     { id: "1", name: "Important" },
//     { id: "2", name: "Urgent" },
//   ];

//   const handleAddTask = (taskData) => {
//     console.log("Adding task:", taskData);
//     // Call your API here
//   };

//   const handleAddNote = (noteData) => {
//     console.log("Adding note:", noteData);
//     // Call your API here
//   };

//   const url =
//     "https://api.freeapi.app/api/v1/public/quotes?page=1&limit=10&query=human";
//   const options = { method: "GET", headers: { accept: "application/json" } };

//   useEffect(() => {
//     const fetchQuote = async () => {
//       try {
//         const response = await fetch(url, options);
//         const data = await response.json();
//         const randomIndex = Math.floor(Math.random() * data.data.data.length);
//         const quote = data.data.data[randomIndex];
//         setQuote(quote);
//       } catch (error) {
//         console.error("Failed to fetch quote:", error);
//       }
//     };
//     fetchQuote();
//   }, []);

//   // Sample tasks data
//   const tasks = [
//     {
//       id: 1,
//       title: "Complete project proposal",
//       time: "10:00 AM",
//       priority: "high",
//       completed: false,
//     },
//     {
//       id: 2,
//       title: "Team standup meeting",
//       time: "11:30 AM",
//       priority: "medium",
//       completed: false,
//     },
//     {
//       id: 3,
//       title: "Review design mockups",
//       time: "2:00 PM",
//       priority: "low",
//       completed: true,
//     },
//   ];

//   // Sample notes data
//   const recentNotes = [
//     {
//       id: 1,
//       content: "Ideas for the new marketing campaign...",
//       updatedAt: "2 hours ago",
//     },
//     {
//       id: 2,
//       content: "Meeting notes with design team regarding...",
//       updatedAt: "Yesterday",
//     },
//   ];

//   return (
//     <div className="space-y-6">
//       {/* Welcome Header */}
//       <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-purple-100">
//         <h1 className="text-2xl font-bold text-purple-900">
//           Welcome back, {user.name}!
//         </h1>
//         <p className="text-purple-600">Here's a quick look at your day 👇</p>
//       </div>

//       {/*Modals */}
//       <AddTaskModal
//         isOpen={showTaskModal}
//         onClose={() => setShowTaskModal(false)}
//         onSubmit={handleAddTask}
//         lists={lists}
//         tags={tags}
//       />
//       <AddNoteModal
//         isOpen={showNoteModal}
//         onClose={() => setShowNoteModal(false)}
//         onSubmit={handleAddNote}
//       />

//       {/* Main Content Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Tasks Card */}
//         <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-purple-100 shadow-sm">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold text-purple-900">
//               Your Tasks for Today
//             </h2>
//             <button
//               onClick={() => setShowTaskModal(true)}
//               className="flex items-center gap-1 text-sm cursor-pointer bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg transition-colors"
//             >
//               <FiPlus size={16} />
//               Add Task
//             </button>
//           </div>
//           <p className="text-purple-500 mb-4">
//             You have {tasks.length} tasks scheduled
//           </p>

//           <div className="space-y-3">
//             {tasks.map((task) => (
//               <div
//                 key={task.id}
//                 className="flex items-start gap-3 p-3 hover:bg-purple-50 rounded-lg transition-colors"
//               >
//                 <button
//                   className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border ${
//                     task.completed
//                       ? "bg-purple-600 border-purple-600 text-white"
//                       : "border-purple-300"
//                   }`}
//                 >
//                   {task.completed && <FiCheck size={14} className="m-auto" />}
//                 </button>
//                 <div className="flex-1">
//                   <p
//                     className={`font-medium ${
//                       task.completed
//                         ? "text-purple-400 line-through"
//                         : "text-purple-800"
//                     }`}
//                   >
//                     {task.title}
//                   </p>
//                   <div className="flex items-center gap-2 mt-1">
//                     <span className="flex items-center gap-1 text-xs text-purple-500">
//                       <FiClock size={12} /> {task.time}
//                     </span>
//                     {task.priority === "high" && (
//                       <span className="flex items-center gap-1 text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full">
//                         <FiFlag size={12} /> High
//                       </span>
//                     )}
//                     {task.priority === "medium" && (
//                       <span className="flex items-center gap-1 text-xs bg-yellow-50 text-yellow-600 px-2 py-0.5 rounded-full">
//                         <FiFlag size={12} /> Medium
//                       </span>
//                     )}
//                     {task.priority === "low" && (
//                       <span className="flex items-center gap-1 text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
//                         <FiFlag size={12} /> Low
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Quick Notes Card */}
//         <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-purple-100 shadow-sm">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold text-purple-900">
//               Quick Notes
//             </h2>
//             <button
//               onClick={() => setShowNoteModal(true)}
//               className="flex items-center cursor-pointer gap-1 text-sm bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg transition-colors"
//             >
//               <FiPlus size={16} />
//               New Note
//             </button>
//           </div>

//           <div className="space-y-4">
//             {recentNotes.length > 0 ? (
//               recentNotes.map((note) => (
//                 <div
//                   key={note.id}
//                   className="p-4 bg-purple-50 rounded-lg border border-purple-100"
//                 >
//                   <p className="text-purple-800 line-clamp-3">{note.content}</p>
//                   <p className="text-xs text-purple-400 mt-2">
//                     {note.updatedAt}
//                   </p>
//                 </div>
//               ))
//             ) : (
//               <div className="p-6 text-center border-2 border-dashed border-purple-200 rounded-lg">
//                 <p className="text-purple-500">Capture an idea or thought...</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Productivity Insight Card */}
//         <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-purple-100 shadow-sm lg:col-span-2">
//           <h2 className="text-xl font-semibold text-purple-900 mb-2">
//             Productivity Insight
//           </h2>
//           <p className="text-purple-600 mb-4">
//             You completed 12 tasks this week — keep it up!
//           </p>

//           <div className="w-full bg-purple-100 rounded-full h-2.5">
//             <div
//               className="bg-gradient-to-r from-indigo-400 to-purple-600 h-2.5 rounded-full"
//               style={{ width: "75%" }}
//             ></div>
//           </div>

//           {/* Motivational Quote */}
//           <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
//             <p className="text-indigo-800 italic">{`"${
//               quote.content || "Believe you can and you're halfway there."
//             }"`}</p>
//             <p className="text-indigo-600 text-sm mt-1">{`- ${
//               quote.author || "Theodore Roosevelt"
//             }`}</p>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Action Buttons (Mobile) */}

//       <div className="lg:hidden fixed bottom-6 right-6 flex gap-3">
//         <button className="p-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors">
//           <FiEdit size={20} />
//         </button>
//         <button className="p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors">
//           <FiPlus size={20} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import { FiPlus, FiCheck, FiClock, FiFlag, FiEdit } from "react-icons/fi";
import { motion } from "framer-motion";
import AddTaskModal from "../components/AddTask";
import AddNoteModal from "../components/AddNote";

const Dashboard = () => {
  const user = { name: "Alex" };
  const [quote, setQuote] = useState({});
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [showTagModal, setShowTagModal] = useState(false);

  // Sample data - replace with your actual data
  const lists = [
    { id: "1", name: "Personal", color: "#8B5CF6" },
    { id: "2", name: "Work", color: "#3B82F6" },
  ];

  const tags = [
    { id: "1", name: "Important" },
    { id: "2", name: "Urgent" },
  ];

  const handleAddTask = (taskData) => {
    console.log("Adding task:", taskData);
    // Call your API here
  };

  const handleAddNote = (noteData) => {
    console.log("Adding note:", noteData);
    // Call your API here
  };

  const url =
    "https://api.freeapi.app/api/v1/public/quotes?page=1&limit=10&query=human";
  const options = { method: "GET", headers: { accept: "application/json" } };

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.data.data.length);
        const quote = data.data.data[randomIndex];
        setQuote(quote);
      } catch (error) {
        console.error("Failed to fetch quote:", error);
      }
    };
    fetchQuote();
  }, []);

  // Sample tasks data
  const tasks = [
    {
      id: 1,
      title: "Complete project proposal",
      time: "10:00 AM",
      priority: "high",
      completed: false,
    },
    {
      id: 2,
      title: "Team standup meeting",
      time: "11:30 AM",
      priority: "medium",
      completed: false,
    },
    {
      id: 3,
      title: "Review design mockups",
      time: "2:00 PM",
      priority: "low",
      completed: true,
    },
  ];

  // Sample notes data
  const recentNotes = [
    {
      id: 1,
      content: "Ideas for the new marketing campaign...",
      updatedAt: "2 hours ago",
    },
    {
      id: 2,
      content: "Meeting notes with design team regarding...",
      updatedAt: "Yesterday",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  // Triangle decoration
  const Triangle = ({ color, duration, delay, size, top, left, right }) => {
    return (
      <motion.div
        className="absolute z-0"
        style={{ top, left, right }}
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          delay,
        }}
      >
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: `${size / 2}px solid transparent`,
            borderRight: `${size / 2}px solid transparent`,
            borderBottom: `${size}px solid ${color}`,
          }}
        />
      </motion.div>
    );
  };

  // Circle decoration
  const Circle = ({ color, duration, delay, size, top, left, right }) => {
    return (
      <motion.div
        className="absolute rounded-full z-0"
        style={{
          top,
          left,
          right,
          width: size,
          height: size,
          background: color,
        }}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 0] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
      />
    );
  };

  // Decorative elements
  const decorations = (
    <>
      <Triangle
        color="rgba(139, 92, 246, 0.1)"
        duration={8}
        delay={0}
        size={60}
        top="-20px"
        left="10%"
      />
      <Triangle
        color="rgba(59, 130, 246, 0.1)"
        duration={10}
        delay={1}
        size={80}
        top="40%"
        right="5%"
      />
      <Triangle
        color="rgba(139, 92, 246, 0.1)"
        duration={12}
        delay={2}
        size={40}
        top="80%"
        left="20%"
      />
      <Circle
        color="rgba(139, 92, 246, 0.1)"
        duration={5}
        delay={0.5}
        size={100}
        top="5%"
        right="15%"
      />
      <Circle
        color="rgba(59, 130, 246, 0.1)"
        duration={6}
        delay={1.5}
        size={60}
        top="30%"
        left="5%"
      />
      <Circle
        color="rgba(219, 39, 119, 0.1)"
        duration={7}
        delay={2.5}
        size={80}
        top="70%"
        right="10%"
      />
    </>
  );

  return (
    <motion.div
      className="space-y-6 relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {decorations}

      {/* Welcome Header */}
      <motion.div
        className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-purple-100 relative z-10"
        variants={itemVariants}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <motion.h1
          className="text-2xl font-bold text-purple-900"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Welcome back, {user.name}!
        </motion.h1>
        <motion.p
          className="text-purple-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Here's a quick look at your day 👇
        </motion.p>
      </motion.div>

      {/*Modals */}
      <AddTaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        onSubmit={handleAddTask}
        lists={lists}
        tags={tags}
      />
      <AddNoteModal
        isOpen={showNoteModal}
        onClose={() => setShowNoteModal(false)}
        onSubmit={handleAddNote}
      />

      {/* Main Content Grid */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        variants={containerVariants}
      >
        {/* Tasks Card */}
        <motion.div
          className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-purple-100 shadow-sm relative z-10"
          variants={itemVariants}
          whileHover={{ boxShadow: "0 8px 30px rgba(139, 92, 246, 0.1)" }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-purple-900">
              Your Tasks for Today
            </h2>
            <motion.button
              onClick={() => setShowTaskModal(true)}
              className="flex items-center gap-1 text-sm cursor-pointer bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiPlus size={16} />
              Add Task
            </motion.button>
          </div>
          <p className="text-purple-500 mb-4">
            You have {tasks.length} tasks scheduled
          </p>

          <motion.div className="space-y-3" variants={containerVariants}>
            {tasks.map((task, index) => (
              <motion.div
                key={task.id}
                className="flex items-start gap-3 p-3 hover:bg-purple-50 rounded-lg transition-colors"
                variants={itemVariants}
                custom={index}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(237, 233, 254, 0.5)",
                }}
              >
                <motion.button
                  className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border ${
                    task.completed
                      ? "bg-purple-600 border-purple-600 text-white"
                      : "border-purple-300"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                >
                  {task.completed && <FiCheck size={14} className="m-auto" />}
                </motion.button>
                <div className="flex-1">
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
                      <motion.span
                        className="flex items-center gap-1 text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full"
                        whileHover={{ scale: 1.05 }}
                      >
                        <FiFlag size={12} /> High
                      </motion.span>
                    )}
                    {task.priority === "medium" && (
                      <motion.span
                        className="flex items-center gap-1 text-xs bg-yellow-50 text-yellow-600 px-2 py-0.5 rounded-full"
                        whileHover={{ scale: 1.05 }}
                      >
                        <FiFlag size={12} /> Medium
                      </motion.span>
                    )}
                    {task.priority === "low" && (
                      <motion.span
                        className="flex items-center gap-1 text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full"
                        whileHover={{ scale: 1.05 }}
                      >
                        <FiFlag size={12} /> Low
                      </motion.span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Quick Notes Card */}
        <motion.div
          className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-purple-100 shadow-sm relative z-10"
          variants={itemVariants}
          whileHover={{ boxShadow: "0 8px 30px rgba(139, 92, 246, 0.1)" }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-purple-900">
              Quick Notes
            </h2>
            <motion.button
              onClick={() => setShowNoteModal(true)}
              className="flex items-center cursor-pointer gap-1 text-sm bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiPlus size={16} />
              New Note
            </motion.button>
          </div>

          <motion.div className="space-y-4" variants={containerVariants}>
            {recentNotes.length > 0 ? (
              recentNotes.map((note, index) => (
                <motion.div
                  key={note.id}
                  className="p-4 bg-purple-50 rounded-lg border border-purple-100"
                  variants={itemVariants}
                  custom={index}
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: "rgba(237, 233, 254, 0.7)",
                  }}
                >
                  <p className="text-purple-800 line-clamp-3">{note.content}</p>
                  <p className="text-xs text-purple-400 mt-2">
                    {note.updatedAt}
                  </p>
                </motion.div>
              ))
            ) : (
              <motion.div
                className="p-6 text-center border-2 border-dashed border-purple-200 rounded-lg"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-purple-500">Capture an idea or thought...</p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* Productivity Insight Card */}
        <motion.div
          className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-purple-100 shadow-sm lg:col-span-2 relative z-10"
          variants={itemVariants}
          whileHover={{ boxShadow: "0 8px 30px rgba(139, 92, 246, 0.1)" }}
        >
          <h2 className="text-xl font-semibold text-purple-900 mb-2">
            Productivity Insight
          </h2>
          <p className="text-purple-600 mb-4">
            You completed 12 tasks this week — keep it up!
          </p>

          <div className="w-full bg-purple-100 rounded-full h-2.5">
            <motion.div
              className="bg-gradient-to-r from-indigo-400 to-purple-600 h-2.5 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "75%" }}
              transition={{ duration: 1, delay: 0.5 }}
            ></motion.div>
          </div>

          {/* Motivational Quote */}
          <motion.div
            className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.8,
              duration: 0.6,
              type: "spring",
            }}
            whileHover={{ scale: 1.01 }}
          >
            <p className="text-indigo-800 italic">{`"${
              quote.content || "Believe you can and you're halfway there."
            }"`}</p>
            <p className="text-indigo-600 text-sm mt-1">{`- ${
              quote.author || "Theodore Roosevelt"
            }`}</p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Action Buttons (Mobile) */}
      <div className="lg:hidden fixed bottom-6 right-6 flex gap-3 z-20">
        <motion.button
          className="p-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors"
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)",
          }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <FiEdit size={20} />
        </motion.button>
        <motion.button
          className="p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)",
          }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <FiPlus size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Dashboard;

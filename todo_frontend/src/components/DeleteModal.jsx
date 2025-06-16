import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";

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

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
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
            className="bg-white rounded-xl w-full max-w-md relative z-10"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex justify-between items-center p-4 border-b border-red-100">
              <h3 className="text-lg font-semibold text-red-600 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Delete Account
              </h3>
              <motion.button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={18} />
              </motion.button>
            </div>

            <div className="p-4 space-y-4">
              <div className="text-gray-700">
                <p className="font-medium mb-2">Are you absolutely sure?</p>
                <p className="text-sm text-gray-500">
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <motion.button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={onConfirm}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Delete Account
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DeleteModal;

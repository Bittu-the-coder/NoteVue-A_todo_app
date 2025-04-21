const express = require('express');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleComplete
} = require('../controllers/tasks.controller');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getTasks)
  .post(protect, createTask);

router.route('/:id')
  .put(protect, updateTask)
  .delete(protect, deleteTask);

router.route('/:id/complete')
  .patch(protect, toggleComplete);

module.exports = router;
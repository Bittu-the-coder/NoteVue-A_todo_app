const express = require('express');
const {
  getLists,
  createList,
  updateList,
  deleteList
} = require('../controllers/lists.controller');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getLists)
  .post(protect, createList);

router.route('/:id')
  .put(protect, updateList)
  .delete(protect, deleteList);

module.exports = router;
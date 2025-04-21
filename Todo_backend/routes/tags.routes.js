const express = require('express');
const {
  getTags,
  createTag,
  deleteTag
} = require('../controllers/tags.controller');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getTags)
  .post(protect, createTag);

router.route('/:id')
  .delete(protect, deleteTag);

module.exports = router;
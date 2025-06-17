const Tag = require('../models/Tag.model');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

exports.getTags = asyncHandler(async (req, res, next) => {
  const tags = await Tag.find({ user: req.user.id }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: tags.length,
    data: tags
  });
});

exports.createTag = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const tag = await Tag.create(req.body);

  res.status(201).json({
    success: true,
    data: tag
  });
});

exports.deleteTag = asyncHandler(async (req, res, next) => {
  const tag = await Tag.findById(req.params.id);

  if (!tag) {
    return next(
      new ErrorResponse(`Tag not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns the tag
  if (tag.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to delete this tag`, 401)
    );
  }

  await tag.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});
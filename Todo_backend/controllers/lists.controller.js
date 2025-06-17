const List = require('../models/List.model');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

exports.getLists = asyncHandler(async (req, res, next) => {
  const lists = await List.find({ user: req.user.id }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: lists.length,
    data: lists
  });
});

exports.createList = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const list = await List.create(req.body);

  res.status(201).json({
    success: true,
    data: list
  });
});

exports.updateList = asyncHandler(async (req, res, next) => {
  let list = await List.findById(req.params.id);

  if (!list) {
    return next(
      new ErrorResponse(`List not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns the list
  if (list.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to update this list`, 401)
    );
  }

  list = await List.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: list
  });
});

exports.deleteList = asyncHandler(async (req, res, next) => {
  const list = await List.findById(req.params.id);

  if (!list) {
    return next(
      new ErrorResponse(`List not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns the list
  if (list.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to delete this list`, 401)
    );
  }

  await list.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});
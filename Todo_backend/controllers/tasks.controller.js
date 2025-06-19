const Task = require('../models/Task.model');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

exports.getTasks = asyncHandler(async (req, res, next) => {
  const tasks = await Task.find({ user: req.user.id }).populate('list tags');

  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks
  });
});

exports.createTask = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const task = await Task.create(req.body);

  res.status(201).json({
    success: true,
    data: task
  });
});

exports.updateTask = asyncHandler(async (req, res, next) => {
  let task = await Task.findById(req.params.id);

  if (!task) {
    return next(
      new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns the task
  if (task.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to update this task`, 401)
    );
  }

  task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  }).populate('list tags');

  res.status(200).json({
    success: true,
    data: task
  });
});

exports.toggleComplete = asyncHandler(async (req, res, next) => {
  let task = await Task.findById(req.params.id);

  if (!task) {
    return next(
      new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns the task
  if (task.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to update this task`, 401)
    );
  }

  task.completed = !task.completed;
  await task.save();

  res.status(200).json({
    success: true,
    data: task
  });
});


exports.deleteTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(
      new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns the task
  if (task.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to delete this task`, 401)
    );
  }

  await task.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});
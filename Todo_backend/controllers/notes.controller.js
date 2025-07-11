const Note = require('../models/Note.model');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

exports.getNotes = asyncHandler(async (req, res, next) => {
  const notes = await Note.find({ user: req.user.id })
    .sort({ updatedAt: -1 })
    .populate('tags');

  res.status(200).json({
    success: true,
    count: notes.length,
    data: notes
  });
});

exports.createNote = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const note = await Note.create(req.body);

  res.status(201).json({
    success: true,
    data: note
  });
});

exports.updateNote = asyncHandler(async (req, res, next) => {
  let note = await Note.findById(req.params.id);

  if (!note) {
    return next(
      new ErrorResponse(`Note not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns the note
  if (note.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to update this note`, 401)
    );
  }

  note = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  }).populate('tags');

  res.status(200).json({
    success: true,
    data: note
  });
});


exports.deleteNote = asyncHandler(async (req, res, next) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return next(
      new ErrorResponse(`Note not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns the note
  if (note.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to delete this note`, 401)
    );
  }

  await note.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});
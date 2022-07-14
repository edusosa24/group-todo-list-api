const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const Task = require('../models/Task');

// @desc    Gets a single task
// @route   GET /api/v1/tasks/:id
// @access  Private
exports.getTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(
      new ErrorResponse(`Task not found with ID of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: task,
  });
});

// @desc    Create new task
// @route   Post /api/v1/tasks
// @access  Private
exports.createTask = asyncHandler(async (req, res, next) => {
  req.body.owner = req.user.id;

  const task = await Task.create(req.body);

  res.status(201).json({
    success: true,
    data: task,
  });
});

// @desc    Updates task
// @route   PUT /api/v1/tasks/:id
// @access  Private
exports.updateTask = asyncHandler(async (req, res, next) => {
  let update = req.body;

  const task = await Task.findByIdAndUpdate(req.params.id, update, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(
      new ErrorResponse(`Task not found with ID of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: task,
  });
});

// @desc    Deletes task
// @route   DELETE /api/v1/tasks/:id
// @access  Private
exports.deleteTask = asyncHandler(async (req, res, next) => {
  const own = await Task.findById(req.params.id);

  if (own.owner != req.user.id) {
    return next(new ErrorResponse('Only the owner can delete.', 403));
  }

  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task) {
    return next(
      new ErrorResponse(`Task not found with ID of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});

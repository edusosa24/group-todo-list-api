const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const List = require('../models/List');
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
  const task = await Task.create(req.body);

  updateListCreate(task.fromList, task.id);

  res.status(201).json({
    success: true,
    data: task,
  });
});

const updateListCreate = async (listID, taskID) => {
  const list = await List.findByIdAndUpdate(
    listID,
    {
      $push: {
        tasks: taskID,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );
};

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
  const task = await Task.findByIdAndRemove(req.params.id);

  if (!task) {
    return next(
      new ErrorResponse(`Task not found with ID of ${req.params.id}`, 404)
    );
  }

  const list = await updateListDelete(task.fromList, task.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});

const updateListDelete = async (listID, taskID) => {
  const list = await List.findByIdAndUpdate(
    listID,
    {
      $pull: { tasks: taskID },
    },
    {
      new: true,
      runValidators: true,
    }
  );
};

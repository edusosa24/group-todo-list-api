const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async');
const List = require('../models/List');
const Task = require('../models/Task');
const User = require('../models/User');

// @desc    Gets a single list
// @route   GET /api/v1/lists/:id
// @access  Private
exports.getList = asyncHandler(async (req, res, next) => {
  let list = await List.findById(req.params.id).populate('tasks');

  if (!list) {
    return next(
      new ErrorResponse(`List not found with ID of ${req.params.id}`, 404)
    );
  }

  list = await handleNewMember(req.user.id, list);

  res.status(200).json({
    success: true,
    data: list,
  });
});

const handleNewMember = async (userID, list) => {
  console.log(`${userID} ${list.createdBy}`);

  console.log(userID === list.createdBy);
  if (!list.createdBy.equals(userID) && !list.members.includes(userID)) {
    list = await List.findByIdAndUpdate(
      list.id,
      {
        $push: {
          members: userID,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }
  return list;
};

// @desc    Create new list
// @route   Post /api/v1/lists
// @access  Private
exports.createList = asyncHandler(async (req, res, next) => {
  req.body.createdBy = req.user.id;

  const list = await List.create(req.body);

  res.status(201).json({
    success: true,
    data: list,
  });
});

// @desc    Updates list
// @route   PUT /api/v1/lists/:id
// @access  Private
exports.updateList = asyncHandler(async (req, res, next) => {
  const list = await List.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!list) {
    return next(
      new ErrorResponse(`List not found with ID of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: list,
  });
});

// @desc    Deletes list
// @route   DELETE /api/v1/lists/:id
// @access  Private
exports.deleteList = asyncHandler(async (req, res, next) => {
  let list = await List.findById(req.params.id);

  if (!list) {
    return next(
      new ErrorResponse(`List not found with ID of ${req.params.id}`, 404)
    );
  }

  if (list.createdBy != req.user.id) {
    return next(new ErrorResponse('Only the list creator can delete it.', 403));
  }

  list.tasks.forEach(async (task) => {
    let rm = await Task.findByIdAndRemove(task);
  });

  list = await List.findByIdAndRemove(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});

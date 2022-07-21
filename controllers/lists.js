const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async');
const List = require('../models/List');
const User = require('../models/User');

// @desc    Gets all lists
// @route   GET /api/v1/lists
// @access  Private
exports.getLists = asyncHandler(async (req, res, next) => {
  const lists = await List.find().select('name');

  res.status(200).json({
    success: true,
    count: lists.length,
    data: lists,
  });
});

// @desc    Gets a single list
// @route   GET /api/v1/lists/:id
// @access  Private
exports.getList = asyncHandler(async (req, res, next) => {
  const list = await List.findById(req.params.id);

  if (!list) {
    return next(
      new ErrorResponse(`List not found with ID of ${req.params.id}`, 404)
    );
  }

  handleNewMember(req.user.id, list);

  res.status(200).json({
    success: true,
    data: list,
  });
});

const handleNewMember = async (userID, list) => {
  if (userID !== list.owner || !list.members.includes(userID)) {
    let update = {};
    list.members.push(userID);
    update.members = list.members;
    list = await List.findByIdAndUpdate(list.id, update, {
      new: true,
      runValidators: true,
    });
  }
};

// @desc    Create new list
// @route   Post /api/v1/lists
// @access  Private
exports.createList = asyncHandler(async (req, res, next) => {
  req.body.owner = req.user.id;

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
  const own = await List.findById(req.params.id);

  if (own.owner != req.user.id) {
    return next(new ErrorResponse('Only the owner can delete.', 403));
  }

  const list = await List.findByIdAndDelete(req.params.id);

  if (!list) {
    return next(
      new ErrorResponse(`List not found with ID of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});

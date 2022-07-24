const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const List = require('../models/List');
const { findById } = require('../models/User');

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, password } = req.body;

  // Create user
  const user = await User.create({
    name,
    password,
  });

  sendTokenResponse(user, 200, res);
});

// @desc    Log in user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { name, password } = req.body;

  // Validate name and password
  if (!name) {
    return next(new ErrorResponse('Please enter your username.', 400));
  } else if (!password) {
    return next(new ErrorResponse('Please enter your password.', 400));
  }

  // Check for user
  const user = await User.findOne({ name }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid username or password.', 401));
  }

  // Check password
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid username or password.', 401));
  }

  sendTokenResponse(user, 200, res);
});

// @desc    Log out current logged in user
// @route   Get /api/v1/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expire: new Date(Date.now + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Get current logged in user
// @route   Get /api/v1/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const userCreatedLists = await List.find({ createdBy: req.user.id });
  const userMemberLists = await List.find({ members: { $all: req.user.id } });

  res.status(200).json({
    success: true,
    data: {
      user_info: user,
      created_lists: userCreatedLists,
      member_lists: userMemberLists,
    },
  });
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, token });
};

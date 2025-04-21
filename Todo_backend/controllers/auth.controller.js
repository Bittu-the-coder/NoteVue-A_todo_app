const User = require('../models/User.model');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  // Create user
  const user = await User.create({
    username,
    email,
    password
  });

  sendTokenResponse(user, 201, res);
  console.log('User registered successfully:', user._id); // Log the user ID
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  console.log('Login attempt for:', email); // Log the email attempting to login

  // 1. Check if user exists
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    console.log('No user found with this email');
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // 2. Check if password matches
  console.log('Checking password match...');
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    console.log('Password does not match');
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // 3. Generate token
  console.log('Generating token...');
  const token = user.getSignedJwtToken();

  console.log('Login successful for user:', user._id);
  res.status(200).json({
    success: true,
    token
  });
});

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user
  });
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if ('development' === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token
    });
};

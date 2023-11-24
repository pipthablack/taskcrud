import { v4 as uuidv4 } from 'uuid';
import asyncHandler from 'express-async-handler';
import authHelpers from '../middleware/authHandler.js';

// In-memory storage array for users
let users = [];

// Generate a unique user ID using the uuid library
function generateUserId() {
  return uuidv4();
}

// @desc    Register a new user
export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the user already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create a new user
  const newUser = {
    _id: generateUserId(), // Generate a unique user ID using uuid
    name,
    email,
    password, // In a real-world scenario, you should hash the password
  };

  users.push(newUser);

  // Generate tokens for the new user
  const { accessToken, refreshToken } = await authHelpers.generateToken({
    id: newUser._id, // Assuming this is the user's unique identifier
    userId: generateUserId(), // You may want to use a unique ID for userId
  });

  res.status(201).json({
    success: true,
    user: newUser,
    accessToken,
    refreshToken,
  });
});

// @desc    Login user
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = users.find((user) => user.email === email);

  if (!user || user.password !== password) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  // Generate tokens for the logged-in user
  const { accessToken, refreshToken } = await authHelpers.generateToken({
    id: user._id,
    userId: generateUserId(),
  });

  res.status(200).json({
    success: true,
    user,
    accessToken,
    refreshToken,
  });
});

// @desc    Logout user
export const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, message: 'Logout successful', token: null });
});


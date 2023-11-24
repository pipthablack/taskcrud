import asyncHandler from 'express-async-handler';
import { v4 as uuidv4 } from 'uuid';

// In-memory storage array
let tasks = [];

// @desc    Create a new task
export const createTask = asyncHandler(async (req, res) => {
  const { description, status, dueDate } = req.body;

  // Create a new task associated with the authenticated user
  const newTask = {
    _id: uuidv4(), // Generate a UUID
    description,
    status: status || 'pending',
    dueDate,
    user: req.user._id, // Assuming user information is stored in req.user after authentication
  };

  tasks.push(newTask);

  res.status(201).json({
    success: true,
    task: newTask,
  });
});

// @desc    View all tasks for a user
export const viewTasks = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Assuming user information is stored in req.user after authentication

  // Fetch all tasks for the authenticated user
  const userTasks = tasks.filter(task => task.user === userId);

  res.status(200).json({
    success: true,
    tasks: userTasks,
  });
});

// @desc    Update a task
export const updateTask = asyncHandler(async (req, res) => {
  const taskId = req.params.id;

  const { description, status, dueDate } = req.body;

  // Find the task by ID
  const taskIndex = tasks.findIndex(task => task._id === taskId);

  // If the task doesn't exist
  if (taskIndex === -1) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Ensure the authenticated user owns the task
  if (tasks[taskIndex].user !== req.user._id) {
    res.status(403);
    throw new Error('Unauthorized. You do not own this task.');
  }

  // Update task details
  tasks[taskIndex].description = description || tasks[taskIndex].description;
  tasks[taskIndex].status = status || tasks[taskIndex].status;
  tasks[taskIndex].dueDate = dueDate || tasks[taskIndex].dueDate;

  res.status(200).json({
    success: true,
    task: tasks[taskIndex],
  });
});

// @desc    Delete a task
export const deleteTask = asyncHandler(async (req, res) => {
  const taskId = req.params.id;

  // Find the task by ID
  const taskIndex = tasks.findIndex(task => task._id === taskId);

  // If the task doesn't exist
  if (taskIndex === -1) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Ensure the authenticated user owns the task
  if (tasks[taskIndex].user !== req.user._id) {
    res.status(403);
    throw new Error('Unauthorized. You do not own this task.');
  }

  // Delete the task
  tasks.splice(taskIndex, 1);

  res.status(200).json({
    success: true,
    message: 'Task deleted successfully',
  });
});

// @desc    Update task status (completed or pending)
export const updateTaskStatus = asyncHandler(async (req, res) => {
  const taskId = req.params.id;
  const { status } = req.body;

  // Find the task by ID
  const taskIndex = tasks.findIndex(task => task._id === taskId);

  // If the task doesn't exist
  if (taskIndex === -1) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Ensure the authenticated user owns the task
  if (tasks[taskIndex].user !== req.user._id) {
    res.status(403);
    throw new Error('Unauthorized. You do not own this task.');
  }

  // Update task status
  tasks[taskIndex].status = status || tasks[taskIndex].status;

  res.status(200).json({
    success: true,
    task: tasks[taskIndex],
  });
});

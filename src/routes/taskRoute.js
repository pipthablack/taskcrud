// tasksRoute.js

import express from 'express';
import {
  createTask,
  viewTasks,
  updateTask,
  deleteTask,
  updateTaskStatus,
} from  '../controllers/taskController.js'
import authHelpers from '../middleware/authHandler.js' 

const router = express.Router();


// Middleware to protect routes below this point
router.use((req, res, next) => {
    authHelpers.authenticateAccessToken(req, res, next);
  });

// Task routes
router.route('/').post(createTask).get(viewTasks);
router.route('/:id').put(updateTask)
router.route('/:id').delete(deleteTask);
router.route('/:id/status').put(updateTaskStatus);

export default router;

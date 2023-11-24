import express from 'express';
import {createUser, loginUser, logoutUser}  from '../controllers/userController.js';


const router = express.Router();

// create user
router.route('/signup').post(createUser);
// login user
router.route('/login').post(loginUser);
// logout user
router.route('/logout').get(logoutUser);

export default router;
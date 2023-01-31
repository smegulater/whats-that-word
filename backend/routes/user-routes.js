import express from 'express';
import {registerUser, loginUser, getUserData} from '../controllers/user-controller.js';
import protect from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.route('/').post(registerUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/me').get(protect, getUserData);

export default userRouter;
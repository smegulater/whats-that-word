import express from 'express';
import { getGoals, setGoal, updateGoal, deleteGoal} from '../controllers/goal-controller.js';
import protect from "../middleware/authMiddleware.js";

const goalsRouter = express.Router();

goalsRouter.route('/').get(protect, getGoals).post(protect, setGoal);
goalsRouter.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal);

export default goalsRouter;
import asyncHandler from 'express-async-handler'
import Goal from '../models/goal-model.js'
import User from '../models/user-model.js'

//@desc Get goals
//@route GET /api/goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id })
  res.status(200).json(goals)
})

//@desc Create goals
//@route POST /api/goals
//@access Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Goal text required')
  }

  const goal = await Goal.create({ text: req.body.text, user: req.user.id })
  res.status(200).json({ goal })
})

//@desc Delete goals
//@route DELETE /api/goal/:id
//@access Private
const deleteGoal = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400)
    throw new Error('Id for the goal to be deleted is required')
  }

  const goalToDelete = await Goal.findById(req.params.id)

  if (!goalToDelete) {
    res.status(400)
    throw new Error('Goal not found')
  }

  //user check
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (goalToDelete.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authrised to delete this goal')
  }

  await goalToDelete.remove()

  res.status(200).json({ message: 'Goal deleted successfully', id: req.params.id })
})

//@desc Update goals
//@route PUT /api/goals/:id
//@access Private
const updateGoal = asyncHandler(async (req, res) => {
  const goalToUpdate = await Goal.findById({ _id: req.params.id })
  if (!goalToUpdate) {
    res.status(400)
    throw new Error('Goal not found')
  }

  //user check
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authrised to edit this goal')
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.status(200).json({ message: 'Goal updated successfully', goal: updatedGoal })
})

export { getGoals, setGoal, deleteGoal, updateGoal }

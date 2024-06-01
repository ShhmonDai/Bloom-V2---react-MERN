import { errorHandler } from '../utils/error.js';
import Goal from '../models/goal.model.js';

export const creategoal = async (req, res, next) => {
    try {
        const { userId, title, content, category } = req.body;

        if (userId !== req.user.id) {
            return next(
                errorHandler(403, 'You are not allowed to create this goal')
            );
        }

        const newGoal = new Goal({
            userId,
            title,
            content,
            category,
        });
        await newGoal.save();

        res.status(200).json(newGoal);
    } catch (error) {
        next(error);
    }
};

export const getcategorygoals = async (req, res, next) => {
    try {
        const goals = await Goal.find({ 
            userId: req.params.userId,
            accomplished: false,
            ...(req.query.category && { category: req.query.category }),
        }).sort({
            createdAt: 1,
        });

        const accomplishedGoals = await Goal.find({
            userId: req.params.userId,
            accomplished: true,
            ...(req.query.category && { category: req.query.category }),
        }).sort({
            createdAt: 1,
        });

        const finishedGoals = await Goal.countDocuments({
            userId: req.params.userId,
            accomplished: true,
            category: req.query.category,
        });


        res.status(200).json({goals, finishedGoals, accomplishedGoals});
    } catch (error) {
        next(error);
    }
};



export const getgoals = async (req, res, next) => {
    try {
        const goals = await Goal.find({ userId: req.params.userId}).sort({
            createdAt: 1,
        });
        res.status(200).json({ goals });
    } catch (error) {
        next(error);
    }
};

export const accomplishgoal = async (req, res, next) => {
    try {
        const goal = await Goal.findById(req.params.goalId);
        if (!goal) {
            return next(errorHandler(404, 'Goal not found'));
        }
        if (goal.userId !== req.user.id) {
            return next(
                errorHandler(403, 'You are not allowed to edit this goal')
            );
        }

        const accomplishedGoal = await Goal.findByIdAndUpdate(
            req.params.goalId,
            {
                accomplished: req.body.accomplished,
            },
            { new: true }
        );
        res.status(200).json(accomplishedGoal);
    } catch (error) {
        next(error);
    }
};

export const editgoal = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to edit this goal'));
    }
    try {
        const editedGoal = await Goal.findByIdAndUpdate(
            req.params.goalId,
            {
                $set: {
                    title: req.body.title,
                    content: req.body.content,
                },
            },
            { new: true }
        );
        res.status(200).json(editedGoal);
    } catch (error) {
        next(error);
    }
};



export const deletegoal = async (req, res, next) => {
    try {
        const goal = await Goal.findById(req.params.goalId);
        if (!goal) {
            return next(errorHandler(404, 'Goal not found'));
        }
        if (goal.userId !== req.user.id) {
            return next(
                errorHandler(403, 'You are not allowed to delete this goal')
            );
        }
        await Goal.findByIdAndDelete(req.params.goalId);
        res.status(200).json('Goal has been deleted');
    } catch (error) {
        next(error);
    }
};


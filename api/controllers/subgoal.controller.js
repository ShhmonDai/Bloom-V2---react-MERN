import { errorHandler } from '../utils/error.js';
import Subgoal from '../models/subgoal.model.js';

export const createsubgoal = async (req, res, next) => {
    try {
        const { title, content, goalId, userId, category, priority } = req.body;

        if (userId !== req.user.id) {
            return next(
                errorHandler(403, 'You are not allowed to create this subgoal')
            );
        }

        const newSubgoal = new Subgoal({
            title,
            content,
            goalId,
            userId,
            category,
            priority,
        });
        await newSubgoal.save();

        res.status(200).json(newSubgoal);
    } catch (error) {
        next(error);
    }
};

export const getcategorysubgoals = async (req, res, next) => {
    try {
        const subgoals = await Subgoal.find({ 
            userId: req.params.userId,
            ...(req.query.category && {category: req.query.category }),
         }).sort({
            priority: -1,
        });
        res.status(200).json({subgoals});
    } catch (error) {
        next(error);
    }
};


export const getsubgoals = async (req, res, next) => {
    try {
        const subgoals = await Subgoal.find({ userId: req.params.userId }).sort({
            priority: -1,
        });
        res.status(200).json({subgoals});
    } catch (error) {
        next(error);
    }
};

export const getgoalsubgoals = async (req, res, next) => {
    try {
        const subgoals = await Subgoal.find({ goalId: req.params.goalId }).sort({
            priority: -1,
        });

        const finishedSubgoals = await Subgoal.countDocuments({
            accomplished: true,
            goalId: req.params.goalId,
        });

        const totalSubgoals = await Subgoal.countDocuments({
            goalId: req.params.goalId,
        });

        const categoryScore = await Subgoal.countDocuments({
            userId: req.params.userId,
            category: req.query.category,
            accomplished: true,
        });

        res.status(200).json({subgoals, finishedSubgoals, totalSubgoals, categoryScore});
    } catch (error) {
        next(error);
    }
};

export const accomplishsubgoal = async (req, res, next) => {
    try {
        const subgoal = await Subgoal.findById(req.params.subgoalId);
        if (!subgoal) {
            return next(errorHandler(404, 'Subgoal not found'));
        }
        if (subgoal.userId !== req.user.id) {
            return next(
                errorHandler(403, 'You are not allowed to edit this goal')
            );
        }

        const accomplishedSubgoal = await Subgoal.findByIdAndUpdate(
            req.params.subgoalId,
            {
                accomplished: req.body.accomplished,
                priority: req.body.priority,
            },
            { new: true }
        );
        res.status(200).json(accomplishedSubgoal);
    } catch (error) {
        next(error);
    }
};

export const editsubgoal = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to edit this goal'));
    }
    try {
        const editedSubgoal = await Subgoal.findByIdAndUpdate(
            req.params.subgoalId,
            {
                $set: {
                    title: req.body.title,
                    content: req.body.content,
                    priority: req.body.priority,
                },
            },
            { new: true }
        );
        res.status(200).json(editedSubgoal);
    } catch (error) {
        next(error);
    }
};



export const deletesubgoal = async (req, res, next) => {
    try {
        const subgoal = await Subgoal.findById(req.params.subgoalId);
        if (!subgoal) {
            return next(errorHandler(404, 'Subgoal not found'));
        }
        if (subgoal.userId !== req.user.id) {
            return next(
                errorHandler(403, 'You are not allowed to delete this subgoal')
            );
        }
        await Subgoal.findByIdAndDelete(req.params.subgoalId);
        res.status(200).json('Subgoal has been deleted');
    } catch (error) {
        next(error);
    }
};

export const deletegoalsubgoals = async (req, res, next) => {
    try {
        await Subgoal.deleteMany({ goalId: req.params.goalId, userId: req.params.userId });
        res.status(200).json('Subgoals have been deleted');
    } catch (error) {
        next(error);
    }
};


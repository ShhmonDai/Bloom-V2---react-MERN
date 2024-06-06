import { errorHandler } from '../utils/error.js';
import Goal from '../models/goal.model.js';
import Subgoal from '../models/subgoal.model.js';
import Habit from '../models/habit.model.js';


export const getcategoryscore = async (req, res, next) => {
    try {

        const totalSubgoals = await Subgoal.countDocuments({
            userId: req.params.userId,
            category: req.query.category,
        });
        const totalGoals = await Goal.countDocuments({ 
            userId: req.params.userId,
            category: req.query.category, 
        });

        const subgoalScore = await Subgoal.countDocuments({
            userId: req.params.userId,
            category: req.query.category,
            accomplished: true,
        });

        const goalScore = await Goal.countDocuments({
            userId: req.params.userId,
            category: req.query.category,
            accomplished: true,
        });

        const mindHabitScore = await Habit.aggregate(
            [
                {
                    $match: { 
                        category: "mind",
                        userId: req.params.userId
                     }
                },
                {
                    $group: {
                        _id: "$category",
                        total: { $sum: { $size: "$datescompleted" } }
                    }
                }
            ]
        );

        const bodyHabitScore = await Habit.aggregate(
            [
                {
                    $match: {
                        category: "body",
                        userId: req.params.userId
                    }
                },
                {
                    $group: {
                        _id: "$category",
                        total: { $sum: { $size: "$datescompleted" } }
                    }
                }
            ]
        );

        const spiritHabitScore = await Habit.aggregate(
            [
                {
                    $match: {
                        category: "spirit",
                        userId: req.params.userId
                    }
                },
                {
                    $group: {
                        _id: "$category",
                        total: { $sum: { $size: "$datescompleted" } }
                    }
                }
            ]
        );

        res.status(200).json({ totalGoals, totalSubgoals, subgoalScore, goalScore, mindHabitScore, spiritHabitScore, bodyHabitScore });
    } catch (error) {
        next(error);
    }
};
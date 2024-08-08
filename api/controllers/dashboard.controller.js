import { errorHandler } from '../utils/error.js';
import Goal from '../models/goal.model.js';
import Subgoal from '../models/subgoal.model.js';
import Habit from '../models/habit.model.js';

export const getstatistics = async (req, res, next) => {
    try {

        const totalMindSubgoals = await Subgoal.countDocuments({
            userId: req.params.userId,
            category: "mind",
        });
        const totalMindGoals = await Goal.countDocuments({
            userId: req.params.userId,
            category: "mind",
        });

        const completedMindSubgoals = await Subgoal.countDocuments({
            userId: req.params.userId,
            category: "mind",
            accomplished: true,
        });

        const completedMindGoals = await Goal.countDocuments({
            userId: req.params.userId,
            category: "mind",
            accomplished: true,
        });

        const totalBodySubgoals = await Subgoal.countDocuments({
            userId: req.params.userId,
            category: "body",
        });
        const totalBodyGoals = await Goal.countDocuments({
            userId: req.params.userId,
            category: "body",
        });

        const completedBodySubgoals = await Subgoal.countDocuments({
            userId: req.params.userId,
            category: "body",
            accomplished: true,
        });

        const completedBodyGoals = await Goal.countDocuments({
            userId: req.params.userId,
            category: "body",
            accomplished: true,
        });

        const totalSpiritSubgoals = await Subgoal.countDocuments({
            userId: req.params.userId,
            category: "spirit",
        });
        const totalSpiritGoals = await Goal.countDocuments({
            userId: req.params.userId,
            category: "spirit",
        });

        const completedSpiritSubgoals = await Subgoal.countDocuments({
            userId: req.params.userId,
            category: "spirit",
            accomplished: true,
        });

        const completedSpiritGoals = await Goal.countDocuments({
            userId: req.params.userId,
            category: "spirit",
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

        const latestMindSubgoals = await Subgoal.find({
            userId: req.params.userId,
            category: "mind",
            accomplished: "false",
        }).sort({
            createdAt: -1,
        }).limit(3);

        const oldestMindSubgoals = await Subgoal.find({
            userId: req.params.userId,
            category: "mind",
            accomplished: "false",
        }).sort({
            createdAt: 1,
        }).limit(3);

        const latestBodySubgoals = await Subgoal.find({
            userId: req.params.userId,
            category: "body",
            accomplished: "false",
        }).sort({
            createdAt: -1,
        }).limit(3);

        const oldestBodySubgoals = await Subgoal.find({
            userId: req.params.userId,
            category: "body",
            accomplished: "false",
        }).sort({
            createdAt: 1,
        }).limit(3);

        const latestSpiritSubgoals = await Subgoal.find({
            userId: req.params.userId,
            category: "spirit",
            accomplished: "false",
        }).sort({
            createdAt: -1,
        }).limit(3);

        const oldestSpiritSubgoals = await Subgoal.find({
            userId: req.params.userId,
            category: "spirit",
            accomplished: "false",
        }).sort({
            createdAt: 1,
        }).limit(3);

        const weekday = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        const date = new Date();
        const todaysDay = weekday[date.getDay()];

        const timelineHabits = await Habit.find({
            userId: req.params.userId,
            daysofweek: todaysDay,
        }).sort({
            timeofday: 1,
        });


        res.status(200).json({ totalMindSubgoals, totalMindGoals, completedMindGoals, completedMindSubgoals, 
            totalBodySubgoals, totalBodyGoals, completedBodyGoals, completedBodySubgoals,
            totalSpiritSubgoals, totalSpiritGoals, completedSpiritGoals, completedSpiritSubgoals,
            latestMindSubgoals, oldestMindSubgoals,
            latestBodySubgoals, oldestBodySubgoals,
            latestSpiritSubgoals, oldestSpiritSubgoals,
            timelineHabits,
            mindHabitScore, spiritHabitScore, bodyHabitScore });
    } catch (error) {
        next(error);
    }
};
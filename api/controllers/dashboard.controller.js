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

        /*
        const totalMindGoals = await Goal.countDocuments({
            userId: req.params.userId,
            category: "mind",
        });
        */

        const completedMindSubgoals = await Subgoal.countDocuments({
            userId: req.params.userId,
            category: "mind",
            accomplished: true,
        });

        /*
        const completedMindGoals = await Goal.countDocuments({
            userId: req.params.userId,
            category: "mind",
            accomplished: true,
        });
        */

        const totalBodySubgoals = await Subgoal.countDocuments({
            userId: req.params.userId,
            category: "body",
        });

        /*
        const totalBodyGoals = await Goal.countDocuments({
            userId: req.params.userId,
            category: "body",
        });
        */


        const completedBodySubgoals = await Subgoal.countDocuments({
            userId: req.params.userId,
            category: "body",
            accomplished: true,
        });

        /*
        const completedBodyGoals = await Goal.countDocuments({
            userId: req.params.userId,
            category: "body",
            accomplished: true,
        });
        */

        const totalSpiritSubgoals = await Subgoal.countDocuments({
            userId: req.params.userId,
            category: "spirit",
        });

        /*
        const totalSpiritGoals = await Goal.countDocuments({
            userId: req.params.userId,
            category: "spirit",
        });
        */

        const completedSpiritSubgoals = await Subgoal.countDocuments({
            userId: req.params.userId,
            category: "spirit",
            accomplished: true,
        });

        /*
        const completedSpiritGoals = await Goal.countDocuments({
            userId: req.params.userId,
            category: "spirit",
            accomplished: true,
        });
        */

        const totalMindHabits = await Habit.countDocuments({
            userId: req.params.userId,
            category: "mind",
        });

        const totalBodyHabits = await Habit.countDocuments({
            userId: req.params.userId,
            category: "body",
        });

        const totalSpiritHabits = await Habit.countDocuments({
            userId: req.params.userId,
            category: "spirit",
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

        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );

        const oneWeekAgo = new Date(
            now.getDate() - 7
        );



        const mindHabitsLastWeek = await Habit.aggregate(
            [
                {
                    $match: {
                        category: "mind",
                        userId: req.params.userId,
                        updatedAt: { $gte: oneWeekAgo }
                    }
                },
                {
                    $group: {
                        _id: "$category",
                        total: { $sum: 1 }
                    }
                }
            ]
        );

        const bodyHabitsLastWeek = await Habit.aggregate(
            [
                {
                    $match: {
                        category: "body",
                        userId: req.params.userId,
                        updatedAt: { $gte: oneWeekAgo }
                    }
                },
                {
                    $group: {
                        _id: "$category",
                        total: { $sum: 1 }
                    }
                }
            ]
        );

        const spiritHabitsLastWeek = await Habit.aggregate(
            [
                {
                    $match: {
                        category: "spirit",
                        userId: req.params.userId,
                        updatedAt: { $gte: oneWeekAgo }
                    }
                },
                {
                    $group: {
                        _id: "$category",
                        total: { $sum: 1 }
                    }
                }
            ]
        );

        const mindSubgoalsLastMonth = await Subgoal.countDocuments({
            userId: req.params.userId,
            updatedAt: { $gte: oneMonthAgo },
            category: "mind",
            accomplished: true,
        });

        const bodySubgoalsLastMonth = await Subgoal.countDocuments({
            userId: req.params.userId,
            updatedAt: { $gte: oneMonthAgo },
            category: "body",
            accomplished: true,
        });

        const spiritSubgoalsLastMonth = await Subgoal.countDocuments({
            userId: req.params.userId,
            updatedAt: { $gte: oneMonthAgo },
            category: "spirit",
            accomplished: true,
        });


        const latestSubgoals = await Subgoal.find({
            userId: req.params.userId,
            accomplished: "false",
        }).sort({
            createdAt: -1,
        }).limit(3);

        const oldestSubgoals = await Subgoal.find({
            userId: req.params.userId,
            accomplished: "false",
        }).sort({
            createdAt: 1,
        }).limit(3);

    
        const weekday = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        const todaysDay = weekday[now.getDay()];

        const timelineHabits = await Habit.find({
            userId: req.params.userId,
            daysofweek: todaysDay,
        }).sort({
            timeofday: 1,
        });




        res.status(200).json({ totalMindSubgoals, completedMindSubgoals, 
            totalBodySubgoals, completedBodySubgoals,
            totalSpiritSubgoals, completedSpiritSubgoals,
            totalMindHabits, totalBodyHabits, totalSpiritHabits,
            latestSubgoals, oldestSubgoals,
            mindHabitsLastWeek, bodyHabitsLastWeek, spiritHabitsLastWeek,
            mindSubgoalsLastMonth, bodySubgoalsLastMonth, spiritSubgoalsLastMonth,
            timelineHabits,
            mindHabitScore, spiritHabitScore, bodyHabitScore });

    } catch (error) {
        next(error);
    }
};
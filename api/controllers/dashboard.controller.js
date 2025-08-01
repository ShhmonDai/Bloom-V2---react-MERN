import { errorHandler } from '../utils/error.js';
import Goal from '../models/goal.model.js';
import Subgoal from '../models/subgoal.model.js';
import Habit from '../models/habit.model.js';

export const getstatistics = async (req, res, next) => {
    try {

        const scoresStartDate = new Date();
        if(!req.query.scoresFrom){
            scoresStartDate.setFullYear(scoresStartDate.getFullYear() - 1);  
        } else {
            const scoresFromMonths = parseInt(req.query.scoresFrom, 10);

            if (scoresFromMonths === 0) {
                scoresStartDate.setFullYear(scoresStartDate.getFullYear() - 100);
            } else if (scoresFromMonths === 12) {
                scoresStartDate.setFullYear(scoresStartDate.getFullYear() - 1);
            } else {
                scoresStartDate.setMonth(scoresStartDate.getMonth() - scoresFromMonths);
            }
        }

        const totalMindSubgoals = await Subgoal.countDocuments({
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

        const mindHabitScoreResult = await Habit.aggregate([
            {
                $match: {
                    category: "mind",
                    userId: req.params.userId,
                },
            },
            {
                $addFields: {
                    datescompleted: {
                        $map: {
                            input: "$datescompleted",
                            as: "date",
                            in: {
                                $dateFromString: {
                                    dateString: {
                                        $concat: [
                                            { $arrayElemAt: [{ $split: ["$$date", "-"] }, 2] },
                                            "-",
                                            { $arrayElemAt: [{ $split: ["$$date", "-"] }, 0] },
                                            "-",
                                            { $arrayElemAt: [{ $split: ["$$date", "-"] }, 1] },
                                        ],
                                    },
                                },
                            },
                        },
                    },
                },
            },
            {
                $unwind: "$datescompleted",
            },
            {
                $match: {
                    "datescompleted": { $gte: scoresStartDate },
                },
            },
            {
                $group: {
                    _id: "$category",
                    total: { $sum: 1 },
                },
            },
        ]);
        const mindHabitScore = mindHabitScoreResult[0]?.total || 0;

        const bodyHabitScoreResult = await Habit.aggregate([
            {
                $match: {
                    category: "body",
                    userId: req.params.userId,
                },
            },
            {
                $addFields: {
                    datescompleted: {
                        $map: {
                            input: "$datescompleted",
                            as: "date",
                            in: {
                                $dateFromString: {
                                    dateString: {
                                        $concat: [
                                            { $arrayElemAt: [{ $split: ["$$date", "-"] }, 2] },
                                            "-",
                                            { $arrayElemAt: [{ $split: ["$$date", "-"] }, 0] },
                                            "-",
                                            { $arrayElemAt: [{ $split: ["$$date", "-"] }, 1] },
                                        ],
                                    },
                                },
                            },
                        },
                    },
                },
            },
            {
                $unwind: "$datescompleted",
            },
            {
                $match: {
                    "datescompleted": { $gte: scoresStartDate },
                },
            },
            {
                $group: {
                    _id: "$category",
                    total: { $sum: 1 },
                },
            },
        ]);
        const bodyHabitScore = bodyHabitScoreResult[0]?.total || 0;

        const spiritHabitScoreResult = await Habit.aggregate([
            {
                $match: {
                    category: "spirit",
                    userId: req.params.userId,
                },
            },
            {
                $addFields: {
                    datescompleted: {
                        $map: {
                            input: "$datescompleted",
                            as: "date",
                            in: {
                                $dateFromString: {
                                    dateString: {
                                        $concat: [
                                            { $arrayElemAt: [{ $split: ["$$date", "-"] }, 2] },
                                            "-",
                                            { $arrayElemAt: [{ $split: ["$$date", "-"] }, 0] },
                                            "-",
                                            { $arrayElemAt: [{ $split: ["$$date", "-"] }, 1] },
                                        ],
                                    },
                                },
                            },
                        },
                    },
                },
            },
            {
                $unwind: "$datescompleted",
            },
            {
                $match: {
                    "datescompleted": { $gte: scoresStartDate },
                },
            },
            {
                $group: {
                    _id: "$category",
                    total: { $sum: 1 },
                },
            },
        ]);
        const spiritHabitScore = spiritHabitScoreResult[0]?.total || 0;

        const mindSubgoalScore = await Subgoal.countDocuments({
            userId: req.params.userId,
            category: 'mind',
            updatedAt: { $gte: scoresStartDate },
            accomplished: true,
        });

        const mindGoalScore = await Goal.countDocuments({
            userId: req.params.userId,
            category: 'mind',
            updatedAt: { $gte: scoresStartDate },
            accomplished: true,
        });

        const bodySubgoalScore = await Subgoal.countDocuments({
            userId: req.params.userId,
            category: 'body',
            updatedAt: { $gte: scoresStartDate },
            accomplished: true,
        });

        const bodyGoalScore = await Goal.countDocuments({
            userId: req.params.userId,
            category: 'body',
            updatedAt: { $gte: scoresStartDate },
            accomplished: true,
        });

        const spiritSubgoalScore = await Subgoal.countDocuments({
            userId: req.params.userId,
            category: 'spirit',
            updatedAt: { $gte: scoresStartDate },
            accomplished: true,
        });

        const spiritGoalScore = await Goal.countDocuments({
            userId: req.params.userId,
            category: 'spirit',
            updatedAt: { $gte: scoresStartDate },
            accomplished: true,
        });        

        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );

        const oneWeekAgo = new Date(now);
        oneWeekAgo.setDate(now.getDate()-7);


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

        const prioritySubgoals = await Subgoal.find({
            userId: req.params.userId,
            accomplished: "false",
        }).sort({
            priority: -1,
        }).limit(5);

    
        const weekday = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        const todaysDay = weekday[now.getDay()];

        const timelineHabits = await Habit.find({
            userId: req.params.userId,
            daysofweek: todaysDay,
        }).sort({
            timeofday: 1,
        });

        const totalMindScore = mindSubgoalScore + (mindHabitScore / 2) + (mindGoalScore * 2);
        const totalBodyScore = bodySubgoalScore + (bodyHabitScore / 2) + (bodyGoalScore * 2);
        const totalSpiritScore = spiritSubgoalScore + (spiritHabitScore / 2) + (spiritGoalScore * 2);




        res.status(200).json({ totalMindSubgoals, completedMindSubgoals, completedMindGoals,
            totalBodySubgoals, completedBodySubgoals, completedBodyGoals,
            totalSpiritSubgoals, completedSpiritSubgoals, completedSpiritGoals,
            totalMindHabits, totalBodyHabits, totalSpiritHabits,
            latestSubgoals, oldestSubgoals, prioritySubgoals,
            mindHabitsLastWeek, bodyHabitsLastWeek, spiritHabitsLastWeek,
            mindSubgoalsLastMonth, bodySubgoalsLastMonth, spiritSubgoalsLastMonth,
            timelineHabits,
            mindHabitScore, spiritHabitScore, bodyHabitScore,
            totalMindScore, totalBodyScore, totalSpiritScore,
            mindSubgoalScore, bodySubgoalScore, spiritSubgoalScore,
        });

    } catch (error) {
        next(error);
    }
};
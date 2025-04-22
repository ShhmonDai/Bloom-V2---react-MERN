import { errorHandler } from '../utils/error.js';
import Goal from '../models/goal.model.js';
import Subgoal from '../models/subgoal.model.js';
import Habit from '../models/habit.model.js';


export const getcategoryscore = async (req, res, next) => {
    try {

        const twelveMonthsAgo = new Date();
        twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

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
            updatedAt: { $gte: twelveMonthsAgo },
            accomplished: true,
        });

        const goalScore = await Goal.countDocuments({
            userId: req.params.userId,
            category: req.query.category,
            updatedAt: { $gte: twelveMonthsAgo },
            accomplished: true,
        });

        const mindHabitScore = await Habit.aggregate([
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
                    "datescompleted": { $gte: twelveMonthsAgo },
                },
            },
            {
                $group: {
                    _id: "$category",
                    total: { $sum: 1 },
                },
            },
        ]);

        const bodyHabitScore = await Habit.aggregate([
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
                    "datescompleted": { $gte: twelveMonthsAgo },
                },
            },
            {
                $group: {
                    _id: "$category",
                    total: { $sum: 1 },
                },
            },
        ]);

        const spiritHabitScore = await Habit.aggregate([
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
                    "datescompleted": { $gte: twelveMonthsAgo },
                },
            },
            {
                $group: {
                    _id: "$category",
                    total: { $sum: 1 },
                },
            },
        ]);

        res.status(200).json({ totalGoals, totalSubgoals, subgoalScore, goalScore, mindHabitScore, spiritHabitScore, bodyHabitScore });
    } catch (error) {
        next(error);
    }
};


/*

Explanation for getting habit score from habits completed 3 months ago:
$addFields: Converts each datescompleted string into a Date object. The dateFromString operator is used to parse the date string in the format MMM-DD-YYYY. The $split and $arrayElemAt operators rearrange the string components to match the YYYY-MM-DD format required by dateFromString.

$unwind: Deconstructs the datescompleted array, creating a document for each date.

Second $match: Filters out dates that are older than three months.

$group: Groups the documents by category and counts the remaining entries using $sum: 1.

Important Notes:
Date Format: Ensure that the datescompleted field consistently uses the MMM-DD-YYYY format. If the format varies, additional parsing logic will be needed.

Performance: This aggregation can be resource-intensive, especially with large datasets. Consider indexing the datescompleted field if performance becomes an issue.

Time Zones: The new Date() constructor uses the server's local time zone. If your application operates across multiple time zones, you might need to adjust for time zone differences.

By implementing this aggregation, you'll be able to calculate the total number of datescompleted entries for the "mind" category that are within the last three months.

*/
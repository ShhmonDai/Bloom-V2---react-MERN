import { errorHandler } from '../utils/error.js';
import AiUsage from '../models/aiusage.model.js';
import { startOfWeek } from 'date-fns';


export const getUsage = async (req, res, next) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 9;
        const skip = (page - 1) * limit;

        const [usage, totalCount] = await Promise.all([
            AiUsage.find()
                .populate('userId', 'username email profilePicture')
                .sort({ weekStart: -1 })
                .skip(skip)
                .limit(limit),
            AiUsage.countDocuments(),
        ]);

        const formatted = usage.map(u => ({
            _id: u._id,
            count: u.count,
            weekStart: u.weekStart,
            user: u.userId,
        }));

        const totalMessages = await AiUsage.aggregate([
            { $group: { _id: null, total: { $sum: '$count' } } },
        ]);

        const totalMessagesCount = totalMessages[0]?.total || 0;

        const totalPages = Math.ceil(totalCount / limit);

        const now = new Date();
        const weekStart = startOfWeek(now, { weekStartsOn: 1 });

        const nextWeekStart = new Date(weekStart);
        nextWeekStart.setDate(weekStart.getDate() + 7);

        const lastWeekUsage = await AiUsage.aggregate([
            {
                $match: {
                    weekStart: {
                        $gte: weekStart,
                        $lt: nextWeekStart,
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$count' },
                },
            },
        ]);

        const lastWeekMessages = lastWeekUsage[0]?.total || 0;

        res.json({
            usage: formatted,
            totalMessagesCount,
            lastWeekMessages,
            totalPages,
            currentPage: page,
        });
    } catch (err) {
        console.error('Error fetching AI usage:', err);
        res.status(500).json({ error: 'Failed to fetch usage data' });
    }
};

export const getUsageOne = async (req, res, next) => {
    try {
        
        const userId = req.user?.id || req.params.userId;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        // Get start of the current week
        const now = new Date();
        const weekStart = startOfWeek(now, { weekStartsOn: 1 });
        weekStart.setUTCHours(0, 0, 0, 0); // normalize to UTC midnight

        // Get start of the next week
        const nextWeekStart = new Date(weekStart);
        nextWeekStart.setUTCDate(weekStart.getUTCDate() + 7);

        // Use range-based match to avoid timezone issues
        const usage = await AiUsage.find({
            userId,
            weekStart: {
                $gte: weekStart,
                $lt: nextWeekStart,
            },
        });

        res.status(200).json(usage);
    } catch (error) {
        console.error('Error fetching AI usage:', error);
        res.status(500).json({ error: 'Failed to fetch usage data' });
    }
};
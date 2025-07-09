import { errorHandler } from '../utils/error.js';
import AiUsage from '../models/aiusage.model.js';


export const getUsage = async (req, res, next) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const usage = await AiUsage.find()
            .populate('userId', 'username email profilePicture')
            .sort({ weekStart: -1 });

        const formatted = usage.map(u => ({
            _id: u._id,
            count: u.count,
            weekStart: u.weekStart,
            user: u.userId,
        }));

        res.json(formatted);
    } catch (err) {
        console.error('Error fetching AI usage:', err);
        res.status(500).json({ error: 'Failed to fetch usage data' });
    }
};
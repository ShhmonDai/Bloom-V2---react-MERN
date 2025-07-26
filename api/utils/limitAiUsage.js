import AiUsage from '../models/aiusage.model.js';
import { startOfWeek } from 'date-fns';

const MAX_MESSAGES_PER_WEEK = 15;

export const limitAiUsage = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const now = new Date();
        const weekStart = startOfWeek(now, { weekStartsOn: 1 });
        weekStart.setUTCHours(0, 0, 0, 0); // normalize to UTC 00:00

        let usage = await AiUsage.findOne({ userId, weekStart });

        if (!usage) {
            req.aiUsage = await AiUsage.create({ userId, weekStart, count: 1 });
        } else {
            if (usage.count >= MAX_MESSAGES_PER_WEEK && !req.user.isAdmin) {
                return res.status(429).json({ error: 'AI usage limit reached for this week.' });
            }
            usage.count += 1;
            await usage.save();
            req.aiUsage = usage;
        }

        next();
    } catch (error) {
        res.status(500).json({ error: 'Failed to check AI usage.' });
    }
  };
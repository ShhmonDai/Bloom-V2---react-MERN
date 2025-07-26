import watsonUsage from '../models/watsonusage.model.js';
import { startOfWeek } from 'date-fns';

const MAX_JOURNALS_PER_WEEK = 7;

export const limitWatsonUsage = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const now = new Date();
        const weekStart = startOfWeek(now, { weekStartsOn: 1 });
        weekStart.setUTCHours(0, 0, 0, 0); // normalize to UTC 00:00

        let usage = await watsonUsage.findOne({ userId, weekStart });

        if (!usage) {
            req.watsonUsage = await watsonUsage.create({ userId, weekStart, count: 1 });
        } else {
            if (usage.count >= MAX_JOURNALS_PER_WEEK && !req.user.isAdmin) {
                return res.status(429).json({ error: 'Watson usage limit reached for this week.' });
            }
            usage.count += 1;
            await usage.save();
            req.watsonUsage = usage;
        }

        next();
    } catch (error) {
        res.status(500).json({ error: 'Failed to check Watson usage.' });
    }
  };
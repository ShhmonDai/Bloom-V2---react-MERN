import dotenv from 'dotenv';

import NaturalLanguageUnderstandingV1 from 'ibm-watson/natural-language-understanding/v1.js';
import { IamAuthenticator } from 'ibm-watson/auth/index.js';

import watsonUsage from '../models/watsonusage.model.js';

import { startOfWeek } from 'date-fns';


dotenv.config();


// Create the service wrapper
const nlu = new NaturalLanguageUnderstandingV1({
    version: '2020-03-10',
    authenticator: new IamAuthenticator({
        apikey: process.env.NATURAL_LANGUAGE_UNDERSTANDING_IAM_APIKEY,
    }),
    url: process.env.NATURAL_LANGUAGE_UNDERSTANDING_URL,
});

export const analyzetext = (req, res) => {

    const journalText = req.params.text;
    console.log(journalText);


    // https://cloud.ibm.com/apidocs/natural-language-understanding?code=node#emotion
    const options = {
        text: journalText,
        features: {
            emotion: {},
            sentiment: {},
            classifications: { model: "tone-classifications-en-v1"}
        },
        language: "en"
    };

    const analyzeJournal = async (options) => {
        try {
            const watsonResponse = await nlu.analyze(options)
            const emotionResponse = watsonResponse;
            console.log(emotionResponse);
            res.status(200).json(emotionResponse);
        }
        catch (error) {
            console.log(error);
            res.status(400).send({
                message: 'Unable to Analyze Journal Text.'
            });
        }

    }

    analyzeJournal(options);
};


export const test = (req, res) => {
    console.log('aayyLmao');
    res.status(200).json('ayylmao');
};

export const getUsage = async (req, res, next) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 9;
        const skip = (page - 1) * limit;

        const [usage, totalCount] = await Promise.all([
            watsonUsage.find()
                .populate('userId', 'username email profilePicture')
                .sort({ weekStart: -1 })
                .skip(skip)
                .limit(limit),
            watsonUsage.countDocuments(),
        ]);

        const formatted = usage.map(u => ({
            _id: u._id,
            count: u.count,
            weekStart: u.weekStart,
            user: u.userId,
        }));

        const totalMessages = await watsonUsage.aggregate([
            { $group: { _id: null, total: { $sum: '$count' } } },
        ]);

        const totalMessagesCount = totalMessages[0]?.total || 0;

        const totalPages = Math.ceil(totalCount / limit);

        const now = new Date();
        const weekStart = startOfWeek(now, { weekStartsOn: 1 });

        const nextWeekStart = new Date(weekStart);
        nextWeekStart.setDate(weekStart.getDate() + 7);

        const lastWeekUsage = await watsonUsage.aggregate([
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
        console.error('Error fetching Watson usage:', err);
        res.status(500).json({ error: 'Failed to fetch usage data' });
    }
};

export const getUsageOne = async (req, res, next) => {
    try {

        const userId = req.user?.id || req.params.userId;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const now = new Date();
        const weekNow = startOfWeek(now, { weekStartsOn: 1 });

        const usage = await watsonUsage.find({ userId, weekStart: weekNow });

        res.status(200).json(usage);
    } catch (error) {
        console.error('Error fetching Watson usage:', error);
        res.status(500).json({ error: 'Failed to fetch usage data' });
    }
};
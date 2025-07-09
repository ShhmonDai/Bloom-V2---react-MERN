import dotenv from 'dotenv';

import NaturalLanguageUnderstandingV1 from 'ibm-watson/natural-language-understanding/v1.js';
import { IamAuthenticator } from 'ibm-watson/auth/index.js';

import watsonUsage from '../models/watsonusage.model.js';


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

        const usage = await watsonUsage.find()
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
        console.error('Error fetching Watson usage:', err);
        res.status(500).json({ error: 'Failed to fetch usage data' });
    }
};
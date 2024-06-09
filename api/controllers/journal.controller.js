import { errorHandler } from '../utils/error.js';
import Journal from '../models/journal.model.js';

export const createjournal = async (req, res, next) => {
    try {
        const { userId, title, content } = req.body;

        if (userId !== req.user.id) {
            return next(
                errorHandler(403, 'You are not allowed to create this journal entry')
            );
        }

        const newJournal = new Journal({
            userId,
            title,
            content,
        });
        await newJournal.save();

        res.status(200).json(newJournal);
    } catch (error) {
        next(error);
    }
};

export const getjournals = async (req, res, next) => {
    try {
        const journals = await Journal.find({
            userId: req.params.userId
        }).sort({
            createdAt: 1,
        });

        const maxpages = await Journal.countDocuments({
            userId: req.params.userId,
        });

        res.status(200).json({ journals, maxpages });
    } catch (error) {
        next(error);
    }
};

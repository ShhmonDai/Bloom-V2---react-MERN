import { errorHandler } from '../utils/error.js';
import Journal from '../models/journal.model.js';

export const createjournal = async (req, res, next) => {
    try {
        const { userId, title, content, emotions } = req.body;

        if (userId !== req.user.id) {
            return next(
                errorHandler(403, 'You are not allowed to create this journal entry')
            );
        }

        const newJournal = new Journal({
            userId,
            title,
            content,
            emotions,
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

export const deletejournal = async (req, res, next) => {
    try {
        const journal = await Journal.findById(req.params.journalId);
        if (!journal) {
            return next(errorHandler(404, 'Journal not found'));
        }
        if (journal.userId !== req.user.id) {
            return next(
                errorHandler(403, 'You are not allowed to delete this journal')
            );
        }
        await Journal.findByIdAndDelete(req.params.journalId);
        res.status(200).json('Journal has been deleted');
    } catch (error) {
        next(error);
    }
};

export const editjournal = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to edit this journal'));
    }
    try {
        const editedJournal = await Journal.findByIdAndUpdate(
            req.params.journalId,
            {
                $set: {
                    title: req.body.title,
                    content: req.body.content,
                },
            },
        );
        res.status(200).json(editedJournal);
    } catch (error) {
        next(error);
    }
};

export const editemotions = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to edit this journal'));
    }
    try {
        const editedJournal = await Journal.findByIdAndUpdate(
            req.params.journalId,
            {
                $addToSet: {
                    emotions: req.body.emotions
                },
            },
        );
        res.status(200).json(editedJournal);
    } catch (error) {
        next(error);
    }
};
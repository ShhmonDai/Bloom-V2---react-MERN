import { errorHandler } from '../utils/error.js';
import Note from '../models/note.model.js';

export const createnote = async (req, res, next) => {
    try {
        const { userId, title, content, goalId, category } = req.body;

        if (userId !== req.user.id) {
            return next(
                errorHandler(403, 'You are not allowed to create this note')
            );
        }

        const newNote = new Note({
            userId,
            title,
            content,
            category,
            goalId,
        });
        await newNote.save();

        res.status(200).json(newNote);
    } catch (error) {
        next(error);
    }
};

export const getcategorynotes = async (req, res, next) => {
    try {
        const notes = await Note.find({
            userId: req.params.userId,
            ...(req.query.category && { category: req.query.category }),
        }).sort({
            createdAt: 1,
        });
        res.status(200).json({ notes });
    } catch (error) {
        next(error);
    }
};

export const getgoalnotes = async (req, res, next) => {
    try {
        const notes = await Note.find({
            goalId: req.params.goalId,
            ...(req.query.category && { category: req.query.category }),
        }).sort({
            createdAt: 1,
        });
        res.status(200).json({ notes });
    } catch (error) {
        next(error);
    }
};

export const editnote = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to edit this note'));
    }
    try {
        const editedNote = await Note.findByIdAndUpdate(
            req.params.noteId,
            {
                $set: {
                    title: req.body.title,
                    content: req.body.content,
                },
            },
            { new: true }
        );
        res.status(200).json(editedNote);
    } catch (error) {
        next(error);
    }
};



export const deletenote = async (req, res, next) => {
    try {
        const note = await Note.findById(req.params.noteId);
        if (!note) {
            return next(errorHandler(404, 'Note not found'));
        }
        if (note.userId !== req.user.id) {
            return next(
                errorHandler(403, 'You are not allowed to delete this note')
            );
        }
        await Note.findByIdAndDelete(req.params.noteId);
        res.status(200).json('Note has been deleted');
    } catch (error) {
        next(error);
    }
};

export const deletegoalnotes = async (req, res, next) => {
    try {
        await Note.deleteMany({ goalId: req.params.goalId, userId: req.params.userId });
        res.status(200).json('Notes have been deleted');
    } catch (error) {
        next(error);
    }
};
import { errorHandler } from '../utils/error.js';
import Habit from '../models/habit.model.js';

export const createhabit = async (req, res, next) => {
    try {
        const { userId, category, title, icon, timeofday, daysofweek, datescompleted } = req.body;

        if (userId !== req.user.id) {
            return next(
                errorHandler(403, 'You are not allowed to create this goal')
            );
        }

        const newHabit = new Habit({
            userId,
            category,
            title,
            icon,
            timeofday,
            daysofweek,
            datescompleted,
        });
        await newHabit.save();

        res.status(200).json(newHabit);
    } catch (error) {
        next(error);
    }
};

export const gethabits = async (req, res, next) => {
    try {
        const habits = await Habit.find({ userId: req.params.userId }).sort({
            priority: -1,
        });

        const mondayHabits = await Habit.find({
            userId: req.params.userId,
            daysofweek: 'monday',
        }).sort({
           timeofday: 1, 
        });

        const tuesdayHabits = await Habit.find({
            userId: req.params.userId,
            daysofweek: 'tuesday',
        }).sort({
            timeofday: 1,
        });

        const wednesdayHabits = await Habit.find({
            userId: req.params.userId,
            daysofweek: 'wednesday',
        }).sort({
            timeofday: 1,
        });

        const thursdayHabits = await Habit.find({
            userId: req.params.userId,
            daysofweek: 'thursday',
        }).sort({
            timeofday: 1,
        });

        const fridayHabits = await Habit.find({
            userId: req.params.userId,
            daysofweek: 'friday',
        }).sort({
            timeofday: 1,
        });

        const saturdayHabits = await Habit.find({
            userId: req.params.userId,
            daysofweek: 'saturday',
        }).sort({
            timeofday: 1,
        });

        const sundayHabits = await Habit.find({
            userId: req.params.userId,
            daysofweek: 'sunday',
        }).sort({
            timeofday: 1,
        });


        res.status(200).json({ mondayHabits, tuesdayHabits, wednesdayHabits, thursdayHabits, fridayHabits, saturdayHabits, sundayHabits});
    } catch (error) {
        next(error);
    }
};

export const edithabit = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to edit this habit'));
    }
    try {
        const editedHabit = await Habit.findByIdAndUpdate(
            req.params.habitId,
            {
                $set: {
                    title: req.body.title,
                    category: req.body.category,
                    icon: req.body.icon,
                    timeofday: req.body.timeofday,
                    daysofweek: req.body.daysofweek,
                },
            },
            { new: true }
        );
        res.status(200).json(editedHabit);
    } catch (error) {
        next(error);
    }
};

export const deletehabit = async (req, res, next) => {
    try {
        const habit = await Habit.findById(req.params.habitId);
        if (!habit) {
            return next(errorHandler(404, 'Habit not found'));
        }
        if (habit.userId !== req.user.id) {
            return next(
                errorHandler(403, 'You are not allowed to delete this habit')
            );
        }
        await Habit.findByIdAndDelete(req.params.habitId);
        res.status(200).json('Habit has been deleted');
    } catch (error) {
        next(error);
    }
};


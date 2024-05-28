import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            default: 'mind',
        },
        title: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        },
        timeofday: {
            type: String,
            required: true,
        },
        daysofweek: {
            type: [String],
            validate: v => Array.isArray(v) && v.length > 0,
        },
        datescompleted: {
            type: [Date],
        },
    },
    { timestamps: true }
);

const Habit = mongoose.model('Habit', habitSchema);

export default Habit;
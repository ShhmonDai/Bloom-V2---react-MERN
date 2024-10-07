import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        accomplished: {
            type: Boolean,
            default: false,
        },
        category: {
            type: String,
            default: 'uncategorized',
        },
        priority: {
            type: Number,
            default: 0,
        },
        hideDone: {
            type: String,
            default: 'visible',
        },
        createdOn: { 
            type: Date, 
            default: Date.now,
        },
    },
    { timestamps: true }
);

const Goal = mongoose.model('Goal', goalSchema);

export default Goal;
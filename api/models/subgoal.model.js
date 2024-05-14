import mongoose from 'mongoose';

const subgoalSchema = new mongoose.Schema(
    {
        goalId: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            default: 'uncategorized',
        },
        accomplished: {
            type: Boolean,
            default: false,
        },
        createdOn: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const Subgoal = mongoose.model('Subgoal', subgoalSchema);

export default Subgoal;
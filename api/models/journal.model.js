import mongoose from 'mongoose';

const journalSchema = new mongoose.Schema(
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
        emotions: {
            type: [{
                label: String,
                score: String
            }],
            default: undefined
        }
    },
    { timestamps: true }
);

const Journal = mongoose.model('Journal', journalSchema);

export default Journal;
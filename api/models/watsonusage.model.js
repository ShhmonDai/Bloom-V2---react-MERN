import mongoose from 'mongoose';

const watsonUsageSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    count: { type: Number, default: 0 },
    weekStart: { type: Date, required: true } // start of the tracked week
});

export default mongoose.model('watsonUsage', watsonUsageSchema);

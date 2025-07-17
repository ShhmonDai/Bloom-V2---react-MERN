import express from 'express';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import path from 'path';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import goalRoutes from './routes/goal.route.js';
import subgoalRoutes from './routes/subgoal.route.js';
import commentRoutes from './routes/comment.route.js';
import noteRoutes from './routes/note.route.js';
import categoryRoutes from './routes/category.route.js';
import dashboardRoutes from './routes/dashboard.route.js';
import habitRoutes from './routes/habit.route.js';
import journalRoutes from './routes/journal.route.js';
import watsonRoutes from './routes/watson.route.js';
import chatRoutes from './routes/chat.route.js';
import aiRoutes from './routes/ai.route.js';


const PORT = process.env.PORT || 3000;
dotenv.config();

mongoose.connect(process.env.MONGO
)
.then( () => {
    console.log('MongoDb is connected');
})
.catch((err) => {
    console.log(err);
});

const __dirname = path.resolve();
const app = express();

const aiLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 min
    max: 15, // limit each IP to 15 requests per window
    headers: false,
    message: { 
        error: 'Too many requests from this IP, please try again later.',
    },
});

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 100, // limit each IP to 100 requests per window
    headers: false,
    message: 'Too many requests from this IP, please try again later.'
});


app.use(express.json());
app.use(cookieParser());


app.use('/api/user', limiter, userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/goal', goalRoutes);
app.use('/api/subgoal', subgoalRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/note', noteRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/habit', habitRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/watson', aiLimiter, watsonRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/chat', aiLimiter, chatRoutes);
app.use('/api/ai', aiRoutes);



app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
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
import cookieParser from 'cookie-parser';
import path from 'path';

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

app.use(express.json());
app.use(cookieParser());


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/goal', goalRoutes);
app.use('/api/subgoal', subgoalRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/note', noteRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/habit', habitRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/watson', watsonRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/chat', chatRoutes);



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

import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { sendPrompt } from '../controllers/chat.controller.js';

const router = express.Router();

router.post('/sendPrompt', verifyToken, sendPrompt);


export default router;
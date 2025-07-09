import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { limitAiUsage } from '../utils/limitAiUsage.js';
import { sendPrompt } from '../controllers/chat.controller.js';

const router = express.Router();

router.post('/sendPrompt', verifyToken, limitAiUsage, sendPrompt);


export default router;
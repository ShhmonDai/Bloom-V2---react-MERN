import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { getUsage } from '../controllers/ai.controller.js';

const router = express.Router();

router.get('/getUsage', verifyToken, getUsage);


export default router;
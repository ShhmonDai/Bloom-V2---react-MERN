import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { getUsage, getUsageOne } from '../controllers/ai.controller.js';

const router = express.Router();

router.get('/getUsage', verifyToken, getUsage);
router.get('/getUsageOne', verifyToken, getUsageOne);


export default router;
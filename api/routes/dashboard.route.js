import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { getstatistics } from '../controllers/dashboard.controller.js';

const router = express.Router();

router.get('/getstatistics/:userId', getstatistics)

export default router;
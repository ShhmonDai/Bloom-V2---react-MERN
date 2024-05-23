import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createhabit, gethabits } from '../controllers/habit.controller.js';


const router = express.Router();

router.post('/createhabit', verifyToken, createhabit)
router.get('/gethabits/:userId', gethabits)


export default router;
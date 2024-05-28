import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createhabit, gethabits, edithabit, deletehabit } from '../controllers/habit.controller.js';


const router = express.Router();

router.post('/createhabit', verifyToken, createhabit)
router.get('/gethabits/:userId', gethabits)
router.put('/edithabit/:habitId/:userId', verifyToken, edithabit)
router.delete('/deletehabit/:habitId/:userId', verifyToken, deletehabit)


export default router;
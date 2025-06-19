import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createhabit, gethabits, edithabit, deletehabit, accomplishhabit, undohabit, gethabitstogether } from '../controllers/habit.controller.js';


const router = express.Router();

router.post('/createhabit', verifyToken, createhabit)
router.get('/gethabits/:userId', gethabits)
router.get('/gethabitstogether/:userId', gethabitstogether)
router.put('/edithabit/:habitId/:userId', verifyToken, edithabit)
router.put('/accomplishhabit/:habitId/:userId', verifyToken, accomplishhabit)
router.put('/undohabit/:habitId/:userId', verifyToken, undohabit)
router.delete('/deletehabit/:habitId/:userId', verifyToken, deletehabit)


export default router;
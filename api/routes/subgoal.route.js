import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createsubgoal, deletesubgoal, getsubgoals, getgoalsubgoals, accomplishsubgoal,editsubgoal } from '../controllers/subgoal.controller.js';

const router = express.Router();

router.post('/createsubgoal', verifyToken, createsubgoal)
router.get('/getsubgoals/:userId', getsubgoals)
router.get('/getgoalsubgoals/:goalId', getgoalsubgoals)
router.delete('/deletesubgoal/:subgoalId/:userId', verifyToken, deletesubgoal)
router.put('/editsubgoal/:subgoalId/:userId', verifyToken, editsubgoal)
router.put('/accomplishsubgoal/:subgoalId/:userId', verifyToken, accomplishsubgoal)


export default router;
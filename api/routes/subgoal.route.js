import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createsubgoal, deletesubgoal, getsubgoals, getgoalsubgoals, deletegoalsubgoals, accomplishsubgoal, editsubgoal, getcategorysubgoals } from '../controllers/subgoal.controller.js';

const router = express.Router();

router.post('/createsubgoal', verifyToken, createsubgoal)
router.get('/getsubgoals/:userId', getsubgoals)
router.get('/getcategorysubgoals/:userId', getcategorysubgoals)
router.get('/getgoalsubgoals/:goalId/:userId', getgoalsubgoals)
router.delete('/deletesubgoal/:subgoalId/:userId', verifyToken, deletesubgoal)
router.delete('/deletegoalsubgoals/:goalId/:userId', verifyToken, deletegoalsubgoals)
router.put('/editsubgoal/:subgoalId/:userId', verifyToken, editsubgoal)
router.put('/accomplishsubgoal/:subgoalId/:userId', verifyToken, accomplishsubgoal)


export default router;
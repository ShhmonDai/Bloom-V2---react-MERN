import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { creategoal, deletegoal, getgoals, getcategorygoals, accomplishgoal, editgoal, hideDone} from '../controllers/goal.controller.js';

const router = express.Router();

router.post('/creategoal', verifyToken, creategoal)
router.get('/getgoals/:userId', getgoals)
router.get('/getcategorygoals/:userId', getcategorygoals)
router.delete('/deletegoal/:goalId/:userId', verifyToken, deletegoal)
router.put('/editgoal/:goalId/:userId', verifyToken, editgoal)
router.put('/accomplishgoal/:goalId/:userId', verifyToken, accomplishgoal)
router.put('/hideDone/:goalId/:userId', verifyToken, hideDone)




export default router;
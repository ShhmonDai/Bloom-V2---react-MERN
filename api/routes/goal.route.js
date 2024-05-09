import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { creategoal, deletegoal, getgoals, accomplishgoal, editgoal} from '../controllers/goal.controller.js';

const router = express.Router();

router.post('/creategoal', verifyToken, creategoal)
router.get('/getgoals/:userId', getgoals)
router.delete('/deletegoal/:goalId/:userId', verifyToken, deletegoal)
router.put('/editgoal/:goalId/:userId', verifyToken, editgoal)
router.put('/accomplishgoal/:goalId/:userId', verifyToken, accomplishgoal)



export default router;
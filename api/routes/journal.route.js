import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {createjournal, getjournals} from '../controllers/journal.controller.js';

const router = express.Router();

router.post('/createjournal', verifyToken, createjournal)
router.get('/getjournals/:userId', getjournals)

export default router;
import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {createjournal, getjournals, deletejournal, editjournal} from '../controllers/journal.controller.js';

const router = express.Router();

router.post('/createjournal', verifyToken, createjournal)
router.get('/getjournals/:userId', getjournals)
router.delete('/deletejournal/:journalId/:userId', verifyToken, deletejournal)
router.put('/editjournal/:journalId/:userId', verifyToken, editjournal)

export default router;
import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createnote, deletenote, getcategorynotes, getgoalnotes, editnote } from '../controllers/note.controller.js';

const router = express.Router();

router.post('/createnote', verifyToken, createnote)
router.get('/getcategorynotes/:userId', getcategorynotes)
router.get('/getgoalnotes/:goalId', getgoalnotes)
router.delete('/deletenote/:noteId/:userId', verifyToken, deletenote)
router.put('/editnote/:noteId/:userId', verifyToken, editnote)


export default router;
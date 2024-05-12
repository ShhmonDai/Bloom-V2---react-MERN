import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createnote, deletenote, getcategorynotes, editnote } from '../controllers/note.controller.js';

const router = express.Router();

router.post('/createnote', verifyToken, createnote)
router.get('/getcategorynotes/:userId', getcategorynotes)
router.delete('/deletenote/:noteId/:userId', verifyToken, deletenote)
router.put('/editnote/:noteId/:userId', verifyToken, editnote)


export default router;
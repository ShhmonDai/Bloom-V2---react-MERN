import express from 'express';
import { deleteUser, getUsers, getUser, signout, test, updateUser, updateSettings } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.put('/update/:userId', verifyToken, updateUser);
router.put('/updateSettings/:userId', verifyToken, updateSettings);
router.delete('/delete/:userId',verifyToken, deleteUser);
router.post('/signout', signout);
router.get('/getusers', verifyToken, getUsers);
router.get('/:userId', getUser);

export default router;
import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { getcategoryscore } from '../controllers/category.controller.js';

const router = express.Router();

router.get('/getcategoryscore/:userId', getcategoryscore)




export default router;
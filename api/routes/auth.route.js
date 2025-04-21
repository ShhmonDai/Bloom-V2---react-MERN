import express from 'express';
import { google, signin, signindemo, signinwallpaper, signup, authenticateToken } from '../controllers/auth.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signinwallpaper', signinwallpaper);
router.post('/signindemo', signindemo);
router.post('/google', google);
router.post('/authenticateToken', verifyToken, authenticateToken);

export default router;
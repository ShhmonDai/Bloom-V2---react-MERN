import express from 'express';
import { google, signin, signindemo, signinwallpaper, signup, authenticateToken } from '../controllers/auth.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import rateLimit from 'express-rate-limit';

const authlimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 20, // limit each IP to 20 requests per window
    headers: false,
    message: {
        success: false,
        statusCode: 429,
        message: 'Too many requests from this IP, please try again later.'
    },
});

// 10 tries in 10 minutes
const stageOne = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 min
    max: 10, // limit each IP to 10 requests per window
    headers: false,
    message: {
        success: false,
        statusCode: 429,
        message: 'Too many login attempts. Please try again in 10 minutes.'
    },
});

// 5 more tries in 20 minutes
const stageTwo = rateLimit({
    windowMs: 20 * 60 * 1000,
    max: 10 + 5, 
    headers: false,
    message: {
        success: false,
        statusCode: 429,
        message: 'Too many login attempts. Please try again in 20 minutes.'
    },
});

// 3 more tries in 1 hour
const stageThree = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 10 + 5 + 3,
    headers: false,
    message: {
        success: false,
        statusCode: 429,
        message: 'Too many login attempts. Please try again in 1 hour'
    },
});

// 1 more try in 24 hours
const stageFour = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 10 + 5 + 3 + 1,
    headers: false,
    message: {
        success: false,
        statusCode: 429,
        message: 'Too many login attempts. Please try again in 24 hours'
    },
});

const router = express.Router();

router.post('/signup', authlimiter, signup);
router.post('/signin', stageOne, stageTwo, stageThree, stageFour, signin);
router.post('/signinwallpaper', stageOne, stageTwo, stageThree, stageFour, signinwallpaper);
router.post('/signindemo', signindemo);
router.post('/google', google);
router.post('/authenticateToken', verifyToken, authenticateToken);

export default router;
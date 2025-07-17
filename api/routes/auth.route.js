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

const router = express.Router();

router.post('/signup', authlimiter, signup);
router.post('/signin',
    // 10 tries in 10 minutes
    rateLimit({
        windowMs: 10 * 60 * 1000,
        headers: false,
        max: 10,
        message: {
            success: false,
            statusCode: 429,
            message: 'Too many login attempts. Please try again in 10 minutes.'
        },
    }),

    // 5 more tries in 20 minutes
    rateLimit({
        windowMs: 20 * 60 * 1000,
        headers: false,
        max: 10 + 5,
        message: {
            success: false,
            statusCode: 429,
            message: 'Too many login attempts. Please try again in 20 minutes.'
        },
    }),

    // 3 more tries in 1 hour
    rateLimit({
        windowMs: 60 * 60 * 1000,
        headers: false,
        max: 10 + 5 + 3,
        message: {
            success: false,
            statusCode: 429,
            message: 'Too many login attempts. Please try again in 1 hour.'
        },
    }),

    // 1 more try in 24 hours
    rateLimit({
        windowMs: 24 * 60 * 60 * 1000,
        headers: false,
        max: 10 + 5 + 3 + 1,
        message: {
            success: false,
            statusCode: 429,
            message: 'Too many login attempts. Please try again in 24 hours.'
        },
    }),
     signin
);

router.post('/signinwallpaper',
    // 10 tries in 10 minutes
    rateLimit({
        windowMs: 10 * 60 * 1000,
        headers: false,
        max: 10,
        message: 'Too many login attempts. Please try again in 10 minutes.',
    }),

    // 5 more tries in 20 minutes
    rateLimit({
        windowMs: 20 * 60 * 1000,
        headers: false,
        max: 10 + 5,
        message: 'Too many login attempts. Please try again in 20 minutes.'
    }),

    // 3 more tries in 1 hour
    rateLimit({
        windowMs: 60 * 60 * 1000,
        headers: false,
        max: 10 + 5 + 3,
        message: 'Too many login attempts. Please try again in 1 hour',
    }),

    // 1 more try in 24 hours
    rateLimit({
        windowMs: 24 * 60 * 60 * 1000,
        headers: false,
        max: 10 + 5 + 3 + 1,
        message: 'Too many login attempts. Please try again in 24 hours',
    }),
    signinwallpaper
);


router.post('/signindemo', signindemo);
router.post('/google', google);
router.post('/authenticateToken', verifyToken, authenticateToken);

export default router;
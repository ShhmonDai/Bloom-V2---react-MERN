import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { analyzetext, test } from '../controllers/watson.controller.js';

const router = express.Router();

router.get('/analyze/:text', analyzetext)
router.get('/test', test)

//Export these routes as a router object for webServer.js
export default router;
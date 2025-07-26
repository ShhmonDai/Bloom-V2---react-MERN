import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { limitWatsonUsage } from '../utils/limitWatsonUsage.js';
import { analyzetext, test, getUsage, getUsageOne } from '../controllers/watson.controller.js';

const router = express.Router();

router.get('/analyze/:text', verifyToken, limitWatsonUsage, analyzetext)
router.get('/test', test)
router.get('/getUsage', verifyToken, getUsage);
router.get('/getUsageOne', verifyToken, getUsageOne);

//Export these routes as a router object for webServer.js
export default router;
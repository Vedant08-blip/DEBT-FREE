import express from 'express';
import { getAnalyticsSummary, getExpensesSummary } from '../controllers/analyticsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All routes require authentication

router.get('/summary', getAnalyticsSummary);
router.get('/expenses', getExpensesSummary);

export default router;

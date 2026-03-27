import express from 'express';
import { authUser, registerUser, getUsers, updateReminderSettings, testReminder } from '../controllers/authController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/users', protect, admin, getUsers);
router.put('/reminders', protect, updateReminderSettings);
router.post('/test-reminder', protect, testReminder);

export default router;

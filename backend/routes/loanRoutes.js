import express from 'express';
import {
  getLoans,
  createLoan,
  updateLoan,
  deleteLoan,
  getAdminLoans,
} from '../controllers/loanController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getLoans).post(protect, createLoan);
router.route('/admin').get(protect, admin, getAdminLoans);
router.route('/:id').put(protect, updateLoan).delete(protect, deleteLoan);

export default router;

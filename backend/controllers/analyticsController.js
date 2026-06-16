import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Loan from '../models/Loan.js';

// @desc    Get financial analytics data
// @route   GET /api/analytics/summary
// @access  Private
const getAnalyticsSummary = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  
  // Get user data
  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Get all loans for this user
  const loans = await Loan.find({ user: userId });

  // Calculate metrics
  const totalDebt = loans.reduce((acc, loan) => acc + loan.outstanding, 0);
  const monthlyEMI = loans.reduce((acc, loan) => acc + loan.emiAmount, 0);
  const totalPrincipal = loans.reduce((acc, loan) => acc + loan.principal, 0);
  const totalInterestPaid = loans.reduce((acc, loan) => {
    return acc + (loan.principal - loan.outstanding) * (loan.interestRate / 100);
  }, 0);

  const monthlyIncome = user.netMonthlyIncome || 75000;
  const dtiRatio = monthlyIncome > 0 ? (monthlyEMI / monthlyIncome) * 100 : 0;
  
  // Financial health score
  let healthScore = 100;
  if (dtiRatio > 36) healthScore -= Math.min((dtiRatio - 36) * 0.5, 30);
  if (totalDebt > monthlyIncome * 12) healthScore -= 10;
  
  healthScore = Math.max(0, Math.min(100, healthScore));

  res.json({
    totalDebt,
    monthlyEMI,
    totalPrincipal,
    totalInterestPaid,
    monthlyIncome,
    dtiRatio: Math.round(dtiRatio * 100) / 100,
    healthScore: Math.round(healthScore),
    loanCount: loans.length,
    debtByType: loans.map(loan => ({
      name: loan.name,
      outstanding: loan.outstanding,
      interestRate: loan.interestRate
    }))
  });
});

// @desc    Get expense summary
// @route   GET /api/analytics/expenses
// @access  Private
const getExpensesSummary = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  
  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // For now, return mock data structure
  // In production, you'd fetch from an Expense model
  const expenses = {
    housing: 0,
    food: 0,
    transportation: 0,
    utilities: 0,
    entertainment: 0,
    other: 0
  };

  res.json(expenses);
});

export { getAnalyticsSummary, getExpensesSummary };

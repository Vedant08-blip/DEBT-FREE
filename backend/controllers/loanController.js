import asyncHandler from 'express-async-handler';
import Loan from '../models/Loan.js';

// @desc    Get all loans for logged in user
// @route   GET /api/loans
// @access  Private
const getLoans = asyncHandler(async (req, res) => {
  const loans = await Loan.find({ user: req.user._id });
  res.json(loans);
});

// @desc    Create a new loan
// @route   POST /api/loans
// @access  Private
const createLoan = asyncHandler(async (req, res) => {
  const { name, type, principal, outstanding, interestRate, emiAmount, tenureMonths, emiDate } = req.body;

  const loan = new Loan({
    user: req.user._id,
    name,
    type,
    principal,
    outstanding,
    interestRate,
    emiAmount,
    tenureMonths,
    emiDate,
  });

  const createdLoan = await loan.save();
  res.status(201).json(createdLoan);
});

// @desc    Update a loan
// @route   PUT /api/loans/:id
// @access  Private
const updateLoan = asyncHandler(async (req, res) => {
  const { name, type, principal, outstanding, interestRate, emiAmount, tenureMonths, emiDate } = req.body;

  const loan = await Loan.findById(req.params.id);

  if (loan) {
    if (loan.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to update this loan');
    }

    loan.name = name || loan.name;
    loan.type = type || loan.type;
    loan.principal = principal || loan.principal;
    loan.outstanding = outstanding || loan.outstanding;
    loan.interestRate = interestRate || loan.interestRate;
    loan.emiAmount = emiAmount || loan.emiAmount;
    loan.tenureMonths = tenureMonths || loan.tenureMonths;
    loan.emiDate = emiDate || loan.emiDate;

    const updatedLoan = await loan.save();
    res.json(updatedLoan);
  } else {
    res.status(404);
    throw new Error('Loan not found');
  }
});

// @desc    Delete a loan
// @route   DELETE /api/loans/:id
// @access  Private
const deleteLoan = asyncHandler(async (req, res) => {
  const loan = await Loan.findById(req.params.id);

  if (loan) {
    if (loan.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to delete this loan');
    }

    await loan.deleteOne();
    res.json({ message: 'Loan removed' });
  } else {
    res.status(404);
    throw new Error('Loan not found');
  }
});

// @desc    Get all loans (Admin)
// @route   GET /api/loans/admin
// @access  Private/Admin
const getAdminLoans = asyncHandler(async (req, res) => {
  const loans = await Loan.find({}).populate('user', 'name email');
  res.json(loans);
});

export { getLoans, createLoan, updateLoan, deleteLoan, getAdminLoans };

import mongoose from 'mongoose';

const loanSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['home', 'car', 'personal', 'student', 'credit-card', 'other'],
    },
    principal: {
      type: Number,
      required: true,
      default: 0,
    },
    outstanding: {
      type: Number,
      required: true,
      default: 0,
    },
    interestRate: {
      type: Number,
      required: true,
      default: 0,
    },
    emiAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    tenureMonths: {
      type: Number,
      required: true,
      default: 0,
    },
    emiDate: {
      type: Number,
      required: true,
      min: 1,
      max: 31,
    },
  },
  {
    timestamps: true,
  }
);

const Loan = mongoose.model('Loan', loanSchema);

export default Loan;

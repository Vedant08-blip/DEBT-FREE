import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
      default: '2000-01-01',
    },
    phone: {
      type: String,
      default: '',
    },
    currency: {
      type: String,
      default: 'INR',
    },
    netMonthlyIncome: {
      type: Number,
      default: 75000,
    },
    savingsGoal: {
      type: Number,
      default: 0,
    },
    selectedAvatar: {
      type: String,
      default: '🦉',
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    reminderSettings: {
      globalEnabled: { type: Boolean, default: true },
      daysBefore: { type: Number, default: 3 },
    },
  },
  {
    timestamps: true,
  }
);

// Method to verify password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Hook to hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;

import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import sendEmail from '../utils/sendEmail.js';

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      reminderSettings: user.reminderSettings,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      reminderSettings: user.reminderSettings,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
};

// @desc    Get all users
// @route   GET /api/auth/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json(users);
});
const updateReminderSettings = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.reminderSettings = {
      globalEnabled: req.body.globalEnabled !== undefined ? req.body.globalEnabled : user.reminderSettings.globalEnabled,
      channel: req.body.channel || user.reminderSettings.channel,
      daysBefore: req.body.daysBefore !== undefined ? req.body.daysBefore : user.reminderSettings.daysBefore,
    };

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      reminderSettings: updatedUser.reminderSettings,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Send a test reminder notification
// @route   POST /api/auth/test-reminder
// @access  Private
const testReminder = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  console.log(`\n--- [ACTION] TEST NOTIFICATION TRIGGERED ---`);
  console.log(`User: ${user.name} (${user.email})`);
  
  const textContent = `Hi ${user.name},\n\nThis is a test payment reminder from DebtFree. Your EMI for "${mockLoan.name}" in the amount of ₹${mockLoan.emiAmount} is scheduled for payment on the ${mockLoan.emiDate}th.\n\nWarm regards,\nTeam DebtFree\nVedant Trivedi`;
  
  // Check if real email is configured
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    try {
      await sendEmail({
        to: user.email,
        subject: `🛡️ Payment Reminder: Your ${mockLoan.name} EMI is approaching`,
        text: textContent,
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
            <h2 style="color: #2563eb;">🛡️ Test Notification</h2>
            <p>Hi <strong>${user.name}</strong>,</p>
            <p>This is a test payment reminder from your <strong>DebtFree Dashboard</strong>.</p>
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 5px 0;"><strong>Loan:</strong> ${mockLoan.name}</p>
              <p style="margin: 5px 0;"><strong>Amount:</strong> ₹${mockLoan.emiAmount.toLocaleString('en-IN')}</p>
              <p style="margin: 5px 0;"><strong>Due Date:</strong> ${mockLoan.emiDate}th of this month</p>
            </div>
            <p>You have <strong>${daysBefore} days</strong> remaining. Keep your momentum towards financial freedom!</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 14px; color: #666;">Warm regards,<br /><strong>Team DebtFree</strong><br />Vedant Trivedi</p>
          </div>
        `
      });
      console.log(`✅ [SUCCESS] Real Test Email sent to ${user.email}`);
    } catch (err) {
      console.error(`❌ [ERROR] Failed to send TEST email to ${user.email}:`, err.message);
      res.status(500);
      throw new Error(`Email delivery failed: ${err.message}`);
    }
  } else {
    console.log(`📧 MOCK TEST EMAIL`);
    console.log(`To: ${user.email}`);
    console.log(`Subject: 🛡️ Payment Reminder: Your ${mockLoan.name} EMI is approaching`);
    console.log(`---`);
    console.log(textContent);
    console.log(`---\n`);
  }

  res.json({ message: 'Test notification sent! Check your server terminal/inbox.' });
});

export { authUser, registerUser, getUsers, updateReminderSettings, testReminder };

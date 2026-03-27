import cron from 'node-cron';
import nodemailer from 'nodemailer';
import User from '../models/User.js';
import Loan from '../models/Loan.js';

// Setup Email Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendReminders = async () => {
  console.log('--- Running Scheduled EMI Reminder Check ---');
  
  try {
    const today = new Date();
    const currentDay = today.getDate();
    
    const users = await User.find({ 'reminderSettings.globalEnabled': true });
    
    for (const user of users) {
      const { channel, daysBefore } = user.reminderSettings;
      
      let targetDate = currentDay + daysBefore;
      if (targetDate > 31) targetDate -= 31;

      const pertinentLoans = await Loan.find({
        user: user._id,
        isReminderEnabled: true,
        emiDate: targetDate
      });

      for (const loan of pertinentLoans) {
        console.log(`\n--- [ACTION] NOTIFICATION TRIGGERED ---`);
        console.log(`Target: ${user.email} | Loan: ${loan.name}`);
        
        const mailOptions = {
          from: `"DebtFree" <${process.env.EMAIL_USER}>`,
          to: user.email,
          subject: `🛡️ Payment Reminder: Your ${loan.name} EMI is due in ${daysBefore} days`,
          text: `Hi ${user.name},\n\nThis is a friendly reminder from DebtFree. Your EMI for "${loan.name}" (₹${loan.emiAmount}) is due on the ${loan.emiDate}th.\n\nWarm regards,\nTeam DebtFree\nVedant Trivedi`,
          html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
              <h2 style="color: #2563eb;">🛡️ Payment Reminder</h2>
              <p>Hi <strong>${user.name}</strong>,</p>
              <p>This is a friendly reminder from your <strong>DebtFree Dashboard</strong>.</p>
              <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>Loan:</strong> ${loan.name}</p>
                <p style="margin: 5px 0;"><strong>Amount:</strong> ₹${loan.emiAmount.toLocaleString('en-IN')}</p>
                <p style="margin: 5px 0;"><strong>Due Date:</strong> ${loan.emiDate}th of this month</p>
              </div>
              <p>You have <strong>${daysBefore} days</strong> remaining. Keep your momentum towards financial freedom!</p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
              <p style="font-size: 14px; color: #666;">Warm regards,<br /><strong>Team DebtFree</strong><br />Vedant Trivedi</p>
            </div>
          `
        };

        try {
          if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            await transporter.sendMail(mailOptions);
            console.log(`✅ [SUCCESS] Real Email sent to ${user.email}`);
          } else {
            console.log(`⚠️ [MOCK] Email not sent: Missing EMAIL_USER/PASS in .env`);
            console.log(mailOptions.text);
          }
        } catch (err) {
          console.error(`❌ [ERROR] Failed to send email to ${user.email}:`, err.message);
        }
      }
    }
  } catch (error) {
    console.error('Error in reminder service:', error);
  }
};

const startReminderService = () => {
  cron.schedule('* * * * *', sendReminders); 
  console.log('Reminder Service initialized (Live email mode)');
};

export default startReminderService;

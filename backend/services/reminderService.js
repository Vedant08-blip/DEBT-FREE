import cron from 'node-cron';
import User from '../models/User.js';
import Loan from '../models/Loan.js';

const sendReminders = async () => {
  console.log('--- Running Scheduled EMI Reminder Check ---');
  
  try {
    const today = new Date();
    const currentDay = today.getDate();
    
    // Find all users with reminders enabled
    const users = await User.find({ 'reminderSettings.globalEnabled': true });
    
    for (const user of users) {
      const { channel, daysBefore } = user.reminderSettings;
      
      // Calculate target EMI date (today + daysBefore)
      // handling month rollover (simplified for now: just looking at the date number)
      let targetDate = currentDay + daysBefore;
      if (targetDate > 31) targetDate -= 31; // Very rough approximation for month end

      // Find loans for this user that have reminders enabled and match the target date
      const pertinentLoans = await Loan.find({
        user: user._id,
        isReminderEnabled: true,
        emiDate: targetDate
      });

      for (const loan of pertinentLoans) {
        console.log(`[REMINDER] Sending ${channel} to ${user.email} for loan "${loan.name}" (EMI Date: ${loan.emiDate})`);
        
        if (channel === 'email' || channel === 'both') {
          console.log(`MOCK EMAIL: Subject: Upcoming EMI for ${loan.name}. Content: Your EMI of ₹${loan.emiAmount} is due in ${daysBefore} days.`);
        }
        
        if (channel === 'sms' || channel === 'both') {
          console.log(`MOCK SMS: Hello ${user.name}, your EMI for ${loan.name} (₹${loan.emiAmount}) is due on the ${loan.emiDate}th.`);
        }
      }
    }
  } catch (error) {
    console.error('Error in reminder service:', error);
  }
};

// Schedule it to run every day at 9:00 AM
// For testing purposes, we can run it more frequently (e.g., every minute: '* * * * *')
const startReminderService = () => {
  // cron.schedule('0 9 * * *', sendReminders); // Daily at 9 AM
  cron.schedule('* * * * *', sendReminders); // Every minute for demonstration
  console.log('Reminder Service initialized (running every minute for demo)');
};

export default startReminderService;

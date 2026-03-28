import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async ({ to, subject, text, html, fromName = "DebtFree" }) => {
  const mailOptions = {
    from: `"${fromName}" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  };

  try {
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const info = await transporter.sendMail(mailOptions);
      console.log(`✅ [SUCCESS] Email sent: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } else {
      console.log(`⚠️ [MOCK] Email not sent: Missing EMAIL_USER/PASS in .env`);
      console.log(`Subject: ${subject}`);
      console.log(`Body: ${text}`);
      return { success: true, mock: true };
    }
  } catch (err) {
    console.error(`❌ [ERROR] Failed to send email:`, err.message);
    throw err;
  }
};

export default transporter;

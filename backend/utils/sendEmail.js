import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  console.log(`[sendEmail] Attempting to send email to ${options.to}...`);
  
  // Use a more robust transporter configuration for Gmail
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, // Port 465 for SMTPS
    secure: true, // Use SSL/TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // Increased timeout for debugging
    connectionTimeout: 10000, 
    greetingTimeout: 5000,
    socketTimeout: 10000,
  });

  // Verify connection configuration
  try {
    console.log(`[sendEmail] Verifying transporter configuration...`);
    await transporter.verify();
    console.log(`[sendEmail] Transporter is ready!`);
  } catch (verifyError) {
    console.error(`[sendEmail] Transporter verification failed:`, verifyError.message);
    throw new Error(`SMTP Verification Failed: ${verifyError.message}`);
  }

  const mailOptions = {
    from: `"DebtFree" <${process.env.EMAIL_USER}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[sendEmail] ✅ Email sent successfully: %s`, info.messageId);
    return info;
  } catch (error) {
    console.error(`[sendEmail] ❌ Failed to send email to ${options.to}:`, error.message);
    throw error;
  }
};

export default sendEmail;

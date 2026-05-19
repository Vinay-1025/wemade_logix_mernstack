require('dotenv').config();
const { sendWelcomeEmail } = require('./utils/emailService');

(async () => {
  console.log('Testing email dispatch with:', process.env.EMAIL_USER);
  const success = await sendWelcomeEmail('darkeaglerules6ios@gmail.com', 'Test User', 'testpass123', 'student');
  console.log('Email sent status:', success);
})();

import axios from 'axios';

/**
 * Sends a welcome/credential email using EmailJS REST API from the frontend.
 * Loads VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY from env.
 * 
 * @param {string} toEmail - Recipient email address
 * @param {string} toName - Recipient full name
 * @param {string} tempPassword - Temporary generated password
 * @param {string} userRole - Access level role (student / admin)
 * @returns {Promise<boolean>} - Success state
 */
export const sendWelcomeEmailJS = async (toEmail, toName, tempPassword, userRole) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.warn('[EmailJS Frontend] Configuration variables are missing in client/.env. Skipping email dispatch.');
    return false;
  }

  try {
    const payload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        email: toEmail,
        name: toName,
        password: tempPassword,
        role: userRole,
        login_url: window.location.origin
      }
    };

    const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', payload);
    if (response.status === 200 || response.data === 'OK') {
      console.log(`[EmailJS Frontend] Email successfully routed to: ${toEmail}`);
      return true;
    }
    return false;
  } catch (err) {
    console.error('[EmailJS Frontend Error] Failed to deliver credentials email:', err.response?.data || err.message);
    return false;
  }
};

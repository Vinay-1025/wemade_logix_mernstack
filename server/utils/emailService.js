const nodemailer = require('nodemailer');

/**
 * Sends dynamic email notifications with auto-generated credentials to newly enrolled users.
 * Loads sensitive SMTP variables strictly from process.env.
 * 
 * @param {string} to - Destination email address
 * @param {string} name - Recipient full name
 * @param {string} password - Newly created access password
 * @param {string} role - Access level role (student / admin)
 * @returns {Promise<boolean>} - Success state
 */
const sendWelcomeEmail = async (to, name, password, role) => {
  // Destructure dynamic sensitive parameters strictly from .env
  const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, EMAIL_FROM } = process.env;

  // Validate environmental configurations
  if (!EMAIL_HOST || !EMAIL_USER || !EMAIL_PASS) {
    console.warn('\n[EMAIL SERVICE WARNING] SMTP configurations are missing in .env. Skipping welcome email.');
    console.log(`[CREDENTIAL LOG] User: ${name} | Email: ${to} | Pass: ${password} | Role: ${role}\n`);
    return false;
  }

  try {
    // Configure secure transporter pipeline
    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: Number(EMAIL_PORT) || 587,
      secure: Number(EMAIL_PORT) === 465, // Use SSL for 465, TLS for others
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    // Build responsive, ultra-premium HTML email layout template matching brand themes
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Account Created - FluenC Dashboard</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f1f5f9; color: #1e293b; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
          .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0; }
          .header { background: linear-gradient(135deg, #00d1d1 0%, #3b82f6 100%); padding: 40px 20px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
          .header p { color: rgba(255, 255, 255, 0.9); margin: 8px 0 0; font-size: 14px; font-weight: 500; }
          .content { padding: 40px 30px; }
          .welcome-text { font-size: 16px; line-height: 1.6; color: #475569; margin: 0 0 24px; }
          .credential-card { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; margin-bottom: 24px; }
          .credential-row { display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding: 12px 0; }
          .credential-row:last-child { border-bottom: none; }
          .label { font-weight: 700; color: #64748b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
          .value { font-weight: 600; color: #0f172a; font-size: 14px; }
          .value.password { font-family: monospace; font-size: 15px; color: #00d1d1; background: rgba(0, 209, 209, 0.06); padding: 2px 8px; border-radius: 6px; }
          .action-container { text-align: center; margin-top: 32px; }
          .btn { display: inline-block; background: linear-gradient(135deg, #00d1d1 0%, #3b82f6 100%); color: #ffffff !important; text-decoration: none; padding: 14px 30px; border-radius: 12px; font-weight: 700; font-size: 14px; box-shadow: 0 4px 12px rgba(0, 209, 209, 0.2); transition: transform 0.2s; }
          .footer { background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px; text-align: center; font-size: 12px; color: #94a3b8; }
          .footer a { color: #00d1d1; text-decoration: none; font-weight: 600; }
          .warning { font-size: 12px; color: #ef4444; background: rgba(239, 68, 68, 0.04); border: 1px solid rgba(239, 68, 68, 0.1); border-radius: 10px; padding: 12px; text-align: left; line-height: 1.5; margin-top: 24px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>FluenC Learning Hub</h1>
            <p>Your secure access keys are authorized</p>
          </div>
          <div class="content">
            <p class="welcome-text">Hello <strong>${name}</strong>,</p>
            <p class="welcome-text">An administrator has authorized your personnel account on the FluenC learning portal. You can now authenticate using the secure credentials generated below:</p>
            
            <div class="credential-card">
              <div class="credential-row">
                <span class="label">Access Link</span>
                <span class="value"><a href="https://wemade-logix-mernstack.web.app" style="color: #3b82f6; text-decoration: none; font-weight: bold;">wemade-logix-mernstack.web.app</a></span>
              </div>
              <div class="credential-row">
                <span class="label">Username (Email)</span>
                <span class="value">${to}</span>
              </div>
              <div class="credential-row">
                <span class="label">Access Password</span>
                <span class="value password">${password}</span>
              </div>
              <div class="credential-row">
                <span class="label">Access Level</span>
                <span class="value" style="text-transform: capitalize;">${role}</span>
              </div>
            </div>

            <div class="warning">
              <strong>IMPORTANT:</strong> For security protocols, please access your profile dashboard immediately upon your first authentication sync and modify this temporary generated password.
            </div>

            <div class="action-container">
              <a href="https://wemade-logix-mernstack.web.app" class="btn">Authenticate Securely</a>
            </div>
          </div>
          <div class="footer">
            <p>&copy; 2026 FluenC Learning Platform. All security parameters active.</p>
            <p>For support, please connect with your system administrator.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send payload
    await transporter.sendMail({
      from: EMAIL_FROM || '"FluenC Learning Hub" <noreply@wemade.com>',
      to,
      subject: '🔑 Security Keys Enforced - FluenC Account Created',
      html: htmlTemplate,
    });

    console.log(`[EMAIL SERVICE] Credentials successfully routed to: ${to}`);
    return true;
  } catch (error) {
    console.error('[EMAIL SERVICE ERROR] Failed to deliver credentials email:', error);
    return false;
  }
};

module.exports = { sendWelcomeEmail };

import asyncHandler from '../middleware/asyncHandler.js';
import { sendEmail } from '../services/emailService.js';
import env from '../config/env.js';

// @desc    Submit a support request
// @route   POST /api/support/submit
// @access  Public
const submitSupportRequest = asyncHandler(async (req, res) => {
  const { name, email, role, subject, message } = req.body;

  // Construct the email content for the admin
  const adminEmailHtml = `
    <p>Dear Admin,</p>
    <p>A new support request has been submitted:</p>
    <ul>
      <li><strong>From:</strong> ${name} (${email})</li>
      <li><strong>Role:</strong> ${role}</li>
      <li><strong>Subject:</strong> ${subject}</li>
      <li><strong>Message:</strong></li>
    </ul>
    <p style="white-space: pre-wrap; border: 1px solid #eee; padding: 10px; background-color: #f9f9f9;">${message}</p>
    <p>Please investigate and respond to the user as soon as possible.</p>
    <p>BazzarNet Support System</p>
  `;

  try {
    // Send email to the admin
    await sendEmail(
      env.ADMIN_EMAIL, // Admin's email address from environment variables
      `New Support Request: ${subject} (from ${name})`,
      `New support request from ${name} (${email}) regarding: ${subject}`,
      adminEmailHtml
    );
    res.status(200).json({ message: 'Your support request has been submitted successfully. We will get back to you shortly.' });
  } catch (error) {
    console.error('Error sending support email to admin:', error);
    res.status(500);
    throw new Error('Failed to send support request. Please try again later.');
  }
});

export { submitSupportRequest };
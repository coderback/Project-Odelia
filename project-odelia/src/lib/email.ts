import nodemailer from 'nodemailer';

// Create transporter using environment variables
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendDateSelectionNotification(restaurant: string, activity: string) {
  // Skip if email not configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.NOTIFY_EMAIL) {
    console.log('Email not configured, skipping notification');
    return false;
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.NOTIFY_EMAIL,
    subject: `Odelia planned a date! ${restaurant} + ${activity}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; text-align: center;">
        <h1 style="color: #f97316; font-size: 36px; margin-bottom: 20px;">
          Odelia planned a date!
        </h1>
        <div style="font-size: 60px; margin: 20px 0;">
          ✨
        </div>
        <p style="font-size: 18px; color: #6b7280; margin-bottom: 8px;">Restaurant</p>
        <p style="font-size: 28px; color: #f97316; font-weight: bold; margin-bottom: 24px;">
          ${restaurant}
        </p>
        <p style="font-size: 18px; color: #6b7280; margin-bottom: 8px;">Activity</p>
        <p style="font-size: 28px; color: #f97316; font-weight: bold; margin-bottom: 30px;">
          ${activity}
        </p>
        <p style="font-size: 16px; color: #6b7280;">
          ${new Date().toLocaleString()}
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Date selection notification email sent successfully!');
    return true;
  } catch (error) {
    console.error('Failed to send date selection notification email:', error);
    return false;
  }
}

export async function sendYesNotification(dodgeCount: number = 0) {
  // Skip if email not configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.NOTIFY_EMAIL) {
    console.log('Email not configured, skipping notification');
    return false;
  }

  const dodgeMessage = dodgeCount > 0
    ? `<p style="font-size: 18px; color: #6b7280; margin-bottom: 20px;">(After clicking NO ${dodgeCount} time${dodgeCount === 1 ? '' : 's'})</p>`
    : '';

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.NOTIFY_EMAIL,
    subject: dodgeCount > 0 ? `She said YES! (after ${dodgeCount} NO attempts)` : 'She said YES!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; text-align: center;">
        <h1 style="color: #ef4444; font-size: 48px; margin-bottom: 20px;">
          She said YES!
        </h1>
        <p style="font-size: 24px; color: #374151; margin-bottom: 30px;">
          Odelia clicked YES to be your Valentine!
        </p>
        ${dodgeMessage}
        <div style="font-size: 60px; margin: 30px 0;">
          ❤️
        </div>
        <p style="font-size: 16px; color: #6b7280;">
          ${new Date().toLocaleString()}
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Notification email sent successfully!');
    return true;
  } catch (error) {
    console.error('Failed to send notification email:', error);
    return false;
  }
}

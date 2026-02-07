import nodemailer from 'nodemailer';

// Create transporter using environment variables
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendDateSelectionNotification(
  restaurants: string[],
  activities: string[],
  meals?: { breakfast: string; lunch: string; dinner: string },
) {
  // Skip if email not configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.NOTIFY_EMAIL) {
    console.log('Email not configured, skipping notification');
    return false;
  }

  const rankLabels = ['1st', '2nd', '3rd', '4th', '5th'];

  const restaurantList = restaurants
    .map((r, i) => `<p style="font-size: 18px; color: #374151; margin: 4px 0;"><strong>${rankLabels[i]}</strong> — ${r}</p>`)
    .join('');

  const activityList = activities
    .map((a, i) => `<p style="font-size: 18px; color: #374151; margin: 4px 0;"><strong>${rankLabels[i]}</strong> — ${a}</p>`)
    .join('');

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.NOTIFY_EMAIL,
    subject: `Odelia planned a date! Top picks: ${restaurants[0]} + ${activities[0]}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; text-align: center;">
        <h1 style="color: #f97316; font-size: 36px; margin-bottom: 20px;">
          Odelia planned a date!
        </h1>
        <div style="font-size: 60px; margin: 20px 0;">
          ✨
        </div>
        <p style="font-size: 18px; color: #6b7280; margin-bottom: 8px;">Restaurant Ranking</p>
        <div style="margin-bottom: 24px;">${restaurantList}</div>
        <p style="font-size: 18px; color: #6b7280; margin-bottom: 8px;">Activity Ranking</p>
        <div style="margin-bottom: 30px;">${activityList}</div>
        ${meals ? `
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <p style="font-size: 18px; color: #6b7280; margin-bottom: 12px;">Stay at Home Meals</p>
        <p style="font-size: 20px; color: #374151; margin-bottom: 8px;">☀️ Breakfast: <strong>${meals.breakfast}</strong></p>
        <p style="font-size: 20px; color: #374151; margin-bottom: 8px;">🌤️ Lunch: <strong>${meals.lunch}</strong></p>
        <p style="font-size: 20px; color: #374151; margin-bottom: 24px;">🌙 Dinner: <strong>${meals.dinner}</strong></p>
        ` : ''}
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

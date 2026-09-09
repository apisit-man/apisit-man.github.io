export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // NOTE: You'll need to install nodemailer: `npm install nodemailer`
  const nodemailer = await import('nodemailer');

  const { to, subject, text, html } = req.body;

  if (!to || !subject || (!text && !html)) {
    return res.status(400).json({ message: 'Missing required fields: to, subject, text/html' });
  }

  try {
    // Configure the SMTP transport (Example using Gmail)
    // IMPORTANT: Use environment variables for your credentials!
    const transporter = nodemailer.default.createTransport({
      service: 'gmail', // or your preferred email service
      auth: {
        user: process.env.EMAIL_USER, // e.g., 'your-email@gmail.com'
        pass: process.env.EMAIL_PASS, // e.g., an App Password from Gmail
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Email sent successfully!', info: info.messageId });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
}

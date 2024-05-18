import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configure your SMTP settings
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'jaylimbachiya043@gmail.com', // Your Gmail email address from environment variables
    pass: 'izfm emac imen fcay', // Your Gmail password or App Password from environment variables
  },
});

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const mailOptions = {
      from: 'jaylimbachiya043@gmail.com', // Your Gmail email address
      to: email,
      subject: 'Welcome to Our Website!',
      text: 'Thank you for signing up. We look forward to serving you!',
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'An error occurred while sending the email.' }, { status: 500 });
  }
}

// Handle other HTTP methods
export function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

import { NextResponse } from 'next/server';
import { sendVerificationEmail } from '../../../../../lib/mailer'; // Adjust the import based on your file structure

export async function POST(req: Request) {
  try {
    const { email } = await req.json(); // Parse the email from the request body

    // Generate OTP (you can add more logic here for better OTP generation)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Send the OTP via email
    await sendVerificationEmail(email, otp);

    // Return a success response
    return NextResponse.json({
      message: 'OTP sent successfully to your email!',
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json({
      message: 'Failed to send OTP. Please try again.',
    }, { status: 500 });
  }
}

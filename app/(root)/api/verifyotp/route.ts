import { NextResponse } from 'next/server';
import { sendVerificationEmail } from '../../../../lib/mailer';
import { prisma } from '../../../../lib/prisma';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // ⛔️ Remove previous OTPs for the same email if needed
    await prisma.userVerification.deleteMany({ where: { email } });

    // ✅ Save OTP to DB with expiry (5 minutes)
    await prisma.userVerification.create({
      data: {
        email,
        otp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes from now
      }
    });

    await sendVerificationEmail(email, otp);

    return NextResponse.json({ message: 'OTP sent successfully!' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json({ message: 'Failed to send OTP.' }, { status: 500 });
  }
}

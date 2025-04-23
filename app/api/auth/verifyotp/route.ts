import { NextResponse } from 'next/server';
import { handleVerifyOtp } from '../../../../lib/controllers/otpcontroller/otpController';
import { handleApiError } from '../../../../lib/utils/error/errorHandler';

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();
    const response = await handleVerifyOtp(email, otp);
    return NextResponse.json(response);
  } catch (error) {
    return handleApiError(error, 'OTP verification failed', 400);
  }
}

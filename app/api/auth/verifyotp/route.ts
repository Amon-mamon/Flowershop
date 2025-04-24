import { NextResponse } from 'next/server';
import { handleVerifyOtp } from '../../../../lib/controllers/otpcontroller/otpController';
import { apiRes} from '../../../../lib/utils/error/errorHandler';

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();
    const response = await handleVerifyOtp(email, otp);
    return NextResponse.json(response);
  } catch (error) {
    return apiRes(error, 'OTP verification failed', 400);
  }
}

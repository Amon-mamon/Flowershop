import { NextResponse } from 'next/server';
import { handleSendOtp } from '../../../../lib/controllers/otpcontroller/otpController';
import { apiRes } from '../../../../lib/utils/error/errorHandler';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const response = await handleSendOtp(email);
    return NextResponse.json(response);
  } catch (error) {
    console.log("The error is:",error)
    return apiRes(error, 'Failed to send OTP');
  }
}

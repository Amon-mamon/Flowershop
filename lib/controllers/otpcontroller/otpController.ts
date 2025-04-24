import { sendVerificationEmail } from "../../utils/mailer/mailer";
import { deleteOldOtps, saveOtp, getOtpRecord } from "../../models/userverificationmodel/userVerificationModel";

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

export const handleSendOtp = async (email: string) => {
  const otp = generateOtp();

  await deleteOldOtps(email);
  await saveOtp(email, otp);
  await sendVerificationEmail(email, otp);

  return { message: 'OTP sent successfully!' };
};

export const handleVerifyOtp = async (email: string, inputOtp: string) => {
  const record = await getOtpRecord(email);

  if (!record) {
    throw new Error("No OTP found.");
  }

  const now = new Date();

  if (record.otp !== inputOtp) {
    throw new Error("Invalid OTP.");
  }

  if (record.expiresAt < now) {
    throw new Error("OTP has expired.");
  }

  return { message: "OTP verified successfully!" };
};

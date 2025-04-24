import { prisma } from '../../prisma';

export const deleteOldOtps = async (email: string) => {
  return prisma.userVerification.deleteMany({ where: { email } });
};

export const saveOtp = async (email: string, otp: string) => {
  return prisma.userVerification.create({
    data: {
      email,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    },
  });
};

export const getOtpRecord = async (email: string) => {
  return prisma.userVerification.findFirst({
    where: { email },
    orderBy: { createdAt: 'desc' },
  });
};

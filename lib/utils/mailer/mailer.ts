import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port:587,
    secure:false,
    auth:{
        user:process.env.SMTP_USER,
        pass:process.env.SMTP_PASS,
    }
})

export const sendVerificationEmail = async (to:string, otp:string) => {
    await transporter.sendMail({
        from:`"JBV" <${process.env.SMTP_USER}>`,
        to,
        subject:"Verify your Email",
        html:`<p>Your verification code is: <h2>${otp}</h2> Enter this code to verify your motherfucking email</p>`
    });
};


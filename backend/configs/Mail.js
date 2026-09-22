import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 20000,
    greetingTimeout: 20000,
    socketTimeout: 20000,
});

const sendMail = async (to, otp) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: to,
            subject: "Reset Your Password",
            html: `
                <p>Your OTP for Password Reset is <b>${otp}</b>.</p>
                <p>It expires in 5 minutes.</p>
            `,
        });

        console.log("Email sent successfully:", info.messageId);
        return info;
    } catch (error) {
        console.log("Email sending error:", error);
        throw error;
    }
};

export default sendMail;

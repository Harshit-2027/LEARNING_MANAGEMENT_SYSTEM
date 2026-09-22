import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
    },
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

        console.log("Email sent:", info.messageId);
        return info;
    } catch (error) {
        console.log("Email sending error:", error);
        throw error;
    }
};

export default sendMail;

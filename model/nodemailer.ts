import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kaifqureshi.dev@gmail.com",
    pass: process.env.NODEMAILER_PASS,
  },
});

export const sendOTP = async (email: string, otp: string) => {
  try {
    const mailOptions = {
      from: "kaifqureshi.dev@gmail.com",
      to: email,
      subject: "Account Recovery",
      text: `Your Email verification code is: ${otp}`,
    };
    const result = await transporter.sendMail(mailOptions);
    console.log("NODE MAILER RESPONSE", result);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

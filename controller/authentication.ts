import express from "express";
import { pool } from "../db";
import { findUserByEmail } from "../model/authentication";
import { sendOTP } from "../model/nodemailer";
import bcrypt from "bcrypt";

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

const otp = generateOTP();

export const forgotPasswordEmail = async (
  req: express.Request,
  res: express.Response
) => {
  const { email } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Invalid email or role" });
    }

    sendOTP(email, otp);
    res.status(200).json({ message: "OTP sent successfully", otp });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const forgotPasswordVerify = async (
  req: express.Request,
  res: express.Response
) => {
  const { userOtp } = req.body;
  try {
    if (otp !== userOtp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updatePassword = async (
  req: express.Request,
  res: express.Response
) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: "Invalid email or role" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(`UPDATE users SET password = $1 WHERE email = $2`, [
      hashedPassword,
      email,
    ]);

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

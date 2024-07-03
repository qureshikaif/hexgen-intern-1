import { Router } from "express";
import {
  forgotPasswordEmail,
  forgotPasswordVerify,
  updatePassword,
} from "../controller/authentication";

export const auth = Router();

auth.post("/email", forgotPasswordEmail);
auth.post("/verify", forgotPasswordVerify);
auth.post("/update", updatePassword);

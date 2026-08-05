import { Router } from "express";
import {
  getme,
  login,
  register,
  verifyOtp,
} from "../controller/authController.js";
import { getAllUsers } from "../controller/userController.js";
import { protect } from "../middleware/authmiddleware.js";

const authRouter = Router();

authRouter.post("/register", register);
// send otp endpoint
authRouter.post("/send-otp", login);
authRouter.post("/login", login);
authRouter.post("/verify-otp", verifyOtp);
authRouter.get("/me", protect, getme);

export default authRouter;

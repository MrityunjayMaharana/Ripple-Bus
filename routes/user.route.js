import { Router } from "express";
import { userSignup, sendVerificationEmail, verifyEmail, loginUser, resetPassword, forgotPassword, verifyForgotPasswordOtp } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router()

router.post('/signup', userSignup)
router.post('/login', loginUser)
router.post('/verify-email', authMiddleware, verifyEmail)
router.post('/verification-email', authMiddleware, sendVerificationEmail)

// Password resetting
router.post('/reset-password', authMiddleware, resetPassword)
router.post('/forgot-password', forgotPassword)
router.post('/verify-forgot-password-otp', verifyForgotPasswordOtp)

export default router
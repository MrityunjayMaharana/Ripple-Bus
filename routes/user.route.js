import { Router } from "express";
import { userSignup, sendVerificationEmail, verifyEmail, loginUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router()

router.post('/signup', userSignup)
router.post('/login', loginUser)
router.post('/verify-email', authMiddleware, verifyEmail)
router.post('/verification-email', authMiddleware, sendVerificationEmail)

export default router
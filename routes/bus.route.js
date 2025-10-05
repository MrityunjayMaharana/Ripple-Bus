import { authMiddleware } from "../middlewares/auth.middleware.js";
import { addBus } from "../controllers/bus.controller.js";
import { Router } from "express";
const router = Router()

router.post('/register', authMiddleware, addBus)
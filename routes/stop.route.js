import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { addStop, getAllStops, getStopById, searchStops, updateStop, deleteStop } from '../controllers/stop.controller.js';

const router = Router()

router.post('/add', authMiddleware, addStop)
router.get('/', getAllStops)
router.get('/search', searchStops)
router.get('/:stopId', getStopById)
router.put('/:stopId', authMiddleware, updateStop)
router.delete('/:stopId', authMiddleware, deleteStop)

export default router


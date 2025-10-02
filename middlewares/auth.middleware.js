import jwt from 'jsonwebtoken'
import userService from '../services/user.service.js'

export async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userService.findUserByEmail(decoded.email)
        if(!user) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' })
    }
}
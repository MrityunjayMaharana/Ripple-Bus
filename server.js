import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 4000

import connectDB from './DB/db.config.js'
connectDB()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

import userRoutes from './routes/user.route.js'
import stopRoutes from './routes/stop.route.js'
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/stops', stopRoutes)

app.listen(PORT, function() {
    console.log(`🚀 Server running on http://localhost:${PORT} 🚀`)
})
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config() 

import { connectDB } from './config/db'
import userRoutes from './routes/user.routes'
import eventRoutes from './routes/event.routes'

connectDB()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/events', eventRoutes)

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
})
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

import { connectDB } from './config/db'

import userRoutes from './routes/user.routes'
import eventRoutes from './routes/event.routes'
import invitationRoutes from './routes/invitation.routes'
import taskRoutes from './routes/task.routes'
import expenseRoutes from './routes/expense.routes'
import activityRoutes from './routes/activity.routes'
import guestRoutes from './routes/guest.routes'

connectDB()

const app = express()
const PORT = process.env.PORT || 3000

// Middlewares globales
app.use(cors())
app.use(express.json())

// Registro de rutas
app.use('/api/users', userRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/events', expenseRoutes)
app.use('/api/invitations', invitationRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/activities', activityRoutes)
app.use('/api/guests', guestRoutes)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
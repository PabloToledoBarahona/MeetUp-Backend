import { Router } from 'express'
import { authenticateToken } from '../middlewares/auth.middleware'
import { createTask, listTasksByEvent, updateTask, deleteTask } from '../controllers/task.controller'

const router = Router()

router.post('/', authenticateToken, createTask)
router.get('/event/:eventId', authenticateToken, listTasksByEvent)
router.put('/:taskId', authenticateToken, updateTask)
router.delete('/:taskId', authenticateToken, deleteTask)

export default router
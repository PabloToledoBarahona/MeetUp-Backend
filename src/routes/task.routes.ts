import { Router } from 'express'
import { authenticateToken } from '../middlewares/auth.middleware'
import { createTask, listTasksByEvent, updateTask, deleteTask, assignTask, updateOwnTaskStatus } from '../controllers/task.controller'

const router = Router()

router.post('/', authenticateToken, createTask)
router.get('/event/:eventId', authenticateToken, listTasksByEvent)
router.put('/:taskId', authenticateToken, updateTask)
router.delete('/:taskId', authenticateToken, deleteTask)
router.patch('/:taskId/assign', authenticateToken, assignTask)
router.patch('/:taskId/status', authenticateToken, updateOwnTaskStatus)

export default router
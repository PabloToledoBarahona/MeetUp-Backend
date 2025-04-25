import { Router } from 'express'
import { createEvent, editEvent, getUserEvents, removeEvent } from '../controllers/event.controller'
import { authenticateToken } from '../middlewares/auth.middleware'

const router = Router()

router.post('/', authenticateToken, createEvent)
router.get('/', authenticateToken, getUserEvents)
router.put('/:id', authenticateToken, editEvent)
router.delete('/:id', authenticateToken, removeEvent)

export default router
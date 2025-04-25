import { Router } from 'express'
import { createEvent, editEvent, getUserEvents, removeEvent, getBirthdayTemplate, getJunteTemplate, createEventFromTemplate } from '../controllers/event.controller'
import { authenticateToken } from '../middlewares/auth.middleware'

const router = Router()

router.post('/', authenticateToken, createEvent)
router.get('/', authenticateToken, getUserEvents)
router.put('/:id', authenticateToken, editEvent)
router.delete('/:id', authenticateToken, removeEvent)
router.get('/templates/birthday', authenticateToken, getBirthdayTemplate)
router.get('/templates/junte', authenticateToken, getJunteTemplate)
router.post('/from-template', authenticateToken, createEventFromTemplate)

export default router
import { Router } from 'express'
import { createEvent, editEvent, getUserEvents, removeEvent, getBirthdayTemplate, getJunteTemplate, createEventFromTemplate, cancelEventController, getEventById, unCancelEventController, getEventForGuest, addCollaboratorController, removeCollaboratorController } from '../controllers/event.controller'
import { authenticateToken } from '../middlewares/auth.middleware'

const router = Router()

router.post('/', authenticateToken, createEvent)
router.get('/', authenticateToken, getUserEvents)
router.get('/:id', authenticateToken, getEventById)
router.put('/:id', authenticateToken, editEvent)
router.delete('/:id', authenticateToken, removeEvent)
router.get('/templates/birthday', authenticateToken, getBirthdayTemplate)
router.get('/templates/junte', authenticateToken, getJunteTemplate)
router.post('/from-template', authenticateToken, createEventFromTemplate)
router.patch('/:id/cancel', authenticateToken, cancelEventController)
router.patch('/:id/uncancel', authenticateToken, unCancelEventController);
router.get('/for-guest/:guestId', getEventForGuest)
router.patch('/:id/collaborators/add', authenticateToken, addCollaboratorController)
router.patch('/:id/collaborators/remove', authenticateToken, removeCollaboratorController)

export default router
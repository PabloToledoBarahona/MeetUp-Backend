import { Router } from 'express'
import { authenticateToken } from '../middlewares/auth.middleware'
import {
  createGuest,
  getGuest,
  updateGuest,
  deleteGuest,
  listGuestsByEvent,
  sendInvitationsController,
  sendRemindersController,
  confirmGuestResponse
} from '../controllers/guest.controller'

const router = Router()

router.post('/:eventId/send-invitations', authenticateToken, sendInvitationsController)
router.post('/:eventId/send-reminders', authenticateToken, sendRemindersController)

router.get('/event/:eventId', authenticateToken, listGuestsByEvent)
router.post('/', authenticateToken, createGuest)
router.get('/:id', authenticateToken, getGuest)
router.put('/:id', authenticateToken, updateGuest)
router.delete('/:id', authenticateToken, deleteGuest)
router.get('/confirm/:guestId/:response', confirmGuestResponse)

export default router
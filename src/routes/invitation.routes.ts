import { Router } from 'express'
import { authenticateToken } from '../middlewares/auth.middleware'
import {
  createInvitation,
  listInvitations,
  confirmAttendance
} from '../controllers/invitation.controller'

const router = Router()

router.post('/', authenticateToken, createInvitation)
router.get('/event/:eventId', authenticateToken, listInvitations)
router.patch('/:id/confirm', confirmAttendance)

export default router
import { Router } from 'express'
import { authenticateToken } from '../middlewares/auth.middleware'
import {
  createGuest,
  getGuest,
  updateGuest,
  deleteGuest,
  listGuestsByEvent
} from '../controllers/guest.controller'

const router = Router()

router.post('/', authenticateToken, createGuest)
router.get('/:id', authenticateToken, getGuest)
router.put('/:id', authenticateToken, updateGuest)
router.delete('/:id', authenticateToken, deleteGuest)
router.get('/event/:eventId', authenticateToken, listGuestsByEvent)

export default router
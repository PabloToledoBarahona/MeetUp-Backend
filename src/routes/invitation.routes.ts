import { Router } from 'express'
import { authenticateToken } from '../middlewares/auth.middleware'
import { 
  importContactsController, 
  confirmAttendance, 
  listInvitations 
} from '../controllers/invitation.controller'

const router = Router()

router.post('/import', authenticateToken, importContactsController)
router.patch('/:id/confirm', confirmAttendance)
router.get('/event/:eventId', authenticateToken, listInvitations)

export default router
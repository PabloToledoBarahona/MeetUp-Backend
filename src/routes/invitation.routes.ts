import { Router } from 'express'
import { authenticateToken } from '../middlewares/auth.middleware'
import { importContactsController } from '../controllers/invitation.controller'

const router = Router()

router.post('/import', authenticateToken, importContactsController)

export default router
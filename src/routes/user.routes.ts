import { Router } from 'express'
import { registerUser, loginUser, getMe } from '../controllers/user.controller'
import { authenticateToken } from '../middlewares/auth.middleware'

const router = Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', authenticateToken, getMe)

export default router
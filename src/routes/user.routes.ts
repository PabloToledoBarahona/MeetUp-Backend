import { Router } from 'express'
import { registerUser, loginUser, getMe, getAllUsers } from '../controllers/user.controller'
import { authenticateToken } from '../middlewares/auth.middleware'

const router = Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', authenticateToken, getMe)
router.get('/', authenticateToken, getAllUsers)

export default router
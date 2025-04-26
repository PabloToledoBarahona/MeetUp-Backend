import { Router } from 'express'
import { authenticateToken } from '../middlewares/auth.middleware'
import { createActivity, listActivitiesByEvent, updateActivity, deleteActivity } from '../controllers/activity.controller'

const router = Router()

router.post('/', authenticateToken, createActivity)
router.get('/event/:eventId', authenticateToken, listActivitiesByEvent)
router.put('/:activityId', authenticateToken, updateActivity)
router.delete('/:activityId', authenticateToken, deleteActivity)

export default router
import { Request, Response } from 'express'
import * as service from '../services/activity.service'

export const createActivity = async (req: Request, res: Response): Promise<void> => {
  try {
    const activity = await service.createActivity(req.body)
    res.status(201).json({ success: true, data: activity })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const listActivitiesByEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { eventId } = req.params
    const activities = await service.getActivitiesByEvent(eventId)
    res.status(200).json({ success: true, data: activities })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const updateActivity = async (req: Request, res: Response): Promise<void> => {
  try {
    const { activityId } = req.params
    const updated = await service.updateActivity(activityId, req.body)
    res.status(200).json({ success: true, data: updated })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const deleteActivity = async (req: Request, res: Response): Promise<void> => {
  try {
    const { activityId } = req.params
    await service.deleteActivity(activityId)
    res.status(200).json({ success: true, message: 'Actividad eliminada' })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}
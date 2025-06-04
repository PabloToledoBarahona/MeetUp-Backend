import { Request, Response } from 'express'
import * as service from '../services/task.service'

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const task = await service.createTask(req.body, userId);
    res.status(201).json({ success: true, data: task });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export const listTasksByEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { eventId } = req.params
    const tasks = await service.getTasksByEvent(eventId)
    res.status(200).json({ success: true, data: tasks })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { taskId } = req.params
    const updated = await service.updateTask(taskId, req.body)
    res.status(200).json({ success: true, data: updated })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { taskId } = req.params
    await service.deleteTask(taskId)
    res.status(200).json({ success: true, message: 'Tarea eliminada' })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const assignTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { taskId } = req.params
    const { userId } = req.body

    const updated = await service.assignTaskToUser(taskId, userId)
    res.status(200).json({ success: true, data: updated })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const updateOwnTaskStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const { taskId } = req.params
      const { status } = req.body
  
      // @ts-ignore
      const userId = req.user.id
  
      const updated = await service.updateOwnTaskStatus(taskId, userId, status)
      res.status(200).json({ success: true, data: updated })
    } catch (error: any) {
      res.status(403).json({ success: false, message: error.message })
    }
  }

export const unassignTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { taskId } = req.params;
    const updated = await service.unassignTask(taskId);
    res.status(200).json({ success: true, data: updated });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};
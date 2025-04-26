import Task, { ITask } from '../models/task.model'
import { Types } from 'mongoose'

export const createTask = async (data: Partial<ITask>) => {
  const task = new Task(data)
  await task.save()
  return task
}

export const getTasksByEvent = async (eventId: string) => {
  return Task.find({ event: eventId }).populate('assignedTo', 'name email')
}

export const updateTask = async (taskId: string, data: Partial<ITask>) => {
  return Task.findByIdAndUpdate(taskId, data, { new: true })
}

export const deleteTask = async (taskId: string) => {
  return Task.findByIdAndDelete(taskId)
}

export const assignTaskToUser = async (taskId: string, userId: string) => {
  const task = await Task.findById(taskId)
  if (!task) throw new Error('Tarea no encontrada')

  task.assignedTo = new Types.ObjectId(userId) // ✅ Conversión correcta
  await task.save()
  return task
}
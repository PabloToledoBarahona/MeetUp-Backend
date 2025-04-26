import Task, { ITask } from '../models/task.model'

export const createTask = async (data: Partial<ITask>) => {
  const task = new Task(data)
  await task.save()
  return task
}

export const getTasksByEvent = async (eventId: string) => {
  return Task.find({ event: eventId })
}

export const updateTask = async (taskId: string, data: Partial<ITask>) => {
  return Task.findByIdAndUpdate(taskId, data, { new: true })
}

export const deleteTask = async (taskId: string) => {
  return Task.findByIdAndDelete(taskId)
}
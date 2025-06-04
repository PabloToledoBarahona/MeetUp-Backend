import Task, { ITask } from '../models/task.model'
import Event from '../models/event.model'
import { Types } from 'mongoose'
import User from '../models/user.model'

export const createTask = async (data: Partial<ITask>, userId: string) => {
  if (!data.event) throw new Error("Evento requerido");

  const event = await Event.findById(data.event);
  if (!event) throw new Error("Evento no encontrado");
  if (event.createdBy.toString() !== userId) throw new Error("No autorizado");

  const task = new Task(data);
  await task.save();
  return task;
};

export const getTasksByEvent = async (eventId: string) => {
  return Task.find({ event: eventId })
    .populate('assignedTo', 'name email')
    .populate('event', 'name'); 
};

export const updateTask = async (taskId: string, data: Partial<ITask>) => {
  if (data.status && !['pending', 'in_progress', 'completed'].includes(data.status)) {
    throw new Error("Estado inválido");
  }
  return Task.findByIdAndUpdate(taskId, data, { new: true });
}

export const deleteTask = async (taskId: string) => {
  return Task.findByIdAndDelete(taskId)
}

export const assignTaskToUser = async (taskId: string, userId: string) => {
  const task = await Task.findById(taskId);
  if (!task) throw new Error('Tarea no encontrada');

  const event = await Event.findById(task.event);
  if (!event) throw new Error('Evento no encontrado');

  const user = await User.findById(userId);
  if (!user) throw new Error('El usuario no existe');

  const isCollaborator = event.collaborators?.some(c => c.id === userId);
  if (!isCollaborator) throw new Error('El usuario no es colaborador del evento');

  task.assignedTo = new Types.ObjectId(userId);
  await task.save();
  return task;
};

export const updateOwnTaskStatus = async (
  taskId: string,
  userId: string,
  newStatus: 'pending' | 'in_progress' | 'completed'
) => {
  const task = await Task.findById(taskId)
  if (!task) throw new Error('Tarea no encontrada')

  const event = await Event.findById(task.event)
  if (!event) throw new Error('Evento no encontrado')

  const isAssigned = task.assignedTo?.toString() === userId
  const isCreator = event.createdBy?.toString() === userId

  if (!isAssigned && !isCreator) {
    throw new Error('No tienes permiso para modificar esta tarea')
  }

  task.status = newStatus
  await task.save()
  return task
}

export const unassignTask = async (taskId: string) => {
  const task = await Task.findById(taskId);
  if (!task) throw new Error("Tarea no encontrada");

  task.assignedTo = undefined;
  await task.save();
  return task;
};
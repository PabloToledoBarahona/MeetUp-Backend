import mongoose from "mongoose";
import Event from "../models/event.model";
import User from "../models/user.model";
import Task from '../models/task.model'

export const createEvent = async (eventData: any, userId: string) => {
  const newEvent = new Event({
    ...eventData,
    createdBy: userId,
  });
  await newEvent.save();
  return newEvent;
};

export const getEventById = async (eventId: string, userId: string) => {
  const event = await Event.findOne({ _id: eventId, createdBy: userId });

  if (!event) {
    throw new Error("Evento no encontrado o no autorizado");
  }

  return event.toObject(); 
};

export const getEventsByUser = async (userId: string) => {
  const events = await Event.find({ createdBy: userId }).sort({
    createdAt: -1,
  });
  return events;
};

export const updateEvent = async (
  eventId: string,
  userId: string,
  data: any
) => {
  const event = await Event.findOneAndUpdate(
    { _id: eventId, createdBy: userId },
    data,
    { new: true }
  );
  if (!event) throw new Error("Evento no encontrado o no autorizado");
  return event;
};

export const deleteEvent = async (eventId: string, userId: string) => {
  const event = await Event.findOneAndDelete({
    _id: eventId,
    createdBy: userId,
  });
  if (!event) throw new Error("Evento no encontrado o no autorizado");
  return event;
};

export const cancelEvent = async (eventId: string, userId: string) => {
  const event = await Event.findOne({ _id: eventId, createdBy: userId });

  if (!event) throw new Error("Evento no encontrado o no autorizado");
  if (event.isCancelled) throw new Error("El evento ya está cancelado");

  event.isCancelled = true;
  await event.save();

  return event;
};

export const unCancelEvent = async (eventId: string, userId: string) => {
  const event = await Event.findOne({ _id: eventId, createdBy: userId });

  if (!event) throw new Error("Evento no encontrado o no autorizado");
  if (!event.isCancelled) throw new Error("El evento ya está activo");

  event.isCancelled = false;
  await event.save();

  return event;
};


const ObjectId = mongoose.Types.ObjectId;

export const addCollaborator = async (
  eventId: string,
  userId: string,
  collaboratorId: string
) => {
  const event = await Event.findOne({ _id: eventId, createdBy: userId });
  if (!event) throw new Error("Evento no encontrado o no autorizado");

  const user = await User.findById(collaboratorId);
  if (!user) throw new Error("El usuario no existe");

  const alreadyExists = event.collaborators?.some(c => c.id === collaboratorId);
  if (alreadyExists) throw new Error("El colaborador ya está asignado");

  event.collaborators = [
    ...(event.collaborators || []),
    { id: user._id.toString(), name: user.name, email: user.email }
  ];

  await event.save();
  return event;
};

export const removeCollaborator = async (
  eventId: string,
  userId: string,
  collaboratorId: string
) => {
  const event = await Event.findOne({ _id: eventId, createdBy: userId });
  if (!event) throw new Error("Evento no encontrado o no autorizado");

  const hasAssignedTasks = await Task.exists({
    event: eventId,
    assignedTo: collaboratorId
  });

  if (hasAssignedTasks) {
    throw new Error("Este colaborador tiene tareas asignadas. No se puede eliminar.");
  }

  const prevLength = event.collaborators?.length || 0;

  event.collaborators = (event.collaborators || []).filter(
    c => c.id !== collaboratorId
  );

  if (event.collaborators.length === prevLength) {
    throw new Error("El colaborador no estaba asignado");
  }

  await event.save();
  return event;
};

export const getEventsAsCollaborator = async (userId: string) => {
  return Event.find({ 'collaborators.id': userId }).sort({ createdAt: -1 });
};
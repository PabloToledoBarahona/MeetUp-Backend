import mongoose from "mongoose";
import Event from "../models/event.model";

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

  return event;
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
  if (!ObjectId.isValid(eventId) || !ObjectId.isValid(collaboratorId)) {
    throw new Error("ID inválido");
  }

  const event = await Event.findOne({ _id: eventId, createdBy: userId });
  if (!event) throw new Error("Evento no encontrado o no autorizado");

  const alreadyAdded = event.collaborators?.some(
    (id) => id.toString() === collaboratorId
  );
  if (alreadyAdded) throw new Error("El colaborador ya está asignado");

  event.collaborators = [...(event.collaborators || []), new ObjectId(collaboratorId)];
  await event.save();

  return event;
};

export const removeCollaborator = async (
  eventId: string,
  userId: string,
  collaboratorId: string
) => {
  if (!ObjectId.isValid(eventId) || !ObjectId.isValid(collaboratorId)) {
    throw new Error("ID inválido");
  }

  const event = await Event.findOne({ _id: eventId, createdBy: userId });
  if (!event) throw new Error("Evento no encontrado o no autorizado");

  const initialCount = event.collaborators?.length || 0;
  event.collaborators = (event.collaborators || []).filter(
    (id) => id.toString() !== collaboratorId
  );

  if (event.collaborators.length === initialCount) {
    throw new Error("El colaborador no estaba asignado");
  }

  await event.save();
  return event;
};
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

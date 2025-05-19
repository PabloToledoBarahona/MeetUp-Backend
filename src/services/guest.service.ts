import Guest from "../models/guest.model";
import Event from "../models/event.model";
import { sendInvitationEmail } from "./mailer.service";
import { config } from "../config/config";

export const createGuest = async (data: any) => {
  const { event, name, email } = data;

  if (!name || typeof name !== "string") throw new Error("Nombre inválido");
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    throw new Error("Email inválido");

  const eventExists = await Event.findById(event);
  if (!eventExists) throw new Error("Evento no encontrado");

  const exists = await Guest.findOne({ event, email });
  if (exists) throw new Error("Este invitado ya existe");

  const guest = new Guest(data);
  return guest.save();
};

export const getGuestById = async (id: string) => {
  return Guest.findById(id);
};

export const updateGuest = async (id: string, data: any) => {
  return Guest.findByIdAndUpdate(id, data, { new: true });
};

export const deleteGuest = async (id: string) => {
  return Guest.findByIdAndDelete(id);
};

export const listGuestsByEvent = async (eventId: string) => {
  return Guest.find({ event: eventId });
};

export const sendMassInvitations = async (
  eventId: string,
  customMessage: string,
  organizerId: string
) => {
  const event = await Event.findById(eventId);
  if (!event) throw new Error("Evento no encontrado");

  if (event.createdBy.toString() !== organizerId) {
    throw new Error("No tienes permiso para enviar invitaciones de este evento");
  }

  const guests = await Guest.find({ event: eventId, invitationSent: false });
  const results = [];

  for (const guest of guests) {
    try {
      const confirmUrl = `${config.baseUrl}/api/guests/confirm/${guest._id}/attending`;
      const declineUrl = `${config.baseUrl}/api/guests/confirm/${guest._id}/not_attending`;

      const html = `
        <p>Hola <b>${guest.name}</b>,</p>
        <p>${customMessage}</p>
        <ul>
          <li><strong>Evento:</strong> ${event.name}</li>
          <li><strong>Fecha:</strong> ${new Date(event.startTime).toLocaleString()}</li>
          <li><strong>Lugar:</strong> ${event.location}</li>
        </ul>
        <p>Por favor confirma tu asistencia:</p>
        <p>
          <a href="${confirmUrl}" style="padding: 10px 15px; background: green; color: white; text-decoration: none; border-radius: 5px;">Confirmar Asistencia</a>
          &nbsp;&nbsp;
          <a href="${declineUrl}" style="padding: 10px 15px; background: red; color: white; text-decoration: none; border-radius: 5px;">No Asistiré</a>
        </p>
        <p>Gracias,<br/>Equipo MeetUp</p>
      `;

      await sendInvitationEmail(
        guest.email,
        `Invitación a ${event.name}`,
        html
      );

      guest.invitationSent = true;
      guest.lastReminderOn = new Date();
      await guest.save();

      results.push({ guestId: guest._id, success: true });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Error desconocido";
      results.push({ guestId: guest._id, success: false, error: errorMessage });
    }
  }

  return results;
};

export const sendRemindersToPendingGuests = async (
  eventId: string,
  customMessage: string,
  organizerId: string
) => {
  const event = await Event.findById(eventId);
  if (!event) throw new Error("Evento no encontrado");

  if (event.createdBy.toString() !== organizerId) {
    throw new Error("No tienes permiso para enviar recordatorios de este evento");
  }

  const guests = await Guest.find({ event: eventId, status: "pending" });
  const results = [];

  for (const guest of guests) {
    try {
      const html = `
        <p>Hola <b>${guest.name}</b>,</p>
        <p>${customMessage}</p>
        <ul>
          <li><strong>Evento:</strong> ${event.name}</li>
          <li><strong>Fecha:</strong> ${new Date(event.startTime).toLocaleString()}</li>
          <li><strong>Lugar:</strong> ${event.location}</li>
        </ul>
        <p>Te recordamos confirmar tu asistencia desde la app MeetUp.</p>
      `;

      await sendInvitationEmail(
        guest.email,
        `Recordatorio de ${event.name}`,
        html
      );

      guest.lastReminderOn = new Date();
      await guest.save();

      results.push({ guestId: guest._id, success: true });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Error desconocido";
      results.push({ guestId: guest._id, success: false, error: errorMessage });
    }
  }

  return results;
};

export const confirmGuestAttendance = async (
  guestId: string,
  response: string
) => {
  const validResponses = ['attending', 'not_attending'];
  if (!validResponses.includes(response)) {
    throw new Error('Respuesta inválida');
  }

  const guest = await Guest.findById(guestId);
  if (!guest) throw new Error('Invitado no encontrado');

  if (guest.status !== 'pending') {
    throw new Error('Ya se ha registrado una respuesta previamente');
  }

  guest.status = response === 'attending' ? 'confirmed' : 'rejected';
  guest.lastReminderOn = new Date();
  await guest.save();

  return {
    title: '¡Gracias por tu respuesta!',
    message: response === 'attending'
      ? 'Tu asistencia ha sido confirmada correctamente.'
      : 'Lamentamos que no puedas asistir. Tu respuesta ha sido registrada.'
  };
};
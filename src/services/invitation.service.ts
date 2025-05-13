import Invitation from "../models/invitation.model"
import Event from "../models/event.model"
import { sendInvitationEmail } from "./mailer.service"

export const createInvitation = async (
  eventId: string,
  name: string,
  email: string,
  invitedBy: string
) => {
  // Validación
  if (!name || typeof name !== "string") throw new Error("Nombre inválido")
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new Error("Email inválido")

  // Verificar duplicado
  const existing = await Invitation.findOne({ event: eventId, email })
  if (existing) throw new Error("El invitado ya fue agregado")

  // Verificar evento
  const event = await Event.findById(eventId)
  if (!event) throw new Error("Evento no encontrado")

  // Crear invitación
  const invitation = new Invitation({
    event: eventId,
    name,
    email,
    invitedBy
  })

  await invitation.save()

  // Enviar correo
  await sendInvitationEmail(email, event.name, name)

  // Actualizar flags
  invitation.invitationSent = true
  invitation.lastReminderOn = new Date()
  await invitation.save()

  return invitation
}

export const getInvitationsByEvent = async (eventId: string) => {
  return Invitation.find({ event: eventId })
}

export const updateStatus = async (
  invitationId: string,
  status: "pending" | "confirmed" | "declined" | "maybe"
) => {
  const invitation = await Invitation.findById(invitationId)
  if (!invitation) throw new Error("Invitación no encontrada")

  invitation.status = status
  await invitation.save()
  return invitation
}
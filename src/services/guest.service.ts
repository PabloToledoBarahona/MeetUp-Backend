import Guest from '../models/guest.model'
import Event from '../models/event.model'

export const createGuest = async (data: any) => {
  const { event, name, email } = data

  if (!name || typeof name !== 'string') throw new Error('Nombre inválido')
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new Error('Email inválido')

  const eventExists = await Event.findById(event)
  if (!eventExists) throw new Error('Evento no encontrado')

  const exists = await Guest.findOne({ event, email })
  if (exists) throw new Error('Este invitado ya existe')

  const guest = new Guest(data)
  return guest.save()
}

export const getGuestById = async (id: string) => {
  return Guest.findById(id)
}

export const updateGuest = async (id: string, data: any) => {
  return Guest.findByIdAndUpdate(id, data, { new: true })
}

export const deleteGuest = async (id: string) => {
  return Guest.findByIdAndDelete(id)
}

export const listGuestsByEvent = async (eventId: string) => {
  return Guest.find({ event: eventId })
}
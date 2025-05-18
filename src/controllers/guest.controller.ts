import { Request, Response } from 'express'
import * as service from '../services/guest.service'

export const createGuest = async (req: Request, res: Response) => {
  try {
    const guest = await service.createGuest(req.body)
    res.status(201).json({ success: true, data: guest })
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message })
  }
}

export const getGuest = async (req: Request, res: Response) => {
  try {
    const guest = await service.getGuestById(req.params.id)
    if (!guest) throw new Error('Invitado no encontrado')
    res.status(200).json({ success: true, data: guest })
  } catch (err: any) {
    res.status(404).json({ success: false, message: err.message })
  }
}

export const updateGuest = async (req: Request, res: Response) => {
  try {
    const updated = await service.updateGuest(req.params.id, req.body)
    res.status(200).json({ success: true, data: updated })
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message })
  }
}

export const deleteGuest = async (req: Request, res: Response) => {
  try {
    await service.deleteGuest(req.params.id)
    res.status(200).json({ success: true, message: 'Invitado eliminado' })
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message })
  }
}

export const listGuestsByEvent = async (req: Request, res: Response) => {
  try {
    const guests = await service.listGuestsByEvent(req.params.eventId)
    res.status(200).json({ success: true, data: guests })
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message })
  }
}

export const sendInvitationsController = async (req: Request, res: Response) => {
  try {
    const { message } = req.body
    const { eventId } = req.params
    // @ts-ignore
    const userId = req.user.id

    if (!message || typeof message !== 'string') {
      throw new Error('Mensaje personalizado requerido')
    }

    const results = await service.sendMassInvitations(eventId, message, userId)
    res.status(200).json({ success: true, results })
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message })
  }
}

export const sendRemindersController = async (req: Request, res: Response) => {
  try {
    const { message } = req.body
    const { eventId } = req.params
    // @ts-ignore
    const userId = req.user.id

    if (!message || typeof message !== 'string') {
      throw new Error('Mensaje personalizado requerido')
    }

    const results = await service.sendRemindersToPendingGuests(eventId, message, userId)
    res.status(200).json({ success: true, results })
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message })
  }
}


export const confirmGuestResponse = async (req: Request, res: Response) => {
  try {
    const { guestId, response } = req.params

    const result = await service.confirmGuestAttendance(guestId, response)

    res.setHeader('Content-Type', 'text/html')
    res.send(`
      <html>
        <head><title>Confirmación</title></head>
        <body style="font-family:sans-serif;text-align:center;padding:40px;">
          <h2>${result.title}</h2>
          <p>${result.message}</p>
        </body>
      </html>
    `)
  } catch (err: any) {
    res.status(400).send(`<h2>Error</h2><p>${err.message}</p>`)
  }
}
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
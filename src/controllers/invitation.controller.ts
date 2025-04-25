import { Request, Response } from 'express'
import * as service from '../services/invitation.service'

export const importContactsController = async (req: Request, res: Response) => {
  try {
    const { eventId, contacts } = req.body
    // @ts-ignore
    const invitedBy = req.user.id

    if (!contacts || !Array.isArray(contacts)) {
      throw new Error('Formato de contactos inválido')
    }

    const invitations = await service.importContacts(eventId, contacts, invitedBy)

    res.status(201).json({ success: true, message: 'Contactos importados', data: invitations })
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message })
  }
}
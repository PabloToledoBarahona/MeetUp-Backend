import { Request, Response } from 'express'
import * as service from '../services/invitation.service'

export const createInvitation = async (req: Request, res: Response) => {
  try {
    const { eventId, name, email } = req.body
    // @ts-ignore
    const invitedBy = req.user.id

    const invitation = await service.createInvitation(eventId, name, email, invitedBy)
    res.status(201).json({ success: true, data: invitation })
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message })
  }
}

export const listInvitations = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params
    const invitations = await service.getInvitationsByEvent(eventId)

    const grouped = {
      confirmed: [] as any[],
      pending: [] as any[],
      declined: [] as any[],
      maybe: [] as any[]
    }

    invitations.forEach(invitation => {
      grouped[invitation.status].push(invitation)
    })

    res.status(200).json({ success: true, data: grouped })
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message })
  }
}

export const confirmAttendance = async (req: Request, res: Response) => {
  try {
    const { status } = req.body
    const { id } = req.params

    if (!['confirmed', 'declined', 'maybe'].includes(status)) {
      throw new Error('Estado de confirmación inválido')
    }

    const updatedInvitation = await service.updateStatus(id, status)

    res.status(200).json({ success: true, message: 'Estado actualizado', data: updatedInvitation })
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message })
  }
}
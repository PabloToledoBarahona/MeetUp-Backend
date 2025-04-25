import Invitation from '../models/invitation.model'

export const importContacts = async (eventId: string, contacts: any[], invitedBy: string) => {
  const createdInvitations = []

  for (const contact of contacts) {
    const existing = await Invitation.findOne({ event: eventId, email: contact.email, phone: contact.phone })

    if (!existing) {
      const newInvitation = new Invitation({
        event: eventId,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        invitedBy
      })
      await newInvitation.save()
      createdInvitations.push(newInvitation)
    }
  }

  return createdInvitations
}
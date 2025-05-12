import Invitation from "../models/invitation.model";

export const importContacts = async (
  eventId: string,
  contacts: any[],
  invitedBy: string
) => {
  const createdInvitations = [];

  for (const contact of contacts) {
    // 🔽 Añadir validaciones aquí
    if (!contact.name || typeof contact.name !== "string") {
      throw new Error("Nombre inválido");
    }

    if (!contact.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contact.email)) {
      throw new Error("Email inválido");
    }

    const existing = await Invitation.findOne({
      event: eventId,
      email: contact.email,
      phone: contact.phone,
    });

    if (!existing) {
      const newInvitation = new Invitation({
        event: eventId,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        invitedBy,
      });
      await newInvitation.save();
      createdInvitations.push(newInvitation);
    }
  }

  return createdInvitations;
};

export const getInvitationsByEvent = async (eventId: string) => {
  return Invitation.find({ event: eventId });
};

export const updateStatus = async (
  invitationId: string,
  status: "pending" | "confirmed" | "declined" | "maybe"
) => {
  const invitation = await Invitation.findById(invitationId);
  if (!invitation) throw new Error("Invitación no encontrada");

  invitation.status = status;
  await invitation.save();
  return invitation;
};

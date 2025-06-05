import { Request, Response } from "express";
import * as eventService from "../services/event.service";
import { birthdayTemplate, junteTemplate } from '../data/templates'
import Guest from '../models/guest.model'
import Event from '../models/event.model'


export const createEvent = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const event = await eventService.createEvent(req.body, userId);
    res
      .status(201)
      .json({ success: true, message: "Evento creado", data: event });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getEventById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    // @ts-ignore
    const userId = req.user.id;

    const event = await eventService.getEventById(id, userId);
    res.status(200).json({ success: true, data: event });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const getUserEvents = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const events = await eventService.getEventsByUser(userId);
    res.status(200).json({ success: true, data: events });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const editEvent = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const eventId = req.params.id;
    const updated = await eventService.updateEvent(eventId, userId, req.body);
    res
      .status(200)
      .json({ success: true, message: "Evento actualizado", data: updated });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const removeEvent = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const eventId = req.params.id;
    const deleted = await eventService.deleteEvent(eventId, userId);
    res
      .status(200)
      .json({ success: true, message: "Evento eliminado", data: deleted });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getBirthdayTemplate = async (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Plantilla de cumpleaños',
    data: birthdayTemplate
  })
}

export const getJunteTemplate = async (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Plantilla de junte',
    data: junteTemplate
  })
}

export const createEventFromTemplate = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const userId = req.user.id
      const { type, overrides } = req.body
  
      const { birthdayTemplate, junteTemplate } = await import('../data/templates')
  
      let baseTemplate
      if (type === 'birthday') baseTemplate = birthdayTemplate
      else if (type === 'junte') baseTemplate = junteTemplate
      else throw new Error('Tipo de plantilla no válida')
  
      const eventData = {
        ...baseTemplate,
        ...overrides 
      }
  
      const newEvent = await eventService.createEvent(eventData, userId)
  
      res.status(201).json({ success: true, message: 'Evento creado desde plantilla', data: newEvent })
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message })
    }
  }

  export const cancelEventController = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const userId = req.user.id
      const eventId = req.params.id
  
      const cancelledEvent = await eventService.cancelEvent(eventId, userId)
  
      res.status(200).json({ success: true, message: 'Evento cancelado exitosamente', data: cancelledEvent })
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message })
    }
  }

  export const unCancelEventController = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const userId = req.user.id;
      const eventId = req.params.id;
  
      const uncancelledEvent = await eventService.unCancelEvent(eventId, userId);
  
      res.status(200).json({ success: true, message: "Evento reactivado exitosamente", data: uncancelledEvent });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  export const getEventForGuest = async (req: Request, res: Response) => {
  try {
    const { guestId } = req.params

    const guest = await Guest.findById(guestId)
    if (!guest) throw new Error('Invitado no encontrado')

    const event = await Event.findById(guest.event)
    if (!event) throw new Error('Evento no encontrado')

    res.status(200).json({ success: true, data: event })
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message })
  }
}

export const addCollaboratorController = async (req: Request, res: Response) => {
  try {
    const { collaboratorId } = req.body;
    const { id: eventId } = req.params;
    // @ts-ignore
    const userId = req.user.id;

    if (!collaboratorId) throw new Error("ID del colaborador requerido");

    const updatedEvent = await eventService.addCollaborator(eventId, userId, collaboratorId);

    res.status(200).json({ success: true, message: "Colaborador agregado exitosamente", data: updatedEvent });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const removeCollaboratorController = async (req: Request, res: Response) => {
  try {
    const { collaboratorId } = req.body;
    const { id: eventId } = req.params;
    // @ts-ignore
    const userId = req.user.id;

    if (!collaboratorId) throw new Error("ID del colaborador requerido");

    const updatedEvent = await eventService.removeCollaborator(eventId, userId, collaboratorId);

    res.status(200).json({ success: true, message: "Colaborador eliminado exitosamente", data: updatedEvent });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getEventCollaborators = async (req: Request, res: Response) => {
  try {
    const { id: eventId } = req.params;
    const event = await Event.findById(eventId).populate('collaborators', 'name email');

    if (!event) throw new Error('Evento no encontrado');

    res.status(200).json({ success: true, data: event.collaborators });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getEventsAsCollaboratorController = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const events = await eventService.getEventsAsCollaborator(userId);
    res.status(200).json({ success: true, data: events });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getEventForCollaborator = async (req: Request, res: Response) => {
  try {
    const { id: eventId } = req.params;
    // @ts-ignore
    const userId = req.user.id;

    const event = await Event.findById(eventId);
    if (!event) throw new Error('Evento no encontrado');

    const isCollaborator = event.collaborators?.some(c => c.id === userId);
    if (!isCollaborator) throw new Error('No tienes acceso a este evento');

    res.status(200).json({ success: true, data: event });
  } catch (err: any) {
    res.status(403).json({ success: false, message: err.message });
  }
};
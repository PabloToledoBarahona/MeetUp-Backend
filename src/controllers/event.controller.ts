import { Request, Response } from "express";
import * as eventService from "../services/event.service";
import { birthdayTemplate } from '../data/templates'

export const createEvent = async (req: Request, res: Response) => {
  try {
    // @ts-ignore: user viene desde el middleware
    const userId = req.user.id;
    const event = await eventService.createEvent(req.body, userId);
    res
      .status(201)
      .json({ success: true, message: "Evento creado", data: event });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
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
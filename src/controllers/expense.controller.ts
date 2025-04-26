import { Request, Response } from 'express'
import * as service from '../services/expense.service'
import Event from '../models/event.model'

export const createExpense = async (req: Request, res: Response): Promise<void> => {
  try {
    const expense = await service.createExpense(req.body)
    res.status(201).json({ success: true, data: expense })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const listExpenses = async (req: Request, res: Response): Promise<void> => {
  try {
    const { eventId } = req.params
    const expenses = await service.getExpensesByEvent(eventId)
    res.status(200).json({ success: true, data: expenses })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const deleteExpense = async (req: Request, res: Response): Promise<void> => {
  try {
    const { expenseId } = req.params
    await service.deleteExpense(expenseId)
    res.status(200).json({ success: true, message: 'Gasto eliminado' })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const getFinancialSummary = async (req: Request, res: Response): Promise<void> => {
  try {
    const { eventId } = req.params

    const event = await Event.findById(eventId)
    if (!event) throw new Error('Evento no encontrado')

    const summary = await service.calculateFinancialSummary(eventId, event.budget || 0)
    res.status(200).json({ success: true, data: summary })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}
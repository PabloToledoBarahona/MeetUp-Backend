import { Request, Response } from 'express'
import * as service from '../services/expense.service'
import Event from '../models/event.model'

export const createExpense = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params
    const expense = await service.createExpense(eventId, req.body)
    res.status(201).json({ success: true, data: expense })
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message })
  }
}

export const listExpenses = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params
    const expenses = await service.getExpensesByEvent(eventId)
    res.status(200).json({ success: true, data: expenses })
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message })
  }
}

export const getExpense = async (req: Request, res: Response) => {
  try {
    const { expenseId } = req.params
    const expense = await service.getExpenseById(expenseId)
    if (!expense) throw new Error('Gasto no encontrado')
    res.status(200).json({ success: true, data: expense })
  } catch (err: any) {
    res.status(404).json({ success: false, message: err.message })
  }
}

export const updateExpense = async (req: Request, res: Response) => {
  try {
    const { expenseId } = req.params
    const updated = await service.updateExpense(expenseId, req.body)
    res.status(200).json({ success: true, data: updated })
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message })
  }
}

export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const { expenseId } = req.params
    await service.deleteExpense(expenseId)
    res.status(200).json({ success: true, message: 'Gasto eliminado' })
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message })
  }
}

export const getBudgetSummary = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params
    const event = await Event.findById(eventId)
    if (!event) throw new Error('Evento no encontrado')

    const summary = await service.calculateSummary(event)
    res.status(200).json({ success: true, data: summary })
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message })
  }
}
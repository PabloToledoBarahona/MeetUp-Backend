import Expense, { IExpense } from '../models/expense.model'

export const createExpense = async (eventId: string, data: Partial<IExpense>) => {
  const expense = new Expense({ ...data, event: eventId })
  await expense.save()
  return expense
}

export const getExpensesByEvent = async (eventId: string) => {
  return Expense.find({ event: eventId }).sort({ date: -1 })
}

export const getExpenseById = async (expenseId: string) => {
  return Expense.findById(expenseId)
}

export const updateExpense = async (expenseId: string, data: Partial<IExpense>) => {
  return Expense.findByIdAndUpdate(expenseId, data, { new: true })
}

export const deleteExpense = async (expenseId: string) => {
  return Expense.findByIdAndDelete(expenseId)
}

export const calculateSummary = async (event: any) => {
  const expenses = await Expense.find({ event: event._id })
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0)
  const percentageUsed = event.budget > 0 ? (totalSpent / event.budget) * 100 : 0
  const overBudget = totalSpent > event.budget
  const alertMessage = overBudget ? 'Presupuesto excedido' : undefined

  return { budget: event.budget, totalSpent, percentageUsed, overBudget, alertMessage }
}
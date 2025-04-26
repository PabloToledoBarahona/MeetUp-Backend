import Expense, { IExpense } from '../models/expense.model'

export const createExpense = async (data: Partial<IExpense>) => {
  const expense = new Expense(data)
  await expense.save()
  return expense
}

export const getExpensesByEvent = async (eventId: string) => {
  return Expense.find({ event: eventId })
}

export const deleteExpense = async (expenseId: string) => {
  return Expense.findByIdAndDelete(expenseId)
}

export const calculateFinancialSummary = async (eventId: string, budget: number) => {
  const expenses = await Expense.find({ event: eventId })
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0)
  const percentageUsed = budget > 0 ? (totalSpent / budget) * 100 : 0

  return { totalSpent, percentageUsed }
}
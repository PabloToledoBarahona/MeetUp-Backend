import { Router } from 'express'
import { authenticateToken } from '../middlewares/auth.middleware'
import {
  createExpense,
  listExpenses,
  getExpense,
  updateExpense,
  deleteExpense,
  getBudgetSummary
} from '../controllers/expense.controller'

const router = Router({ mergeParams: true })

router.post('/:eventId/expenses', authenticateToken, createExpense)
router.get('/:eventId/expenses', authenticateToken, listExpenses)
router.get('/:eventId/expenses/:expenseId', authenticateToken, getExpense)
router.patch('/:eventId/expenses/:expenseId', authenticateToken, updateExpense)
router.delete('/:eventId/expenses/:expenseId', authenticateToken, deleteExpense)

router.get('/:eventId/budget', authenticateToken, getBudgetSummary)

export default router
import { Router } from 'express'
import { authenticateToken } from '../middlewares/auth.middleware'
import { createExpense, listExpenses, deleteExpense, getFinancialSummary } from '../controllers/expense.controller'

const router = Router()

router.post('/', authenticateToken, createExpense)
router.get('/event/:eventId', authenticateToken, listExpenses)
router.delete('/:expenseId', authenticateToken, deleteExpense)
router.get('/summary/:eventId', authenticateToken, getFinancialSummary)

export default router
import { Schema, model, Document } from 'mongoose'

export interface IExpense extends Document {
  event: Schema.Types.ObjectId
  amount: number
  category: string
  description?: string
}

const expenseSchema = new Schema<IExpense>(
  {
    event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String }
  },
  { timestamps: true }
)

const Expense = model<IExpense>('Expense', expenseSchema)

export default Expense
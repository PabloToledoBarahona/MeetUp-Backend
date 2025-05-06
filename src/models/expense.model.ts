import { Schema, model, Document } from 'mongoose'

export interface IExpense extends Document {
  event: Schema.Types.ObjectId
  name: string
  amount: number
  category: string
  description?: string
  date: Date
}

const expenseSchema = new Schema<IExpense>(
  {
    event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
)

const Expense = model<IExpense>('Expense', expenseSchema)
export default Expense
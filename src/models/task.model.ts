import { Schema, model, Document, Types } from 'mongoose'

export interface ITask extends Document {
  title: string
  description?: string
  status: 'pending' | 'in_progress' | 'completed'
  event: Schema.Types.ObjectId
  assignedTo?: Types.ObjectId
}

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
    event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' } 
  },
  { timestamps: true }
)

const Task = model<ITask>('Task', taskSchema)

export default Task
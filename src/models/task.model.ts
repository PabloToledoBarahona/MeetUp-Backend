import { Schema, model, Document } from 'mongoose'

export interface ITask extends Document {
  title: string
  description?: string
  status: 'pending' | 'completed'
  event: Schema.Types.ObjectId
}

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    event: { type: Schema.Types.ObjectId, ref: 'Event', required: true }
  },
  { timestamps: true }
)

const Task = model<ITask>('Task', taskSchema)

export default Task
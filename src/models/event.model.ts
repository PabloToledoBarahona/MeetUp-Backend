import { Schema, model, Document } from 'mongoose'

export interface IEvent extends Document {
  name: string
  description?: string
  location: string
  category: string
  startTime: Date
  endTime: Date
  createdBy: Schema.Types.ObjectId
  isCancelled: boolean
  budget?: number
}

const eventSchema = new Schema<IEvent>(
  {
    name: { type: String, required: true },
    description: { type: String },
    location: { type: String, required: true },
    category: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isCancelled: { type: Boolean, default: false },
    budget: { type: Number } // 🔥
  },
  { timestamps: true }
)

const Event = model<IEvent>('Event', eventSchema)

export default Event
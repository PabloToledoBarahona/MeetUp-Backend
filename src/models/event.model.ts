import { Schema, model, Document, Types } from 'mongoose'

export interface IEvent extends Document {
  name: string
  description?: string
  location: string
  category: string
  startTime: Date
  endTime?: Date 
  imageUrl?: string 
  createdBy: Types.ObjectId
  isCancelled: boolean
  budget?: number
  collaborators?: Types.ObjectId[]
}

const eventSchema = new Schema<IEvent>(
  {
    name: { type: String, required: true },
    description: { type: String },
    location: { type: String, required: true },
    category: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date },
    imageUrl: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isCancelled: { type: Boolean, default: false },
    budget: { type: Number },
    collaborators: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
)

const Event = model<IEvent>('Event', eventSchema)

export default Event
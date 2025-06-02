import { Schema, model, Document } from 'mongoose'

interface CollaboratorInfo {
  id: string
  name: string
  email: string
}

export interface IEvent extends Document {
  name: string
  description?: string
  location: string
  category: string
  startTime: Date
  endTime?: Date 
  imageUrl?: string 
  createdBy: Schema.Types.ObjectId
  isCancelled: boolean
  budget?: number
  collaborators?: CollaboratorInfo[]
}

const collaboratorSchema = new Schema<CollaboratorInfo>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true }
  },
  { _id: false } // evitar crear _id para cada colaborador
)

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
    collaborators: [collaboratorSchema]
  },
  { timestamps: true }
)

const Event = model<IEvent>('Event', eventSchema)
export default Event
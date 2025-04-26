import { Schema, model, Document } from 'mongoose'

export interface IActivity extends Document {
  event: Schema.Types.ObjectId
  name: string
  description?: string
  location?: string
  startTime: Date
  endTime: Date
}

const activitySchema = new Schema<IActivity>(
  {
    event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    name: { type: String, required: true },
    description: { type: String },
    location: { type: String },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true }
  },
  { timestamps: true }
)

const Activity = model<IActivity>('Activity', activitySchema)

export default Activity
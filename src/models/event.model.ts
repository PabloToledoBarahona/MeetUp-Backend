import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  category: { type: String },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true })

export default mongoose.model('Event', eventSchema)
import mongoose from 'mongoose'

const guestSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'rejected'],
    default: 'pending'
  },
  invitationSent: { type: Boolean, default: false },
  lastReminderOn: { type: Date }
}, { timestamps: true })

export default mongoose.model('Guest', guestSchema)
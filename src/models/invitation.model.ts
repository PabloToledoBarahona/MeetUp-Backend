import mongoose from 'mongoose'

const invitationSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'declined', 'maybe'],
    default: 'pending'
  },
  invitedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  invitationSent: { type: Boolean, default: false },
  lastReminderOn: { type: Date }
}, { timestamps: true })

export default mongoose.model('Invitation', invitationSchema)
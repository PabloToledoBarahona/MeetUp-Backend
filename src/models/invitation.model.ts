import mongoose from 'mongoose'

const invitationSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'declined', 'maybe'],
    default: 'pending'
  },
  invitedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true })

export default mongoose.model('Invitation', invitationSchema)
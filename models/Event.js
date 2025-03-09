// models/Event.js
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  category: { type: String, enum: ['music', 'comedy', 'festival', 'food-and-drinks'], required: true },
  people: { type: Number, required: true },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt
});

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);

export default Event;

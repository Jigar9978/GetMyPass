import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema({
  userId: { 
    type: String, // Change from ObjectId to String
    required: true 
  },
  eventName: { type: String, required: true },
  eventDate: { type: String, required: true },
  eventLocation: { type: String, required: true },
  eventEnddate: { type: String, required: true },
  eventEndtime: { type: String, required: true },
  eventImage: { type: String, required: true },
  eventTime: { type: String, required: true },
  tickets: [
    {
      category: { type: String, required: true },
      count: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  paymentId: { type: String, required: true }
});

export default mongoose.models.Ticket || mongoose.model('Ticket', TicketSchema);

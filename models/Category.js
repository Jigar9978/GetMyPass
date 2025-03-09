import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
  type: { type: String, required: true },
  price: { type: String, required: true },
  contity: { type: Number, required: true },
  description: { type: String }
});

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: String, required: true },
  endDate: { type: String, required: true },
  endTime: { type: String, required: true },
  adddiscripition: { type: String },
  image: { type: String, required: true },
  tickets: [TicketSchema]
});

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String },
  image: { type: String },
  cards: [EventSchema]
});

export default mongoose.models.Category || mongoose.model("Category", CategorySchema);

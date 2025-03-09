import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema({
  type: String,
  price: Number,
  contity: Number,
  description: String,
});

const CardSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  image: String,
  price: Number,
  location: String,
  date: String,
  adddiscripition: String,
  endDate: String,
  endTime: String,
  tickets: [TicketSchema],
});

const CategoryCardSchema = new mongoose.Schema({
  category: String,
  cards: [CardSchema],
});

export default mongoose.models.CategoryCard || mongoose.model('CategoryCard', CategoryCardSchema);

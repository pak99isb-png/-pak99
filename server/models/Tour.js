import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true, enum: ['Northern Pakistan', 'International', 'Umrah', 'Customized'] },
  location: { type: String, required: true },
  duration: { type: String, required: true },
  pricePKR: { type: Number },
  couplePricePKR: { type: Number },
  originalPricePKR: { type: Number },
  departure: { type: String },
  rating: { type: Number, default: 5.0 },
  reviewsCount: { type: Number, default: 0 },
  image: { type: String, required: true },
  featured: { type: Boolean, default: false },
  popular: { type: Boolean, default: false },
  description: { type: String, required: true },
  highlights: [{ type: String }],
  inclusions: [{ type: String }],
  aboutInfo: { type: String },
  funFacts: [{ type: String }],
  seoTitle: { type: String },
  seoDescription: { type: String },
  seoKeywords: { type: String },
  itinerary: [{
    day: { type: Number, required: true },
    title: { type: String, required: true },
    detail: { type: String, required: true },
  }],
}, { timestamps: true });

const Tour = mongoose.model('Tour', tourSchema);
export default Tour;

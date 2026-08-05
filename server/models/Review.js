import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, default: 'Verified Google Review' },
  location: { type: String },
  rating: { type: Number, default: 5 },
  comment: { type: String, required: true },
  avatar: { type: String },
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);
export default Review;

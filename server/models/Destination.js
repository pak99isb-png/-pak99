import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  destinationId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  bestTime: { type: String, required: true },
  sliderImages: [{ type: String }],
  aboutInfo: { type: String, required: true },
  funFacts: [{ type: String }],
}, { timestamps: true });

const Destination = mongoose.model('Destination', destinationSchema);
export default Destination;

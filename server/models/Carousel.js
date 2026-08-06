import mongoose from 'mongoose';

const carouselSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  images: [{
    type: String
  }]
}, { timestamps: true });

export default mongoose.model('Carousel', carouselSchema);

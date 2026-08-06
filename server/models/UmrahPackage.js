import mongoose from 'mongoose';

const umrahPackageSchema = new mongoose.Schema({
  packageId: { type: String, required: true, unique: true },
  city: { type: String, required: true, enum: ['Lahore', 'Islamabad', 'Faisalabad', 'Multan'] },
  tier: { type: String, required: true, enum: ['Economy', 'Star'] },
  departureDate: { type: String, required: true },
  durationText: { type: String, required: true },
  flightRoute: { type: String, required: true },
  airline: { type: String, required: true },
  hotels: {
    makkah: { type: String, required: true },
    madinah: { type: String, required: true },
  },
  pricing: {
    sharing: { type: String },
    quad: { type: String },
    triple: { type: String },
    double: { type: String },
  },
  seatsAvailable: { type: Number },
  seoTitle: { type: String },
  seoDescription: { type: String },
  seoKeywords: { type: String },
}, { timestamps: true });

const UmrahPackage = mongoose.model('UmrahPackage', umrahPackageSchema);
export default UmrahPackage;

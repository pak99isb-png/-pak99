import mongoose from 'mongoose';

const insuranceServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  features: {
    type: [String],
    default: [],
  },
  buttonText: {
    type: String,
    required: true,
  },
  inquiryType: {
    type: String,
    required: true,
  }
}, { timestamps: true });

export default mongoose.models.InsuranceService || mongoose.model('InsuranceService', insuranceServiceSchema);

import mongoose from 'mongoose';

const visaApplicationSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true
  },
  referenceNumber: {
    type: String,
    required: [true, 'Reference number is required'],
    unique: true,
    trim: true,
    uppercase: true
  },
  passportNumber: {
    type: String,
    trim: true
  },
  visaType: {
    type: String,
    required: [true, 'Visa type is required'],
    trim: true
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    enum: ['Pending', 'Processing', 'Documents Submitted', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  expectedDate: {
    type: Date
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

const VisaApplication = mongoose.model('VisaApplication', visaApplicationSchema);

export default VisaApplication;

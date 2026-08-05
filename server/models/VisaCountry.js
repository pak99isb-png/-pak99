import mongoose from 'mongoose';

const visaCountrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  customUrl: { type: String },
  normalDocs: [{ type: String }],
  doneBaseDocs: [{ type: String }],
  note: { type: String },
  duration: { type: String },
  visaType: { type: String },
  normalCharges: { type: String },
  doneBaseCharges: { type: String },
  processingTime: { type: String },
}, { timestamps: true });

const VisaCountry = mongoose.model('VisaCountry', visaCountrySchema);
export default VisaCountry;

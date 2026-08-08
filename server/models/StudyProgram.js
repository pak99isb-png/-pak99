import mongoose from 'mongoose';

const studyItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String }, // e.g. "GraduationCap" for destinations
  funding: { type: String }, // for scholarships
  target: { type: String }, // for scholarships
  buttonText: { type: String }, // optional if each card needs a specific CTA
});

const studyProgramSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  pageType: { type: String, enum: ['destination', 'scholarship', 'attestation'], required: true },
  badgeText: { type: String },
  cardIcon: { type: String },
  title: { type: String, required: true },
  description: { type: String, required: true },
  ctaTitle: { type: String },
  ctaDescription: { type: String },
  ctaButtonText: { type: String },
  items: [studyItemSchema]
}, { timestamps: true });

export default mongoose.models.StudyProgram || mongoose.model('StudyProgram', studyProgramSchema);

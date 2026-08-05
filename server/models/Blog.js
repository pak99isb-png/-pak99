import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
  readTime: { type: String },
  image: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String },
  published: { type: Boolean, default: true },
  seoTitle: { type: String },
  seoDescription: { type: String },
  seoKeywords: { type: String },
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;

import './env.js';
import express from 'express';
import cors from 'cors';

import connectDB from './config/db.js';

// Models
import Tour from './models/Tour.js';
import UmrahPackage from './models/UmrahPackage.js';
import VisaCountry from './models/VisaCountry.js';
import Destination from './models/Destination.js';
import Blog from './models/Blog.js';
import Hotel from './models/Hotel.js';
import Review from './models/Review.js';
import Carousel from './models/Carousel.js';

// Routes
import authRoutes from './routes/auth.js';
import uploadRoutes from './routes/upload.js';
import createCrudRoutes from './routes/crudFactory.js';
import settingsRoutes from './routes/settings.js';



const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Ensure DB connection on every request for serverless environments
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Failed to connect to database in middleware:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/tours', createCrudRoutes(Tour, 'Tour'));
app.use('/api/umrah', createCrudRoutes(UmrahPackage, 'Umrah Package'));
app.use('/api/visas', createCrudRoutes(VisaCountry, 'Visa Country'));
app.use('/api/destinations', createCrudRoutes(Destination, 'Destination'));
app.use('/api/blogs', createCrudRoutes(Blog, 'Blog'));
app.use('/api/hotels', createCrudRoutes(Hotel, 'Hotel'));
app.use('/api/reviews', createCrudRoutes(Review, 'Review'));
app.use('/api/carousels', createCrudRoutes(Carousel, 'Carousel'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Pak99 Tours API is running 🚀' });
});

// Debug route
app.get('/api/debug', async (req, res) => {
  try {
    const mongoose = (await import('mongoose')).default;
    await mongoose.connect(process.env.MONGODB_URI);
    res.json({ 
      status: 'success', 
      message: 'Connected to MongoDB successfully!',
      uri_exists: !!process.env.MONGODB_URI,
      uri_start: process.env.MONGODB_URI ? process.env.MONGODB_URI.substring(0, 15) + '...' : 'none'
    });
  } catch (err) {
    res.json({ 
      status: 'error', 
      message: err.message, 
      name: err.name,
      uri_exists: !!process.env.MONGODB_URI
    });
  }
});

// Connect to MongoDB and start server if not running on Vercel
if (process.env.NODE_ENV !== 'production' || process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`🚀 Pak99 API Server running on http://localhost:${PORT}`);
    console.log(`🩺 API Health: http://localhost:${PORT}/api/health`);
  });
} else {
  // If on Vercel, the global middleware handles the DB connection
}

export default app;

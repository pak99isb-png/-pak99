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

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Pak99 Tours API is running 🚀' });
});

// Connect to MongoDB and start server if not running on Vercel
if (process.env.NODE_ENV !== 'production' || process.env.VERCEL !== '1') {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Pak99 API Server running on http://localhost:${PORT}`);
      console.log(`🩺 API Health: http://localhost:${PORT}/api/health`);
    });
  }).catch((err) => {
    console.error('Failed to start server:', err);
  });
} else {
  // If on Vercel, just connect DB (Vercel will handle listening)
  connectDB().catch(console.error);
}

export default app;

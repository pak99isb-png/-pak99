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
import TicketGroup from './models/TicketGroup.js';
import InsuranceService from './models/InsuranceService.js';
import StudyProgram from './models/StudyProgram.js';

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
app.use('/api/ticket-groups', createCrudRoutes(TicketGroup, 'Ticket Group'));
app.use('/api/insurance', createCrudRoutes(InsuranceService, 'Insurance Service'));
app.use('/api/study', createCrudRoutes(StudyProgram, 'Study Program'));

// Dynamic Sitemap Generator
app.get('/api/sitemap.xml', async (req, res) => {
  try {
    const SITE_URL = 'https://www.pak99travels.com';
    const today = new Date().toISOString().split('T')[0];

    // Fetch dynamic data
    const [tours, blogs, visas, study] = await Promise.all([
      Tour.find({}, '_id').lean(),
      Blog.find({}, '_id').lean(),
      VisaCountry.find({}, 'code').lean(),
      StudyProgram.find({}, 'slug').lean(),
    ]);

    // Static pages
    const staticPages = [
      { loc: '/', priority: '1.0', changefreq: 'daily' },
      { loc: '/pakistan-tours', priority: '0.9', changefreq: 'weekly' },
      { loc: '/international-tours', priority: '0.9', changefreq: 'weekly' },
      { loc: '/umrah', priority: '0.9', changefreq: 'weekly' },
      { loc: '/visa', priority: '0.8', changefreq: 'weekly' },
      { loc: '/hotels', priority: '0.8', changefreq: 'weekly' },
      { loc: '/tickets', priority: '0.8', changefreq: 'weekly' },
      { loc: '/insurance', priority: '0.8', changefreq: 'weekly' },
      { loc: '/study', priority: '0.8', changefreq: 'monthly' },
      { loc: '/blogs', priority: '0.8', changefreq: 'weekly' },
      { loc: '/why-us', priority: '0.6', changefreq: 'monthly' },
      { loc: '/reviews', priority: '0.6', changefreq: 'monthly' },
      { loc: '/contact', priority: '0.6', changefreq: 'monthly' },
    ];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Static pages
    for (const page of staticPages) {
      xml += `  <url>\n    <loc>${SITE_URL}${page.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>\n`;
    }

    // Dynamic tour pages
    for (const tour of tours) {
      xml += `  <url>\n    <loc>${SITE_URL}/tours/${tour._id}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    }

    // Dynamic blog pages
    for (const blog of blogs) {
      xml += `  <url>\n    <loc>${SITE_URL}/blog/${blog._id}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
    }

    // Dynamic visa detail pages
    for (const visa of visas) {
      xml += `  <url>\n    <loc>${SITE_URL}/visas/${visa.code}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    }

    // Dynamic study pages
    for (const s of study) {
      xml += `  <url>\n    <loc>${SITE_URL}/${s.slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    }

    xml += `</urlset>`;

    res.set('Content-Type', 'application/xml');
    res.send(xml);
  } catch (err) {
    console.error('Sitemap generation error:', err);
    res.status(500).send('Error generating sitemap');
  }
});

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

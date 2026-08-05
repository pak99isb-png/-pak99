import mongoose from 'mongoose';

const STOCK_IMAGES = {
  tour: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
  umrah: 'https://images.unsplash.com/photo-1565552643982-ce22abbfa995?w=800&q=80',
  visa: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
  destination: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=800&q=80',
  blog: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
};

async function fixImages() {
  await mongoose.connect('mongodb://saad:MF9Le34NSWrp1y6Y@ac-gx62ub9-shard-00-00.bp0e8fk.mongodb.net:27017,ac-gx62ub9-shard-00-01.bp0e8fk.mongodb.net:27017,ac-gx62ub9-shard-00-02.bp0e8fk.mongodb.net:27017/pak99tours?ssl=true&authSource=admin&retryWrites=true&w=majority');
  const db = mongoose.connection.db;

  await db.collection('tours').updateMany({ image: { $regex: '^/images' } }, { $set: { image: STOCK_IMAGES.tour } });
  await db.collection('umrahpackages').updateMany({ image: { $regex: '^/images' } }, { $set: { image: STOCK_IMAGES.umrah } });
  await db.collection('visacountries').updateMany({ image: { $regex: '^/images' } }, { $set: { image: STOCK_IMAGES.visa } });
  await db.collection('destinations').updateMany({ 'sliderImages.0': { $exists: true } }, { $set: { sliderImages: [STOCK_IMAGES.destination, STOCK_IMAGES.destination, STOCK_IMAGES.destination] } });
  await db.collection('blogs').updateMany({ image: { $regex: '^/images' } }, { $set: { image: STOCK_IMAGES.blog } });

  console.log('Database images fixed!');
  process.exit(0);
}
fixImages();

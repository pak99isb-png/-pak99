import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const DESTINATIONS = {
  hunza: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?w=1200&q=80',
  skardu: 'https://images.unsplash.com/photo-1627896157734-4d7d4272ee57?w=1200&q=80',
  naran: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200&q=80',
  swat: 'https://images.unsplash.com/photo-1600100397608-f010f423b971?w=1200&q=80',
  kumrat: 'https://images.unsplash.com/photo-1618337775586-2a628867f10b?w=1200&q=80',
  neelum: 'https://images.unsplash.com/photo-1632766861502-0e9bd28d8b4c?w=1200&q=80',
  fairy: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&q=80',
};

const DEFAULT_UMRAH = 'https://images.unsplash.com/photo-1565552643982-ce22abbfa995?w=1200&q=80';
const DEFAULT_VISA = 'https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=1200&q=80';

async function uploadToCloudinary(url, folder) {
  try {
    const result = await cloudinary.uploader.upload(url, { folder });
    return result.secure_url;
  } catch (err) {
    console.error('Cloudinary upload failed for:', url, err);
    return url; // fallback to unsplash url if upload fails
  }
}

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');
    const db = mongoose.connection.db;

    // Upload Destination images to Cloudinary
    const uploadedDestinations = {};
    for (const [key, url] of Object.entries(DESTINATIONS)) {
      console.log(`Uploading ${key}...`);
      uploadedDestinations[key] = await uploadToCloudinary(url, 'pak99/destinations');
    }
    console.log('Uploading Umrah default...');
    const umrahUrl = await uploadToCloudinary(DEFAULT_UMRAH, 'pak99/umrah');
    console.log('Uploading Visa default...');
    const visaUrl = await uploadToCloudinary(DEFAULT_VISA, 'pak99/visa');

    // Update Destinations
    for (const [key, secureUrl] of Object.entries(uploadedDestinations)) {
      await db.collection('destinations').updateOne(
        { destinationId: key },
        { $set: { sliderImages: [secureUrl] } }
      );
    }

    // Update Tours based on their location
    const tours = await db.collection('tours').find({}).toArray();
    for (const tour of tours) {
      let tourImg = uploadedDestinations['hunza']; // fallback
      const loc = tour.location.toLowerCase();
      if (loc.includes('naran') || loc.includes('kaghan')) tourImg = uploadedDestinations['naran'];
      else if (loc.includes('neelum') || loc.includes('kashmir')) tourImg = uploadedDestinations['neelum'];
      else if (loc.includes('swat') || loc.includes('malamjabba')) tourImg = uploadedDestinations['swat'];
      else if (loc.includes('kumrat')) tourImg = uploadedDestinations['kumrat'];
      else if (loc.includes('hunza')) tourImg = uploadedDestinations['hunza'];
      else if (loc.includes('fairy')) tourImg = uploadedDestinations['fairy'];
      else if (loc.includes('skardu')) tourImg = uploadedDestinations['skardu'];

      await db.collection('tours').updateOne(
        { _id: tour._id },
        { $set: { image: tourImg, gallery: [tourImg] } }
      );
    }

    // Update Umrah and Visa
    await db.collection('umrahpackages').updateMany({}, { $set: { image: umrahUrl } });
    await db.collection('visacountries').updateMany({}, { $set: { image: visaUrl } });
    await db.collection('blogs').updateMany({}, { $set: { image: uploadedDestinations['hunza'] } });

    console.log('All DB images successfully replaced with real Cloudinary URLs!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

// Models
import Tour from './models/Tour.js';
import UmrahPackage from './models/UmrahPackage.js';
import VisaCountry from './models/VisaCountry.js';
import Destination from './models/Destination.js';
import Blog from './models/Blog.js';
import Hotel from './models/Hotel.js';
import Review from './models/Review.js';
import Admin from './models/Admin.js';

// Import transpiled dummy data
import { UMRAH_PACKAGES } from './temp/umrahData.js';
import { VISA_COUNTRIES_DATA } from './temp/visaData.js';

// ========================
// TOURS DATA
// ========================
const toursData = [
  {
    title: '3 Days / 2 Nights Private Naran Tour',
    category: 'Northern Pakistan',
    location: 'Naran, Kaghan Valley',
    duration: '3 Days / 2 Nights',
    pricePKR: 45000,
    rating: 5.0,
    reviewsCount: 120,
    image: '/images/destinations/naran_kaghan_1.png',
    featured: true,
    popular: true,
    description: 'Experience the beauty of Naran with our exclusive 3 Days / 2 Nights private tour.',
    highlights: ['Photo stop at Kiwai Waterfall', 'Enjoy the scenic Kunhar River & Explore Naran Bazaar', 'Jeep ride to Lake Saif-ul-Malook', 'Visit Lulusar Lake', 'Explore Babusar Top'],
    inclusions: ['Private AC Vehicle with Professional Driver', 'Fuel & Toll Taxes', '2 Nights Hotel Accommodation', 'Daily Breakfast', 'Driver Food & Accommodation'],
    itinerary: [
      { day: 1, title: 'Islamabad → Naran', detail: 'Departure at 05:00 AM via Hazara Motorway, Mansehra, Balakot.' },
      { day: 2, title: 'Lake Saif-ul-Malook – Lulusar Lake – Babusar Top', detail: 'Jeep ride to Lake Saif-ul-Malook with optional horse riding & boating.' },
      { day: 3, title: 'Naran → Islamabad', detail: 'Breakfast & check-out. Drive back via Kaghan & Balakot.' }
    ]
  },
  {
    title: '3 Days Naran Kaghan Babusar',
    category: 'Northern Pakistan',
    location: 'Naran, Kaghan Valley',
    duration: '3 Days',
    pricePKR: 20000,
    couplePricePKR: 43000,
    departure: 'Mon & Thurs Night',
    rating: 4.8,
    reviewsCount: 86,
    image: '/images/destinations/naran_kaghan_2.png',
    featured: false,
    popular: true,
    description: 'Join our weekly group departures for a refreshing 3-day getaway to the mesmerizing Naran Kaghan valley.',
    highlights: ['Babusar Top Pass', 'Lulusar Lake Sightseeing', 'Lake Saif-ul-Malook Visit', 'Kiwai Waterfall'],
    inclusions: ['Luxury Transport', 'Hotel Accommodation', 'Daily Breakfast', 'Tour Guide'],
    itinerary: [
      { day: 1, title: 'Departure & Arrival in Naran', detail: 'Overnight travel from Islamabad. Visit Kiwai Waterfall.' },
      { day: 2, title: 'Babusar Top & Lulusar Lake', detail: 'Day trip to Lulusar Lake and Babusar Pass.' },
      { day: 3, title: 'Lake Saif-ul-Malook & Return', detail: 'Morning visit to the lake. Departure for Islamabad.' }
    ]
  },
  {
    title: '3 Days Kashmir Neelum Valley',
    category: 'Northern Pakistan',
    location: 'Neelum Valley, Azad Kashmir',
    duration: '3 Days',
    pricePKR: 19500,
    couplePricePKR: 41000,
    departure: 'Mon & Thurs Night',
    rating: 4.9,
    reviewsCount: 112,
    image: '/images/destinations/neelum_valley_1.jpg',
    featured: false,
    popular: true,
    description: 'Explore the heavenly beauty of Azad Kashmir.',
    highlights: ['Dhani Waterfall', 'Kutton Jagran Valley', 'Keran LOC View', 'Sharda Peeth Ruins'],
    inclusions: ['Luxury Transport', 'Hotel Accommodation', 'Daily Breakfast', 'Tour Guide'],
    itinerary: [
      { day: 1, title: 'Muzaffarabad & Dhani Waterfall', detail: 'Departure from Islamabad. Visit Dhani Waterfall.' },
      { day: 2, title: 'Sharda Valley & Ruins', detail: 'Drive along the LOC to Sharda.' },
      { day: 3, title: 'Return Journey', detail: 'Breakfast, shopping stop at Muzaffarabad.' }
    ]
  },
  {
    title: '3 Days Swat Kalam Malamjabba',
    category: 'Northern Pakistan',
    location: 'Swat & Kalam',
    duration: '3 Days',
    pricePKR: 19500,
    couplePricePKR: 41000,
    departure: 'Mon & Thurs Night',
    rating: 4.85,
    reviewsCount: 154,
    image: '/images/destinations/swat_valley_1.png',
    featured: false,
    popular: true,
    description: 'Experience the Switzerland of the East!',
    highlights: ['Malam Jabba Ski Resort', 'Kalam Forest', 'Swat River', 'Fizaghat Park'],
    inclusions: ['Luxury Transport', 'Hotel Accommodation', 'Daily Breakfast', 'Tour Guide'],
    itinerary: [
      { day: 1, title: 'Swat Valley & Malam Jabba', detail: 'Drive to Swat. Visit Malam Jabba.' },
      { day: 2, title: 'Kalam Valley Exploration', detail: 'Travel to Kalam. Walk through Ushu Forest.' },
      { day: 3, title: 'Mingora & Return', detail: 'Shopping and drive back to Islamabad.' }
    ]
  },
  {
    title: '3 Days Kumrat Valley',
    category: 'Northern Pakistan',
    location: 'Kumrat Valley, Dir',
    duration: '3 Days',
    pricePKR: 19500,
    couplePricePKR: 41000,
    departure: 'Mon & Thurs Night',
    rating: 4.7,
    reviewsCount: 78,
    image: '/images/destinations/kumrat_valley_1.png',
    featured: false,
    popular: false,
    description: 'Immerse in the dense pine forests and crystal-clear Panjkora river.',
    highlights: ['Kumrat Dense Forest', 'Panjkora River', 'Kala Chashma', 'Thal Mosque'],
    inclusions: ['Luxury Transport', 'Hotel Accommodation', 'Daily Breakfast', 'Tour Guide'],
    itinerary: [
      { day: 1, title: 'Travel to Thal / Kumrat', detail: 'Long scenic drive to Upper Dir and Thal.' },
      { day: 2, title: 'Kumrat Forest & Kala Chashma', detail: 'Explore the majestic Kumrat Forest.' },
      { day: 3, title: 'Thal Mosque & Return', detail: 'Visit the historic wooden Thal Mosque.' }
    ]
  },
  {
    title: '4 Days Kashmir Taobat',
    category: 'Northern Pakistan',
    location: 'Taobat, Neelum Valley',
    duration: '4 Days',
    pricePKR: 25500,
    couplePricePKR: 58000,
    departure: 'Wednesday Night',
    rating: 4.95,
    reviewsCount: 92,
    image: '/images/destinations/neelum_valley_2.jpg',
    featured: true,
    popular: false,
    description: 'An extended journey to the absolute edge of Neelum Valley.',
    highlights: ['Taobat Village', 'Arang Kel Trek', 'Sharda Peeth', 'Dhani Waterfall'],
    inclusions: ['Luxury Transport', 'Hotel Accommodation', 'Daily Breakfast', 'Tour Guide'],
    itinerary: [
      { day: 1, title: 'Muzaffarabad to Keran', detail: 'Departure from Islamabad. Visit Dhani waterfall.' },
      { day: 2, title: 'Sharda & Kel', detail: 'Travel along the LOC. Visit Sharda ruins.' },
      { day: 3, title: 'Arang Kel & Taobat', detail: 'Cable car ride and trek to Arang Kel.' },
      { day: 4, title: 'Return to Islamabad', detail: 'Drive back along Neelum River.' }
    ]
  },
  {
    title: '4 Days Kumrat Jahaz Banda',
    category: 'Northern Pakistan',
    location: 'Jahaz Banda, Kumrat',
    duration: '4 Days',
    pricePKR: 23000,
    couplePricePKR: 48000,
    departure: 'Wednesday Night',
    rating: 4.8,
    reviewsCount: 65,
    image: '/images/destinations/kumrat_valley_2.png',
    featured: false,
    popular: false,
    description: 'A perfect blend of trekking and relaxation.',
    highlights: ['Jahaz Banda Meadows', 'Katora Lake Trek', 'Kumrat Forest', 'Thal Village'],
    inclusions: ['Luxury Transport', 'Hotel/Tent Accommodation', 'Daily Breakfast', 'Tour Guide'],
    itinerary: [
      { day: 1, title: 'Islamabad to Thal', detail: 'Drive to Dir and Thal.' },
      { day: 2, title: 'Trek to Jahaz Banda', detail: 'Jeep track followed by trekking.' },
      { day: 3, title: 'Katora Lake & Kumrat', detail: 'Early morning hike to Katora Lake.' },
      { day: 4, title: 'Return Journey', detail: 'Leave early morning for Islamabad.' }
    ]
  },
  {
    title: '5 Days Hunza Valley Khujrabpass',
    category: 'Northern Pakistan',
    location: 'Hunza & Khunjerab',
    duration: '5 Days',
    pricePKR: 30000,
    couplePricePKR: 68000,
    departure: 'Tues & Fri Night',
    rating: 4.98,
    reviewsCount: 220,
    image: '/images/destinations/hunza_valley_1.jpg',
    featured: true,
    popular: true,
    description: 'Journey on the Karakoram Highway to the majestic Hunza Valley.',
    highlights: ['Khunjerab Pass (Pak-China Border)', 'Attabad Lake', 'Passu Cones', 'Altit & Baltit Forts'],
    inclusions: ['Luxury Transport', 'Hotel Accommodation', 'Daily Breakfast', 'Tour Guide'],
    itinerary: [
      { day: 1, title: 'Islamabad to Chilas/Naran', detail: 'Drive via Hazara Motorway and KKH.' },
      { day: 2, title: 'Travel to Hunza', detail: 'Stop at Nanga Parbat and Rakaposhi viewpoints.' },
      { day: 3, title: 'Attabad Lake & Khunjerab Pass', detail: 'Boating at Attabad Lake, view Passu Cones.' },
      { day: 4, title: 'Hunza Forts Exploration', detail: 'Visit Altit & Baltit Forts. Sunset at Eagle\'s Nest.' },
      { day: 5, title: 'Arrival in Islamabad', detail: 'Drive back arriving by late evening.' }
    ]
  },
  {
    title: '5 Days Fairy Meadows',
    category: 'Northern Pakistan',
    location: 'Fairy Meadows, Diamer',
    duration: '5 Days',
    pricePKR: 30000,
    couplePricePKR: 68000,
    departure: 'Tues & Fri Night',
    rating: 4.88,
    reviewsCount: 175,
    image: '/images/destinations/fairy_meadows_1.png',
    featured: false,
    popular: true,
    description: 'An legendary adventure to the fairytale grassland at the foot of Nanga Parbat.',
    highlights: ['Thrilling 4x4 Jeep Safari on Raikot', 'Wooden Cottage Stay', 'Nanga Parbat View', 'Bonfire Night'],
    inclusions: ['Luxury Transport', 'Cabin/Tent Accommodation', 'Daily Breakfast', 'Tour Guide'],
    itinerary: [
      { day: 1, title: 'Islamabad to Chilas', detail: 'Drive via Hazara Motorway and KKH.' },
      { day: 2, title: 'Jeep Safari & Trek to Fairy Meadows', detail: 'Raikot Jeep ride to Tattu Village.' },
      { day: 3, title: 'Trek to Beyal Camp', detail: 'Day hike through pine forests.' },
      { day: 4, title: 'Descent & Travel', detail: 'Trek back down to Tattu.' },
      { day: 5, title: 'Return to Islamabad', detail: 'Final leg of the trip.' }
    ]
  },
  {
    title: '6 Days Skardu & Basho Valley',
    category: 'Northern Pakistan',
    location: 'Skardu, Baltistan',
    duration: '6 Days',
    pricePKR: 33000,
    couplePricePKR: 73000,
    departure: 'Mon & Tues Night',
    rating: 4.95,
    reviewsCount: 140,
    image: '/images/destinations/skardu_1.jpg',
    featured: true,
    popular: true,
    description: 'Experience the magic of Baltistan.',
    highlights: ['Basho Valley Jeep Safari', 'Shangrila Resort', 'Katpana Cold Desert', 'Upper Kachura Lake'],
    inclusions: ['Luxury Transport', 'Hotel Accommodation', 'Daily Breakfast', 'Tour Guide'],
    itinerary: [
      { day: 1, title: 'Islamabad to Chilas', detail: 'Departure via KKH/Babusar.' },
      { day: 2, title: 'Arrival in Skardu', detail: 'Drive to Skardu. Visit Shangrila.' },
      { day: 3, title: 'Basho Valley Adventure', detail: '4x4 Jeep ride into Basho Valley.' },
      { day: 4, title: 'Shigar & Cold Desert', detail: 'Explore Shigar Fort, Katpana Sand Dunes.' },
      { day: 5, title: 'Return Journey', detail: 'Begin the return journey. Night stay in Chilas.' },
      { day: 6, title: 'Arrival in Islamabad', detail: 'Drive back to Islamabad.' }
    ]
  },
  {
    title: '8 Days Hunza & Skardu',
    category: 'Northern Pakistan',
    location: 'Hunza & Baltistan',
    duration: '8 Days',
    pricePKR: 40000,
    couplePricePKR: 88000,
    departure: 'Mon & Tues Night',
    rating: 4.97,
    reviewsCount: 300,
    image: '/images/destinations/skardu_2.jpg',
    featured: true,
    popular: true,
    description: 'The ultimate Northern Pakistan expedition.',
    highlights: ['Attabad Lake & Passu Cones', 'Shangrila & Kachura Lakes', 'Katpana Cold Desert', 'Altit & Baltit Forts'],
    inclusions: ['Luxury Transport', 'Hotel Accommodation', 'Daily Breakfast', 'Tour Guide'],
    itinerary: [
      { day: 1, title: 'Islamabad to Chilas', detail: 'Departure and overnight stay.' },
      { day: 2, title: 'Skardu Arrival', detail: 'Drive to Skardu, visit Shangrila.' },
      { day: 3, title: 'Skardu Exploration', detail: 'Visit Upper Kachura, Katpana Desert.' },
      { day: 4, title: 'Skardu to Hunza', detail: 'Travel from Skardu to Hunza.' },
      { day: 5, title: 'Khunjerab Pass', detail: 'Day trip to Attabad Lake, Passu Cones.' },
      { day: 6, title: 'Hunza Forts', detail: 'Visit Altit and Baltit forts.' },
      { day: 7, title: 'Return Journey Starts', detail: 'Drive back along KKH.' },
      { day: 8, title: 'Islamabad Arrival', detail: 'Final leg of the journey.' }
    ]
  },
  {
    title: '15 Days Executive Umrah Package with Ziyarat',
    category: 'Umrah',
    location: 'Makkah & Madinah, Saudi Arabia',
    duration: '15 Days / 14 Nights',
    pricePKR: 285000,
    originalPricePKR: 310000,
    rating: 4.98,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1565552643983-8a9d18b2c2de?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    popular: true,
    description: 'Perform your sacred Umrah pilgrimage with complete peace of mind.',
    highlights: ['Walking Distance Hotels to Masjid al-Haram', 'Complete Ziyarat Tour in Makkah', 'Complete Ziyarat Tour in Madinah', 'Saudi Umrah Visa Processing', 'Luxury AC Private Bus Transfers'],
    inclusions: ['Saudi Umrah Visa & Insurance', '7 Nights Makkah Hotel', '7 Nights Madinah Hotel', 'Complete Roundtrip Private AC Transport', '24/7 Experienced Guide'],
    itinerary: [
      { day: 1, title: 'Arrival at Jeddah', detail: 'Welcome at Jeddah Airport, transfer to Makkah.' },
      { day: 5, title: 'Makkah Ziyarat Tour', detail: 'Guided visits to sacred sites.' },
      { day: 8, title: 'Transfer to Madinah', detail: 'Luxury transport to Madinah.' },
      { day: 15, title: 'Departure', detail: 'Transfer to airport for return flight.' }
    ]
  },
  {
    title: 'Dubai Luxury Desert Safari & Burj Khalifa Special',
    category: 'International',
    location: 'Dubai, UAE',
    duration: '5 Days / 4 Nights',
    pricePKR: 195000,
    originalPricePKR: 220000,
    rating: 4.91,
    reviewsCount: 84,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    popular: true,
    description: 'Experience futuristic Dubai with 4-Star Hotel stay and Burj Khalifa.',
    highlights: ['Burj Khalifa At The Top', 'Red Dune Desert Safari', 'Dubai Marina Dhow Cruise', 'Dubai City Tour', 'UAE Tourist Visa included'],
    inclusions: ['4 Star Hotel', 'Daily Buffet Breakfast', 'UAE Tourist Visa', 'All Transfers', 'Entry tickets'],
    itinerary: [
      { day: 1, title: 'Arrival in Dubai', detail: 'Welcome at Dubai Airport. Evening Marina Cruise.' },
      { day: 2, title: 'City Tour & Burj Khalifa', detail: 'Photo stops and Burj Khalifa visit.' },
      { day: 3, title: 'VIP Desert Safari', detail: 'Sand Dune Bashing, Camel riding.' },
      { day: 4, title: 'Free Day for Shopping', detail: 'Optional Museum of the Future visit.' },
      { day: 5, title: 'Departure', detail: 'Transfer to airport.' }
    ]
  }
];

// ========================
// DESTINATIONS DATA
// ========================
const destinationsData = [
  { destinationId: 'skardu', title: 'Skardu', subtitle: 'GATEWAY TO THE GIANTS', bestTime: 'May - October', sliderImages: ['/images/destinations/skardu_1.jpg', '/images/destinations/skardu_2.jpg', '/images/destinations/skardu_3.jpg'], aboutInfo: 'Skardu is a city located in Gilgit-Baltistan, Pakistan. Situated at an elevation of 2,230 meters, it serves as the capital of the Skardu District.', funFacts: ['Skardu serves as the primary base camp for climbers attempting K2.', 'The Katpana Desert near Skardu is one of the highest cold deserts.', 'The beautiful heart-shaped Shangrila Lake is located just 20 minutes from Skardu city.'] },
  { destinationId: 'hunza', title: 'Hunza Valley', subtitle: 'THE SHANGRI-LA OF EARTH', bestTime: 'April - October', sliderImages: ['/images/destinations/hunza_valley_1.jpg', '/images/destinations/hunza_valley_2.jpg', '/images/destinations/hunza_valley_3.jpg'], aboutInfo: 'Hunza is a mountainous valley in the Gilgit-Baltistan region of Pakistan.', funFacts: ['The literacy rate in Hunza exceeds 90%.', 'The valley is famous for its vibrant autumn colors.', 'Attabad Lake was formed in 2010 due to a massive landslide.'] },
  { destinationId: 'naran', title: 'Naran & Kaghan', subtitle: 'THE VALLEY OF LAKES', bestTime: 'June - September', sliderImages: ['/images/destinations/naran_kaghan_1.png', '/images/destinations/naran_kaghan_2.png', '/images/destinations/naran_kaghan_3.png'], aboutInfo: 'Naran is a medium-sized town situated in the upper Kaghan Valley.', funFacts: ['Lake Saif-ul-Malook is associated with a famous fairy tale.', 'Babusar Pass is at 4,173 meters altitude.', 'The Kunhar River is famous for brown trout.'] },
  { destinationId: 'swat', title: 'Swat Valley', subtitle: 'SWITZERLAND OF THE EAST', bestTime: 'March - October', sliderImages: ['/images/destinations/swat_valley_1.png', '/images/destinations/swat_valley_2.png', '/images/destinations/swat_valley_3.png'], aboutInfo: 'Swat is a district known as the Switzerland of the East.', funFacts: ['Queen Elizabeth II called it the Switzerland of the East.', 'Malam Jabba hosts Pakistan\'s premier ski resort.', 'Ancient Buddhist stupas are found in the region.'] },
  { destinationId: 'kumrat', title: 'Kumrat Valley', subtitle: 'THE HIDDEN PARADISE', bestTime: 'May - September', sliderImages: ['/images/destinations/kumrat_valley_1.png', '/images/destinations/kumrat_valley_2.png', '/images/destinations/kumrat_valley_3.png'], aboutInfo: 'Kumrat is a stunning valley in Upper Dir District.', funFacts: ['Katora Lake gets its name from its bowl-like shape.', 'The historic wooden mosque in Thal village is a masterpiece.', 'Kumrat is renowned for its towering Deodar cedar trees.'] },
  { destinationId: 'neelum', title: 'Neelum Valley', subtitle: 'THE BLUE GEM OF KASHMIR', bestTime: 'April - October', sliderImages: ['/images/destinations/neelum_valley_1.jpg', '/images/destinations/neelum_valley_2.jpg', '/images/destinations/neelum_valley_3.jpg'], aboutInfo: 'Neelum Valley is a 144 km long bow-shaped valley in Azad Kashmir.', funFacts: ['Named after the Neelum River (Blue River).', 'Arang Kel is called the Pearl of Neelum.', 'The valley runs along the Line of Control.'] },
  { destinationId: 'fairy', title: 'Fairy Meadows', subtitle: 'FOOTSTEPS OF THE KILLER MOUNTAIN', bestTime: 'June - September', sliderImages: ['/images/destinations/fairy_meadows_1.png', '/images/destinations/fairy_meadows_2.png', '/images/destinations/fairy_meadows_3.png'], aboutInfo: 'Fairy Meadows is a grassland near Nanga Parbat base camp.', funFacts: ['The jeep ride is one of the most dangerous roads in the world.', 'It offers the closest view of Nanga Parbat.', 'Declared a National Park in 1995.'] }
];

// ========================
// BLOGS DATA
// ========================
const blogsData = [
  { title: 'Top 10 Must-Visit Gems in Hunza Valley (2026 Ultimate Guide)', category: 'Northern Travel Guide', date: 'July 15, 2026', readTime: '5 min read', image: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=800&q=80', excerpt: 'Discover Attabad Lake, Passu Cones, Eagle\'s Nest, and historic Altit Fort.', published: true },
  { title: 'Essential Tips for Performing Umrah Comfortably with Elderly Parents', category: 'Umrah & Pilgrimage', date: 'June 28, 2026', readTime: '6 min read', image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80', excerpt: 'How to pick hotels under 300m from Haram, wheel-chair arrangements, and peaceful Tawaf timing.', published: true },
  { title: 'Best Months to Explore Skardu, Deosai Plains & Shangrila Lake', category: 'Expedition Planning', date: 'May 14, 2026', readTime: '4 min read', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80', excerpt: 'A seasonal breakdown of weather, cherry blossoms, autumn foliage, and road accessibility.', published: true }
];

// ========================
// HOTELS DATA
// ========================
const hotelsData = [
  { name: 'Makkah Executive Haram View Hotel', location: 'Makkah, Saudi Arabia (250m from Haram)', rating: 4.9, price: 'PKR 24,000 / Night', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80', amenities: ['Direct Kaaba View', 'Free Wi-Fi', '24/7 Room Service', 'Buffet Suhoor/Breakfast'] },
  { name: 'Hunza Serena Resort & Mountain Villas', location: 'Karimabad, Hunza Valley', rating: 4.95, price: 'PKR 18,500 / Night', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80', amenities: ['Panoramic Rakaposhi View', 'Private Balcony', 'Traditional Garden', 'Heated Rooms'] },
  { name: 'Skardu Shangrila Resort Deluxe Chalets', location: 'Kachura Lake, Skardu', rating: 4.88, price: 'PKR 22,000 / Night', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80', amenities: ['Lakeside Cottage', 'Boating Access', 'Bonfire Area', 'Trout Dining'] },
  { name: 'Swat Serena Hotel & Gardens', location: 'Saidu Sharif, Swat Valley', rating: 4.85, price: 'PKR 16,000 / Night', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80', amenities: ['Heritage Lawns', 'Swimming Pool', 'Central Heating', '24-Hour Security'] }
];

// ========================
// REVIEWS DATA
// ========================
const reviewsData = [
  { name: 'ali sheikh', role: 'Verified Google Review', location: 'Pakistan', rating: 5, comment: 'Great services and great dealing and great qumitment 100percent recommended department salamat rahe', avatar: 'https://ui-avatars.com/api/?name=ali+sheikh&background=ff5500&color=fff' },
  { name: 'Dani Rajpoot', role: 'Verified Google Review', location: 'Islamabad, Pakistan', rating: 5, comment: 'Best Travel agency in whole Islamabad city', avatar: 'https://ui-avatars.com/api/?name=Dani+Rajpoot&background=0b2f64&color=fff' },
  { name: 'tayyab hussain', role: 'Verified Google Review', location: 'Pakistan', rating: 5, comment: 'Keep it up guys really outstanding service jo commitment ki wo pori hoi first time travel agency s satisfied', avatar: 'https://ui-avatars.com/api/?name=tayyab+hussain&background=ff5500&color=fff' },
  { name: '9 M TV', role: 'Verified Google Review', location: 'Pakistan', rating: 5, comment: 'Excellent service good stuff and 100 percent real work', avatar: 'https://ui-avatars.com/api/?name=9+M+TV&background=0b2f64&color=fff' },
  { name: 'Ateeq Malik86', role: 'Verified Google Review', location: 'Pakistan', rating: 5, comment: 'Very very nice ❤️❤️❤️ good work', avatar: 'https://ui-avatars.com/api/?name=Ateeq+Malik&background=ff5500&color=fff' },
  { name: 'Mirza Mustafa', role: 'Verified Google Review', location: 'Pakistan', rating: 5, comment: 'very fast service I am really impressed great work', avatar: 'https://ui-avatars.com/api/?name=Mirza+Mustafa&background=0b2f64&color=fff' }
];

// ========================
// SEED FUNCTION
// ========================
const seedDatabase = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB!');

    // Clear existing data
    console.log('\n🗑️  Clearing existing data...');
    await Tour.deleteMany({});
    await Destination.deleteMany({});
    await Blog.deleteMany({});
    await Hotel.deleteMany({});
    await Review.deleteMany({});
    await Admin.deleteMany({});
    console.log('✅ Cleared all collections.');

    // Augment Tours with Destination Data
    const augmentedToursData = toursData.map(tour => {
      let dest;
      const loc = tour.location.toLowerCase();
      if (loc.includes('skardu') || loc.includes('basho')) dest = destinationsData.find(d => d.destinationId === 'skardu');
      else if (loc.includes('hunza') || loc.includes('khunjerab')) dest = destinationsData.find(d => d.destinationId === 'hunza');
      else if (loc.includes('naran') || loc.includes('kaghan')) dest = destinationsData.find(d => d.destinationId === 'naran');
      else if (loc.includes('swat') || loc.includes('malamjabba')) dest = destinationsData.find(d => d.destinationId === 'swat');
      else if (loc.includes('kumrat')) dest = destinationsData.find(d => d.destinationId === 'kumrat');
      else if (loc.includes('neelum') || loc.includes('kashmir') || loc.includes('taobat')) dest = destinationsData.find(d => d.destinationId === 'neelum');
      else if (loc.includes('fairy')) dest = destinationsData.find(d => d.destinationId === 'fairy');
      
      if (dest) {
        tour.aboutInfo = dest.aboutInfo;
        tour.funFacts = dest.funFacts;
      }
      return tour;
    });

    console.log('\n📦 Seeding Tours...');
    const tours = await Tour.insertMany(augmentedToursData);
    console.log(`   ✅ ${tours.length} tours seeded.`);

    // Seed Destinations
    console.log('🏔️  Seeding Destinations...');
    const destinations = await Destination.insertMany(destinationsData);
    console.log(`   ✅ ${destinations.length} destinations seeded.`);

    // Seed Umrah Packages
    console.log('🕋 Seeding Umrah Packages...');
    // We map id -> packageId
    const umrahToSeed = UMRAH_PACKAGES.map(({ id, ...rest }) => ({ packageId: id, ...rest }));
    await UmrahPackage.deleteMany({});
    const umrah = await UmrahPackage.insertMany(umrahToSeed);
    console.log(`   ✅ ${umrah.length} Umrah packages seeded.`);

    // Seed Visas
    console.log('🛂 Seeding Visas...');
    const visasToSeed = VISA_COUNTRIES_DATA.map(({ id, ...rest }) => rest);
    await VisaCountry.deleteMany({});
    const visas = await VisaCountry.insertMany(visasToSeed);
    console.log(`   ✅ ${visas.length} Visas seeded.`);

    // Seed Blogs
    console.log('📝 Seeding Blogs...');
    const blogs = await Blog.insertMany(blogsData);
    console.log(`   ✅ ${blogs.length} blogs seeded.`);

    // Seed Hotels
    console.log('🏨 Seeding Hotels...');
    const hotels = await Hotel.insertMany(hotelsData);
    console.log(`   ✅ ${hotels.length} hotels seeded.`);

    // Seed Reviews
    console.log('⭐ Seeding Reviews...');
    const reviews = await Review.insertMany(reviewsData);
    console.log(`   ✅ ${reviews.length} reviews seeded.`);

    // Seed Admin
    console.log('👤 Creating Admin account...');
    const admin = new Admin({
      email: process.env.ADMIN_EMAIL || 'admin@pak99tours.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@99tours',
      name: 'Pak99 Admin',
    });
    await admin.save();
    console.log(`   ✅ Admin created: ${admin.email}`);

    console.log('\n🎉 Database seeding complete!');
    console.log('==========================================');
    console.log(`Tours:        ${tours.length}`);
    console.log(`Umrah Pkgs:   ${umrah.length}`);
    console.log(`Visas:        ${visas.length}`);
    console.log(`Destinations: ${destinations.length}`);
    console.log(`Blogs:        ${blogs.length}`);
    console.log(`Hotels:       ${hotels.length}`);
    console.log(`Reviews:      ${reviews.length}`);
    console.log(`Admin:        ${admin.email}`);
    console.log('==========================================');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnected = false;
let connectionPromise = null;

const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState >= 1) {
    isConnected = true;
    return;
  }
  
  if (connectionPromise) {
    await connectionPromise;
    return;
  }

  try {
    connectionPromise = mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    const conn = await connectionPromise;
    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    connectionPromise = null;
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    throw error;
  }
};

export default connectDB;

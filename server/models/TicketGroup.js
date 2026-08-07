import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  bag: { type: String, required: true },
  meal: { type: Boolean, default: false },
  fare: { type: String, required: true },
  seats: { type: String, required: true }
});

const ticketGroupSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  buttonText: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  airlineName: {
    type: String,
    required: true,
    default: 'AIRSIAL'
  },
  airlineLogo: {
    type: String,
    default: ''
  },
  routeDisplay: {
    type: String,
    required: true,
  },
  flights: [flightSchema]
}, { timestamps: true });

export default mongoose.models.TicketGroup || mongoose.model('TicketGroup', ticketGroupSchema);

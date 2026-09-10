const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  customer: { type: String, required: true },
  dress: { type: String, required: true },
  event: { type: String },
  requested: { type: String },
  status: { type: String, default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);

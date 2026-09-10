const mongoose = require('mongoose');

const dressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  cat: { type: String },
  sizes: { type: String },
  price: { type: Number, required: true },
  status: { type: String, default: 'available' },
  grad: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Dress', dressSchema);

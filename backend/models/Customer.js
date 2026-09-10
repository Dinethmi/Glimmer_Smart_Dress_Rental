const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'customer' },
  name: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);

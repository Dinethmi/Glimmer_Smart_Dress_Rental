const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add booking
router.post('/', async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.json(newBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Seed data
router.post('/seed', async (req, res) => {
  try {
    const defaultBookings = [
      { id: "BK-1042", customer: "Sarah Fernando", dress: "Aurora Pearl Gown", event: "12 Sep 2026", requested: "05 Sep 2026", status: "pending" },
      { id: "BK-1041", customer: "Dinithi Perera", dress: "Sapphire Evening Gown", event: "14 Sep 2026", requested: "04 Sep 2026", status: "confirmed" },
      { id: "BK-1039", customer: "Amaya Silva", dress: "Celeste Bridal Gown", event: "20 Sep 2026", requested: "02 Sep 2026", status: "rented" },
      { id: "BK-1035", customer: "Nethmi Jayawardena", dress: "Royal Rose Evening Dress", event: "01 Sep 2026", requested: "24 Aug 2026", status: "overdue" },
      { id: "BK-1031", customer: "Kavindi Perera", dress: "Blush Garden Dress", event: "28 Aug 2026", requested: "20 Aug 2026", status: "returned" }
    ];
    await Booking.deleteMany({});
    await Booking.insertMany(defaultBookings);
    res.json({ message: "Bookings seeded" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

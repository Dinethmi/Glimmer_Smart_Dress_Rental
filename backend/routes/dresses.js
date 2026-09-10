const express = require('express');
const router = express.Router();
const Dress = require('../models/Dress');

// Get all dresses
router.get('/', async (req, res) => {
  try {
    const dresses = await Dress.find();
    res.json(dresses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add dress
router.post('/', async (req, res) => {
  try {
    const newDress = new Dress(req.body);
    await newDress.save();
    res.json(newDress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Seed data
router.post('/seed', async (req, res) => {
  try {
    const defaultDresses = [
      { name: "Aurora Pearl Gown", code: "GLM-2201", cat: "Bridal", sizes: "S · M · L", price: 18500, status: "available", grad: ["#4B2761", "#220F30"] },
      { name: "Royal Rose Evening Dress", code: "GLM-2214", cat: "Evening", sizes: "M · L", price: 12000, status: "rented", grad: ["#764591", "#4B2761"] },
      { name: "Celeste Bridal Gown", code: "GLM-2233", cat: "Bridal", sizes: "S · M", price: 24000, status: "available", grad: ["#3F1D59", "#1E0D2B"] },
      { name: "Midnight Elegance", code: "GLM-2240", cat: "Formal", sizes: "M · L · XL", price: 9500, status: "cleaning", grad: ["#220F30", "#110517"] },
      { name: "Blush Garden Dress", code: "GLM-2255", cat: "Party", sizes: "S · M", price: 7200, status: "available", grad: ["#522774", "#2A1140"] },
      { name: "Sapphire Evening Gown", code: "GLM-2262", cat: "Evening", sizes: "M · L", price: 14500, status: "reserved", grad: ["#7A3B99", "#3F1D59"] }
    ];
    await Dress.deleteMany({});
    await Dress.insertMany(defaultDresses);
    res.json({ message: "Dresses seeded" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

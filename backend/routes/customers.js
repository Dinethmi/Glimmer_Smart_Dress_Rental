// backend/routes/customers.js
const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new customer
router.post('/', async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    await newCustomer.save();
    res.json(newCustomer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Seed data
router.post('/seed', async (req, res) => {
  try {
    const defaultCustomers = [
      { email: "customer1@example.com", password: "pass123", role: "customer", name: "Alice" },
      { email: "customer2@example.com", password: "pass123", role: "customer", name: "Bob" }
    ];
    await Customer.deleteMany({});
    await Customer.insertMany(defaultCustomers);
    res.json({ message: "Customers seeded" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Customer = require('../models/Customer');

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, role, name } = req.body;
    
    if (role === 'customer') {
      let customer = await Customer.findOne({ email });
      if (customer) return res.status(400).json({ error: "Customer already exists" });

      customer = new Customer({ email, password, role, name });
      await customer.save();
      return res.json({ message: "Registered successfully", user: { email: customer.email, role: customer.role } });
    } else {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ error: "User already exists" });

      user = new User({ email, password, role, name });
      await user.save();
      return res.json({ message: "Registered successfully", user: { email: user.email, role: user.role } });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    
    let user;
    if (role === 'customer') {
      user = await Customer.findOne({ email, password });
    } else {
      user = await User.findOne({ email, password });
    }
    
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    res.json({ message: "Login successful", user: { email: user.email, role: user.role, name: user.name } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

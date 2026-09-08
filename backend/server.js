const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Using standard connection string to bypass DNS SRV block on this network
const uri = "mongodb://drasagee_db_user:zhWLvr87sUwluJeS@ac-eg4fu6o-shard-00-00.jvuq6d1.mongodb.net:27017,ac-eg4fu6o-shard-00-01.jvuq6d1.mongodb.net:27017,ac-eg4fu6o-shard-00-02.jvuq6d1.mongodb.net:27017/?ssl=true&replicaSet=atlas-ek7lt9-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
  .then(() => console.log("✅ Connected to MongoDB successfully"))
  .catch(err => {
    console.log("⚠️ Could not connect to MongoDB Atlas.");
    console.log("   (This is normal if you are on a university/restricted network that blocks port 27017).");
    console.log("   The server will continue to run without the database.");
  });

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running and connected to DB!' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

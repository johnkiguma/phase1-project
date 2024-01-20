// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/fortniteConnect', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define MongoDB schema
const playerSchema = new mongoose.Schema({
  username: String,
  contact: String,
  gameMode: String
});

// Define MongoDB model
const Player = mongoose.model('Player', playerSchema);

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// API endpoint to handle player data
app.post('/api/players', async (req, res) => {
  const newPlayerData = req.body;

  try {
    // Create a new player instance
    const newPlayer = new Player(newPlayerData);

    // Save the new player to the database
    await newPlayer.save();

    console.log('New player added:', newPlayer);
    res.json({ success: true, message: 'Player added successfully' });
  } catch (error) {
    console.error('Error adding player:', error);
    res.status(500).json({ success: false, message: 'Failed to add player' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

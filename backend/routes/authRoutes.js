const express = require('express');
const User = require('../models/users.js'); // Assuming users.js is in the models directory

const router = express.Router();

// Register a new user (POST /auth/register)
router.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body); // Create user from request body
    const token = await generateAuthToken(user._id); // Generate authentication token (implement generateAuthToken)
    res.status(201).send({ user, token }); // Return created user and token
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: 'Registration failed' });
  }
});

// Log in a user (POST /auth/login)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password); // Implement findByCredentials (check credentials)
    const token = await generateAuthToken(user._id); // Generate authentication token
    res.send({ user, token }); // Return user and token
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: 'Invalid login credentials' });
  }
});

// Get the currently logged-in user (GET /auth/me)
router.get('/me', async (req, res) => {
  try {
    const user = req.user; // Assuming authentication middleware has set req.user
    res.send(user); // Send user details
  } catch (error) {
    console.error(error);
    res.status(401).send({ error: 'Unauthorized' });
  }
});

module.exports = router;

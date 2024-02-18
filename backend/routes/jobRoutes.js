const express = require('express');
const Job = require('../models/jobs.js'); // Assuming jobs.js is in the models directory
const auth = require('../middleware/auth'); // Assuming an authentication middleware

const router = express.Router();

// Create a new job (POST /jobs)
router.post('/', auth, async (req, res) => {
  try {
    const job = await Job.create(req.body); // Create job from request body, with client ID from auth
    res.status(201).send(job); // Return created job
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: 'Failed to create job' });
  }
});

// Get all jobs (GET /jobs)
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.findAll(); // Implement findAll to retrieve all jobs
    res.send(jobs); // Return all jobs
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

// Get a specific job by ID (GET /jobs/:id)
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id); // Implement findById to retrieve specific job
    if (!job) {
      return res.status(404).send({ error: 'Job not found' });
    }
    res.send(job); // Return requested job
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

// Update a job (PUT /jobs/:id)
// Update a job (PUT /jobs/:id)
router.put('/:id', auth, async (req, res) => {
    try {
      // Implement authorization: Ensure logged-in user is authorized to update the job (e.g., owner or admin)
      const authorized = await checkJobAuthorization(req.user, req.params.id); // Implement checkJobAuthorization
      if (!authorized) {
        return res.status(403).send({ error: 'Unauthorized to update job' });
      }
  
      const updatedJob = await Job.updateById(req.params.id, req.body); // Update job with valid ID and body
  
      if (!updatedJob) {
        return res.status(404).send({ error: 'Job not found' });
      }
  
      res.send(updatedJob); // Return updated job
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal server error' });
    }
  });
  
  // Delete a job (DELETE /jobs/:id)
  router.delete('/:id', auth, async (req, res) => {
    try {
      // Implement authorization: Ensure logged-in user is authorized to delete the job (e.g., owner or admin)
      const authorized = await checkJobAuthorization(req.user, req.params.id); // Implement checkJobAuthorization
      if (!authorized) {
        return res.status(403).send({ error: 'Unauthorized to delete job' });
      }
  
      const deleted = await Job.deleteById(req.params.id); // Implement deleteById to delete the job
  
      if (!deleted) {
        return res.status(404).send({ error: 'Job not found' });
      }
  
      res.send({ message: 'Job deleted successfully' }); // Send success message
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal server error' });
    }
  });
  
  module.exports = router;
  
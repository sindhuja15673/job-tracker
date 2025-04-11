
const express = require('express');
const Job = require('../models/job');
const router = express.Router();

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new job
router.post('/', async (req, res) => {
  const { title, status, company, date, link, jobType } = req.body;

  const newJob = new Job({
    title,
    status,
    company,
    date,
    link,
    jobType
  });

  try {
    await newJob.save();
    res.status(201).json({ message: 'Job added successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE route
router.delete('/:id', async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) return res.status(404).json({ error: 'Job not found' });
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete job' });
  }
});

// PUT (Update) route
router.put('/:id', async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedJob) return res.status(404).json({ error: 'Job not found' });
    res.status(200).json(updatedJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update job' });
  }
});

module.exports = router;

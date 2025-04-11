// models/Job.js
const mongoose = require('mongoose');


const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, required: true },
  company: { type: String, required: true },
  date: { type: String, required: true },
  link: { type: String }
});
const Job = mongoose.model('Job', jobSchema);

module.exports = Job;

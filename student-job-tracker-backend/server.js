const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes'); // Import the job routes
require('dotenv').config();

const app = express();

app.use(cors({
    origin: 'https://job-tracker-1-dk45.onrender.com/',  // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));


app.use('/api/users', userRoutes);   
app.use('/api/jobs', jobRoutes);     


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

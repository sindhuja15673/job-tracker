import React, { useState } from 'react';
import axios from 'axios';
import './addjob.css';
import { IoMdClose } from "react-icons/io";

const AddJob = () => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');
  const [company, setCompany] = useState('');
  const [date, setDate] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!status) {
      alert('Please select a job status.');
      return;
    }

    const newJob = { title, status, location, company, date, link };

    try {
      await axios.post('https://job-tracker-v7w5.onrender.com/api/jobs', newJob);
      alert('Job added successfully');

      // Clear form fields
      setTitle('');
      setStatus('');
      setLocation('');
      setCompany('');
      setDate('');
      setLink('');
    } catch (error) {
      console.error('Error adding job:', error);
      alert('Failed to add job');
    }
  };

  return (
    <div className="add-job-container">
      <h2>Add Job</h2>
      <form onSubmit={handleSubmit} className="add-job-form">
        <button className='close' style={{backgroundColor:"red", width:"30px", paddingRight:"30px", fontSize:"16px", marginLeft:"555px", marginTop:"-10px"}} onClick={() => window.location.reload()}><IoMdClose /></button>
        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="" disabled>
            Select status...
          </option>
          <option value="applied">Applied</option>
          <option value="offer">Offer </option>
          <option value="interview">Interview</option>
          <option value="declined">Declined</option>
        </select>
        

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />

        <input
          type="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />

        <button className='button' type="submit">Add Job</button>
      </form>
    </div>
  );
};

export default AddJob;



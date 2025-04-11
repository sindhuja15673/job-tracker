import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import AddJob from './addjob';
import Profile from './profile';
import axios from 'axios';
import './dashboard.css';
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaLocationArrow, FaCalendarAlt, FaBriefcase } from "react-icons/fa";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingJobId, setEditingJobId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    status: '',
    company: '',
    date: '',
    link: '',
  });

  const [activeTab, setActiveTab] = useState('all'); // 'all', 'add', or 'profile'

  const fetchJobs = async () => {
    try {
      const response = await axios.get('https://job-tracker-v7w5.onrender.com/api/jobs');
      setJobs(response.data);
      setFilteredJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(query) ||
      (job.status && job.status.toLowerCase().includes(query))
    );
    setFilteredJobs(filtered);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await axios.delete(`https://job-tracker-v7w5.onrender.com/api/jobs/${id}`);
        // alert('Job deleted successfully');
        fetchJobs();
      } catch (error) {
        console.error('Error deleting job:', error);
        alert('Failed to delete job');
      }
    }
  };

  const startEditing = (job) => {
    setEditingJobId(job._id);
    setEditForm({
      title: job.title,
      status: job.status,
      company: job.company,
      date: job.date,
      link: job.link,
    });
  };

  const cancelEditing = () => {
    setEditingJobId(null);
    setEditForm({ title: '', status: '', company: '', date: '', link: '' });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(`https://job-tracker-v7w5.onrender.com/api/jobs/${id}`, editForm);
      alert('Job updated successfully');
      fetchJobs();
      cancelEditing();
    } catch (error) {
      console.error('Error updating job:', error);
      alert('Failed to update job');
    }
  };

  return (
    <div className="dashboard">
      <Sidebar setActiveTab={setActiveTab} />
      <div className="content">
        {activeTab === 'all' && (
          <>
            <h2>All Jobs</h2>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
            />
            {filteredJobs.map((job) => (
              <div key={job._id} className="job-card">
                {editingJobId === job._id ? (
                  <div className="edit-form">
                    <input
                      type="text"
                      name="title"
                      value={editForm.title}
                      onChange={handleEditChange}
                    />
                    
                    <select
  name="status"
  value={editForm.status}
  onChange={handleEditChange}
  required
>
  <option value="" disabled>Select status...</option>
  <option value="applied">Applied</option>
  <option value="offer">offer</option>
  <option value="interview">Interview</option>
  <option value="declined">Declined</option>
</select>

                    <input
                      type="text"
                      name="company"
                      value={editForm.company}
                      onChange={handleEditChange}
                    />
                    <input
                      type="text"
                      name="date"
                      value={editForm.date}
                      onChange={handleEditChange}
                    />
                    <input
                      type="text"
                      name="link"
                      value={editForm.link}
                      onChange={handleEditChange}
                    />
                    <button onClick={() => saveEdit(job._id)}>Save</button>
                    <button onClick={cancelEditing}>Cancel</button>
                  </div>
                ) : (
                 
                  <div className="job-cards">
  <div className="job-card-header">
    <div className="job-avatar">{job.title.charAt(0).toUpperCase()}</div>
    <div className="job-info">
      <h3>{job.title}</h3>
      <p className="company">{job.company}</p>
    </div>
  </div>
  <hr />
  <div className="job-card-body">
    <p><FaLocationArrow /> {job.location}</p>
    <p><FaCalendarAlt /> {job.date}</p>
    <p><FaBriefcase /> {job.link}</p>
    {/* <span className={`status-badge ${job.status.toLowerCase()}`}>{job.status}</span> */}
    <span className={`status-badge ${job.status?.toLowerCase() || 'unknown'}`}>
  {job.status || 'Unknown'}
</span>
  </div>
  <div className="job-card-footer">
    <button className="edit-btn" onClick={() => startEditing(job)}><MdOutlineModeEdit /></button>
    <button className="delete-btn" onClick={() => handleDelete(job._id)}><RiDeleteBin5Line /></button>
  </div>
</div>

                )}
              </div>
            ))}
          </>
        )}

        {activeTab === 'add' && <AddJob />}
        {activeTab === 'profile' && <Profile />}
      </div>
    </div>
  );
};

export default Dashboard;



import React from 'react';
import './sidebar.css';
const Sidebar = ({ setActiveTab }) => {
  return (
    <div className="sidebar">
      <h3>Dashboard</h3>
      <ul>
        <li onClick={() => setActiveTab('all')}>All Jobs</li>
        <li onClick={() => setActiveTab('add')}>Add Job</li>
        <li onClick={() => setActiveTab('profile')}>Profile</li>
      </ul>
    </div>
  );
};

export default Sidebar;

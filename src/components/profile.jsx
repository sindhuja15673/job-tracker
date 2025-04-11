
import React from 'react';
import './profile.css';

const Profile = () => {
  const user = {
    name: 'Sindhuja',
    email: 'sindhuja@example.com',
    role: 'Frontend Developer',
    location: 'Cuddalore, India',
    joined: 'March 2024'
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-card">
        <div className="avatar">
          <span>{user.name.charAt(0)}</span>
        </div>
        <div className="profile-details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Location:</strong> {user.location}</p>
          <p><strong>Joined:</strong> {user.joined}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

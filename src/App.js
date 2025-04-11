// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import Dashboard from './components/dashboard';
import Home from './components/home';
import AddJob from './components/addjob';
import Profile from './components/profile';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          // <Route path='/' element={<Home />} />
          // <Route path='/register' element={<Register />} />
          // <Route path='/login' element={<Login />} />
          <Route path='/' element={<Dashboard />} />
          <Route path='/add-job' element={<AddJob />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

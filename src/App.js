import './App.css';
import Home from './Modules/Home/Home';
import UserProfile from './Modules/Profile/UserProfile'
import AdminProfile from './Modules/Profile/AdminProfile'
import Register from './Modules/Register/Register'
import Applied from './Modules/Applied/Applied'
import UserUpdateProfile from './Modules/UpdateProfile/UserUpdateProfile'
import AdminUpdateProfile from './Modules/UpdateProfile/AdminUpdateProfile'



import React from 'react';
import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Applied" element={<Applied />} />
          <Route path="/UserUpdateProfile" element={<UserUpdateProfile />} />
          <Route path="/AdminUpdateProfile" element={<AdminUpdateProfile />} />

          
        </Routes>
    </Router>

  );
}

export default App;

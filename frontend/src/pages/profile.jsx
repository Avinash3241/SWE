import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import '../styles/Home.css';
import '../styles/ProfileCard.css';
import Dashboard from './dashboard';

function Profile() {
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleUpdate = (userId, password) => {
        axios.post(`${process.env.REACT_APP_API_URL}/updateProfile`, { userId, password })
            .then(res => {
                console.log(res.data);
            }
        )
        .catch(err => alert(err.response?.data?.error || 'User update failed'));
    }

    const handleSubmit = (event) => {
        // event.preventDefault();

        if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
        }
        // pass all the info that is to be updated and modify the function accordingly
        const userId = localStorage.getItem('UserId');
        handleUpdate(userId,password);
    };

    useEffect(() => {
        // event.preventDefault();
        const userId = localStorage.getItem('UserId');
        console.log("UserId:", userId);
        if (!userId) {
            alert('User not logged in!');
            return;
        }
        axios.post(`${process.env.REACT_APP_API_URL}/getUser`, { userId })
            .then(res => {
                console.log(res.data);
                setUser(res.data.user);
            }
        )
        .catch(err => alert(err.response?.data?.error || 'No User Found'));
    },[]);

    if (!user) return <div>Loading profile...</div>;

    return (
      <div className='Profile'>
      <Dashboard />
        <div className="profile-card">
          <h1>User Profile</h1>
          {/* <img src={user.profilePic || "https://via.placeholder.com/150"} alt="Profile" className="profile-image" /> */}
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={user.name} readOnly />
            <input type="email" placeholder="Email" value={user.email} readOnly />
            <input 
              type="password" 
              placeholder="New Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <input 
              type="password" 
              placeholder="Confirm Password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
            />
            <button type="submit">Update Profile</button>
          </form>
        </div>
        </div>
      );
};

export default Profile;
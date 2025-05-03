import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Home.css';
import '../styles/ProfileCard.css';
import Dashboard from './dashboard';
import Preload_notifications from '../hooks/preload_notifications';
import '../styles/profile.css'

function Profile() {
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [contact_info, setContactInfo] = useState('');
    const [address, setAddress] = useState('');
    const notifications = Preload_notifications().notifications;

    const handleUpdate = (userId, password, contact_info, address) => {
        axios.post(`${process.env.REACT_APP_API_URL}/updateProfile`, { userId, password, contact_info, address })
            .then(res => {
                console.log(res.data);
            }
        )
        .catch(err => alert(err.response?.data?.error || 'User update failed'));
    }

    const handleSubmit = (event) => {
        // event.preventDefault();

        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSymbol = /[^a-zA-Z0-9]/.test(password);

        // if(password.length === 0 && confirmPassword.length === 0){return;}

        if (password.length!==0 && (password.length < 8 || !hasLetter || !hasNumber || !hasSymbol)) {
          window.alert("Password must be at least 8 characters long and include letters, numbers, and symbols.");
          return;
        }

        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
        // pass all the info that is to be updated and modify the function accordingly
        const userId = localStorage.getItem('UserId');
        handleUpdate(userId,password, contact_info, address);
    };

    const handleDelete = (event, notificationId) => {
        event.preventDefault();
        console.log("notificationId",notificationId);
        const userId = localStorage.getItem('UserId');
        console.log("UserId:", userId);
        if (!userId) {
            alert('User not logged in!');
            return;
        }
        axios.post(`${process.env.REACT_APP_API_URL}/deleteNotification`, { userId, notificationId })
            .then(res => {
                console.log("hello",res.data);
                // alert("Notification deleted successfully");
                window.location.reload();
            }
        )
        .catch(err => alert(err.response?.data?.error || 'Notification delete failed'));
    }
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
                setContactInfo(res.data.user.contact_info);
                setAddress(res.data.user.address);
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
          {/* <img src={user.profi</form>lePic || "https://via.placeholder.com/150"} alt="Profile" className="profile-image" /> */}
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={user.name} readOnly />
            <input type="email" placeholder="Email" value={user.email} readOnly />
            <input 
              type="tel" 
              placeholder="contact" 
              value={contact_info}
              onChange={(e) => setContactInfo(e.target.value)}
              pattern="[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]"
              title="Please enter a valid 10-digit phone number" 
              required 
            />
            <input 
              type="address" 
              placeholder="address" 
              value={address}
              onChange={(e) => setAddress(e.target.value)} 
              required 
            />
            <input 
              type="password" 
              placeholder="New Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}  
            />
            <input 
              type="password" 
              placeholder="Confirm Password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}  
            />
            <button type="submit">Update Profile</button>
          </form>
        </div>
        <h1>Notifications</h1>
          <div className="notification-container">
            {(notifications === undefined || notifications.length === 0) ? (
              <p>No notifications found.</p>
            ) : (
              notifications.map((notification, index) => (
                <div className="notification-card" key={index}>
                  <p>{notification.content}</p><button className='crossButton' onClick={(e) => handleDelete(e,notification.notification_id)}>X</button>
                </div>
              ))
            )}
          </div>
      </div>
      );
};

export default Profile;
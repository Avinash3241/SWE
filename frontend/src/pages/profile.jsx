import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/profile.css";
import Dashboard from "./dashboard";
import Preload_notifications from "../hooks/preload_notifications";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    contact_info: "",
    address: "",
    profile_picture: "",
  });
  const [boughtHistory, setBoughtHistory] = useState([]);
  const [soldHistory, setSoldHistory] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    contact_info: "",
    address: "",
  });
  const [profilePicture, setProfilePicture] = useState(null);

  const userId = sessionStorage.getItem("UserId"); // Use sessionStorage
  const navigate = useNavigate();
  const notifications = Preload_notifications().notifications;

  useEffect(() => {
    // Fetch profile, bought history, and sold history
    axios
      .get(`${process.env.REACT_APP_API_URL}/profile`, { params: { userId } })
      .then((response) => {
        const { profile, boughtHistory, soldHistory } = response.data;
        setProfile(profile);
        setBoughtHistory(boughtHistory);
        setSoldHistory(soldHistory);
        setUpdatedData({
          contact_info: profile.contact_info,
          address: profile.address,
        });
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
      });
  }, [userId]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleRemoveProfilePicture = () => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/profile`, {
        userId,
        contact_info: updatedData.contact_info,
        address: updatedData.address,
        profile_picture: null, // Set profile picture to null
      })
      .then(() => {
        alert("Profile picture removed successfully");
        setProfile((prev) => ({ ...prev, profile_picture: null }));
      })
      .catch((err) => {
        console.error("Error removing profile picture:", err);
        alert("Failed to remove profile picture");
      });
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("contact_info", updatedData.contact_info);
    formData.append("address", updatedData.address);
    if (profilePicture) {
      formData.append("profile_picture", profilePicture);
    }

    axios
      .put(`${process.env.REACT_APP_API_URL}/profile`, formData)
      .then(() => {
        alert("Profile updated successfully");
        setIsEditing(false);
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        alert("Failed to update profile");
      });
  };

  const handleLogout = () => {
    // Clear sessionStorage and redirect to login page
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("UserId");
    navigate("/login");
  };
  const handleBoughtHistory = () => {
    // Redirect to bought history page
    navigate("/buypage/buyings_history");
  };
  const handleSoldHistory = () => {
    // Redirect to sold history page
    navigate("/sellings/sellings_history");
  };

  const handleDelete = (event, notificationId) => {
    event.preventDefault();
    console.log("notificationId",notificationId);
    const userId = sessionStorage.getItem('UserId');
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

  return (
    
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-info">
        <div className="profile-picture">
          <img
            src={
              profile.profile_picture
                ? `${process.env.REACT_APP_API_URL}/uploads/${profile.profile_picture}`
                : `${process.env.REACT_APP_API_URL}/uploads/pic.png`
            }
            alt="Profile"
          />
          {/* {profile.profile_picture && isEditing && (
            <button onClick={handleRemoveProfilePicture}>
              Remove Profile Picture
            </button>
          )} */}
        </div>
        {isEditing ? (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
            />
            <input
              type="text"
              name="contact_info"
              value={updatedData.contact_info}
              onChange={handleInputChange}
              placeholder="Contact Info"
            />
            <input
              type="text"
              name="address"
              value={updatedData.address}
              onChange={handleInputChange}
              placeholder="Address"
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={handleEditToggle}>Cancel</button>
          </>
        ) : (
          <>
            <p>
              <strong>Name:</strong> {profile.name}
            </p>
            <p>
              <strong>Email:</strong> {profile.email}
            </p>
            <p>
              <strong>Contact Info:</strong>{" "}
              {profile.contact_info || "Not provided"}
            </p>
            <p>
              <strong>Address:</strong> {profile.address || "Not provided"}
            </p>
            <button onClick={handleEditToggle}>Edit</button>
          </>
        )}
      </div>
      {!isEditing && (
        <>
          {/* <div className="transaction-history">
            <h3>Bought History</h3>
            <ul>
              {boughtHistory.map((item) => (
                <li key={item.transaction_id}>
                  <p>
                    <strong>Product:</strong> {item.product_name}
                  </p>
                  <p>
                    <strong>Price:</strong> ${item.final_price}
                  </p>
                  <p>
                    <strong>Seller:</strong> {item.seller_name} (
                    {item.seller_email})
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(item.transaction_date).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
            <h3>Sold History</h3>
            <ul>
              {soldHistory.map((item) => (
                <li key={item.transaction_id}>
                  <p>
                    <strong>Product:</strong> {item.product_name}
                  </p>
                  <p>
                    <strong>Price:</strong> ${item.final_price}
                  </p>
                  <p>
                    <strong>Buyer:</strong> {item.buyer_name} (
                    {item.buyer_email})
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(item.transaction_date).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          </div> */}
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
          <button onClick={handleBoughtHistory} className="history-button">
            Bought History
          </button>
          <button onClick={handleSoldHistory} className="history-button">
            Sold History
          </button>
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
        </>
      )}
    </div>
  );
};

export default Profile;
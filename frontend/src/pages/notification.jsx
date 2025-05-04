import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Dashboard from "./dashboard"; // Import the Dashboard component
import "../styles/notification.css";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const recipientId = sessionStorage.getItem("UserId");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/notifications`, { params: { recipientId } })
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((err) => {
        console.error("Error fetching notifications:", err);
        alert("Failed to fetch notifications.");
      });
  }, [recipientId]);

  const markAsRead = (notificationId) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/notifications/${notificationId}/read`)
      .then(() => {
        setNotifications((prevNotifications) =>
          prevNotifications.map((n) =>
            n.notification_id === notificationId ? { ...n, is_read: true } : n
          )
        );
      })
      .catch((err) => {
        console.error("Error marking notification as read:", err);
        alert("Failed to mark notification as read.");
      });
  };

  const toggleStar = (notificationId) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/notifications/${notificationId}/star`)
      .then((response) => {
        setNotifications((prevNotifications) =>
          prevNotifications.map((n) =>
            n.notification_id === notificationId
              ? { ...n, is_starred: response.data.is_starred }
              : n
          )
        );
      })
      .catch((err) => {
        console.error("Error toggling star:", err);
        alert("Failed to toggle star.");
      });
  };

  const deleteNotification = (notificationId) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/notifications/${notificationId}`)
      .then(() => {
        setNotifications((prevNotifications) =>
          prevNotifications.filter((n) => n.notification_id !== notificationId)
        );
        alert("Notification deleted successfully.");
      })
      .catch((err) => {
        console.error("Error deleting notification:", err);
        alert("Failed to delete notification.");
      });
  };

  return (
    <div className="notification-page">
      <Dashboard /> {/* Add the top bar */}
      <div className="notification-container">
        <div className="notification-header">
          <h2>Notifications</h2>
          <Link to="/starred_notification" className="view-starred-link">
            View Starred Notifications
          </Link>
        </div>

        <div className="notification-list">
          {notifications.map((notification) => (
            <div
              key={notification.notification_id}
              className={`notification-item ${
                notification.is_read ? "read" : "unread"
              }`}
              onClick={() => markAsRead(notification.notification_id)}
            >
              <p className="notification-sender">
                <strong>From:</strong> {notification.sender_name} ({notification.sender_email})
              </p>
              <p className="notification-content">{notification.content}</p>
              <p className="notification-date">
                {new Date(notification.created_at).toLocaleString()}
              </p>
              <div className="notification-actions">
                <span
                  className={`star-icon ${notification.is_starred ? "starred" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleStar(notification.notification_id);
                  }}
                >
                  ★
                </span>
                <span
                  className="bin-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notification.notification_id);
                  }}
                >
                  🗑️
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
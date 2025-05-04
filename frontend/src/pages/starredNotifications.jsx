import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/notification.css";

const StarredNotificationsPage = () => {
  const [starredNotifications, setStarredNotifications] = useState([]);
  const recipientId = sessionStorage.getItem("UserId");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/notifications/starred`, { params: { recipientId } })
      .then((response) => {
        setStarredNotifications(response.data);
      })
      .catch((err) => {
        console.error("Error fetching starred notifications:", err);
        alert("Failed to fetch starred notifications.");
      });
  }, [recipientId]);

  const toggleStar = (notificationId) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/notifications/${notificationId}/star`)
      .then(() => {
        setStarredNotifications((prevNotifications) =>
          prevNotifications.filter((n) => n.notification_id !== notificationId)
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
        setStarredNotifications((prevNotifications) =>
          prevNotifications.filter((n) => n.notification_id !== notificationId)
        );
        alert("Notification deleted successfully.");
      })
      .catch((err) => {
        console.error("Error deleting notification:", err);
        alert("Failed to delete notification.");
      });
  };

  const markAsRead = (notificationId) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/notifications/${notificationId}/read`)
      .then(() => {
        setStarredNotifications((prevNotifications) =>
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

  return (
    <div className="notification-container">
      <h2>Starred Notifications</h2>
      <div className="notification-list">
        {starredNotifications.map((notification) => (
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
                className={`star-icon starred`}
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
  );
};

export default StarredNotificationsPage;
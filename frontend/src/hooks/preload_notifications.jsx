import { useState, useEffect } from 'react';
import axios from 'axios';

function Preload_notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_API_URL}/getUsernotifications`, { userId: localStorage.getItem('UserId')})
      .then(res => setNotifications(res.data.notifications))
      .catch(err => alert(err.response?.data?.error || 'No notifications found'));
  }, []);

  return {"notifications" : notifications};
}

export default Preload_notifications;

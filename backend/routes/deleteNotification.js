const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../db/db.js');

router.post('/deleteNotification', async (req, res) => {
  const { userId, notificationId } = req.body;
    console.log("UserId:",userId,notificationId);
  try {
    const query = 'UPDATE notifications SET is_read = $1 WHERE user_id = $2 AND notification_id = $3';
    const values = [true, userId, notificationId];
    pool.query(query, values)
      .then(result => {
        // Check whether password can be sent or not
        console.log('Notification read:', result.rows[0]);
        res.json({ message: 'Notification read'});
      })
      .catch(err => {   
        console.error('No notification Found', err);
        // res.status(500).send('Server Error');
        res.json({ message: 'No notification Found'});
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
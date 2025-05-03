const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../db/db.js');

router.post('/getUsernotifications', async (req, res) => {
  const { userId } = req.body;

  try {
    const query = 'SELECT * FROM notifications WHERE user_id = $1 AND is_read = $2';
    const values = [userId,false];
    pool.query(query, values)
    .then(result => {
        console.log(result.rows);
        if (result.rows.length === 0) {
            console.log('No notifications found');
            res.json({ message: 'No notifications Found'});
        } 
        else{
            console.log('Notification:', result.rows[0]);
            res.json({ 
                message: 'Notifications Found',
                notifications: result.rows
            });
        }
    })
    .catch(err => {   
        console.error('Error in server', err);
        res.status(500).send('Error in server');
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../db/db.js');

router.post('/getUser', async (req, res) => {
  const { userId } = req.body;

  try {
    const query = 'SELECT * FROM users WHERE "user_id" = $1';
    const values = [userId];
    pool.query(query, values)
      .then(result => {
        // Check whether password can be sent or not
        console.log('User:', result.rows[0]);
        res.json({ message: 'User Found', 
        "user" : result.rows[0]});
      })
      .catch(err => {   
        console.error('No user Found', err);
        // res.status(500).send('Server Error');
        res.json({ message: 'No User Found'});
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
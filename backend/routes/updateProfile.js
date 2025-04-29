const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../db/db.js');

router.post('/updateProfile', async (req, res) => {
  const { userId, password } = req.body;

  try {
    const query = 'UPDATE users SET password_hash = $1 WHERE "user_id" = $2;';
    const values = [password,userId];
    pool.query(query, values)
      .then(result => {
            res.json({message: "Profile Updated successfully"});
        })
      .catch(err => {   
        console.error('User Update Failed', err);
        res.json({ message: 'User Update Failed'});
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
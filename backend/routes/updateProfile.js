const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../db/db.js');

router.post('/updateProfile', async (req, res) => {
  const { userId, password, contact_info, address } = req.body;

  try {
    var query,values;
    if(password === ""){
      query = 'UPDATE users SET contact_info = $1, address = $2 WHERE "user_id" = $3;';
      values = [contact_info, address, userId];
    }
    else{
      query = 'UPDATE users SET password_hash = $1, contact_info = $2, address = $3 WHERE "user_id" = $4;';
      values = [password, contact_info, address, userId];
    }
    console.log("hello world",contact_info)
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
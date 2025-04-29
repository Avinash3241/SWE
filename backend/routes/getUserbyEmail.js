const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../db/db.js');

router.post('/getUserbyEmail', async (req, res) => {
  const { email } = req.body;

  try {
    const query = 'SELECT * FROM users WHERE "email" = $1';
    const values = [email];
    pool.query(query, values)
    .then(result => {
        if (result.rows.length === 0) {
            console.log('No user found');
            res.json({ message: 'No User Found' , isUser: 0});
        } 
        else{
            console.log('User:', result.rows[0]);
            res.json({ 
                message: 'User Found',
                user: result.rows[0] ,
                isUser : 1
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
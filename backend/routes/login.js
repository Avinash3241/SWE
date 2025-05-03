const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../db/db.js');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    pool.query(query, values)
      .then(result => {
        const token = jwt.sign({ email }, 'SWE_15', { expiresIn: '1h' });
        user = result.rows[0];
        if(password === user["password_hash"]){
          console.log('User:', result.rows[0]["password_hash"]);
          res.json({ message: 'Logged In Successfully', token, 
          "user" : user});
        }
        else{
          console.log('User:', result.rows[0]["password_hash"]);
          res.status(500).send('Invalid Credentials');
        }
      })
      .catch(err => {   
        console.error('No user Found', err);
        // res.status(500).send('Server Error');
        res.json({ message: 'Invalid Credentials'});
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

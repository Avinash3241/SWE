const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../db/db.js');
// const fetch = require('node-fetch'); 

async function verifyEmailHunter(apiKey, email) {
    const url = `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const result = data.data.result;
        console.log(`Result for ${email}: ${result}`);

        if (result === 'deliverable') {
            return true;
        } else{
            return false
        }
    } catch (err) {
        console.error("Error verifying email:", err);
    }
}

const API_KEY = '';

// verifyEmailHunter(API_KEY, emailToCheck);


router.post('/signup', async (req, res) => {
  const { name, email, password, contact_info } = req.body;

    try {
      const isValid = await verifyEmailHunter(API_KEY, email);
      console.log(isValid);
        if(!isValid){
            console.log("Email is not valid");
            return res.status(500).json({ error: 'Invalid email address' });
        }
        const query = 'INSERT INTO users(name, email, password_hash, contact_info) VALUES ($1, $2, $3,$4)';
        const values = [name, email, password, contact_info];
        pool.query(query, values)
          .then(result => {
            console.log('User inserted!');
            res.json({ message: 'Signed Up successful' });
            // window.location.href = '/login';
          })
          .catch(err => {   
            console.error('Error inserting user:', err);
            // res.status(500).send('Server Error');
            res.json({ message: 'Signing in Failed'});
          });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

module.exports = router;

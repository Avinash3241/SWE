const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../db/db.js');

router.post('/filterproducts', async (req, res) => {
  const { minPrice, maxPrice } = req.body;

  try {
    const query = 'SELECT * FROM products WHERE price >= $1 and price <= $2';
    const values = [parseInt(minPrice), parseInt(maxPrice)];
    pool.query(query, values)
      .then(result => {
        // Check whether password can be sent or not
        console.log('Products:', result.rows[0]);
        res.json({ message: 'Filtered Products', 
        "products" : result.rows});
      })
      .catch(err => {   
        console.error('Server Error with products table', err);
        // res.status(500).send('Server Error');
        res.json({ message: 'Server Error with products table'});
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
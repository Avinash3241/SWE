const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../db/db.js');

router.post('/deleteProduct', async (req, res) => {
  const { productId, user_id } = req.body;
  console.log(productId,user_id)
  try {

    var query,values;
    query = 'DELETE from products WHERE product_id = $1 AND seller_id = $2';
    values = [productId,user_id];

    pool.query(query, values)
      .then(result => {

        var products = [];

        for(var i=0;i<result.rows.length;i++){
          products.push(result.rows[i]);
        }
        console.log('Product:', result.rows);

        res.json({ message: 'Product Deleted', 
        "products" : products});
      })
      .catch(err => {   
        console.error('Server error', err);
        // res.status(500).send('Server Error');
        res.json({ message: 'Server error'});
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../db/db.js');

router.post('/viewRequests', async (req, res) => {
  const {product_id, userId } = req.body;
  console.log(userId)
  try {

    var query,values;
    query = 'SELECT \
                products.product_id,\
                products.seller_id,\
                products.name AS product_name,\
                products.description,\
                products.price,\
                products.category_id,\
                products.created_at AS product_creation,\
                purchase_requests.buyer_id,\
                users.name AS buyer_name,\
                users.email AS buyer_email,\
                users.profile_picture,\
                users.contact_info,\
                users.address\
            FROM products\
            JOIN purchase_requests \
                ON products.product_id = purchase_requests.product_id\
            JOIN users \
                ON purchase_requests.buyer_id = users.user_id\
            WHERE products.seller_id = $1 AND products.product_id = $2 AND purchase_requests.status = $3';
    values = [userId, product_id,"pending"];

    pool.query(query, values)
      .then(result => {

        var requests = [];

        for(var i=0;i<result.rows.length;i++){
          requests.push(result.rows[i]);
        }
        console.log('Product:', result.rows);

        res.json({ message: 'Fetched', 
        "requests" : requests});
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
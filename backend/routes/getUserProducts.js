const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../db/db.js');

router.post('/getUserProducts', async (req, res) => {
  const { userId, isSeller, status } = req.body;
  console.log("UserId:",userId,status);
  try {

    var query,values;
    if(isSeller){
      if(status === "AVALIABLE"){
        query = 'SELECT * \
        FROM products WHERE seller_id = $1 AND status = $2';
        values = [userId, "available"]
      }
      else if(status === "SOLD"){
        query = 'SELECT * \
        FROM products WHERE seller_id = $1 AND status = $2';
        values = [userId, "sold"]
      }
      else if(status === "REMOVED"){
        query = 'SELECT * \
        FROM products WHERE seller_id = $1 AND status = $2';
        values = [userId, "removed"]
      }
      else if(status === "DRAFT"){
        query = 'SELECT * \
        FROM products WHERE seller_id = $1 AND status = $2';
        values = [userId,"draft"]
      }
      else if(status === "AVAILABLE_AND_DRAFT"){
        console.log("uhvnoiv");
        query = 'SELECT * \
        FROM products WHERE seller_id = $1 AND (status = $2 OR status = $3)';
        values = [userId,"available","draft"];
      }
      else if(status === "SOLD_AND_REMOVED"){
        query = 'SELECT * \
        FROM products WHERE seller_id = $1 AND (status = $2 OR status = $3)';
        values = [userId,"sold","removed"];
      }
      else{
        query = 'SELECT * \
        FROM products WHERE seller_id = $1';
        values = [userId];
      }
    }
    else{
      console.log("UserId:",userId);
      if(status === "pending"){
          query = 'SELECT products.product_id ,\
              products.seller_id  ,\
              products.name as name,\
              products.description ,\
              products.price,\
              products.category_id,\
              products.created_at,\
              purchase_requests.buyer_id as buyer_id\
          FROM products JOIN purchase_requests ON products.product_id = purchase_requests.product_id\
          WHERE purchase_requests.buyer_id = $1 AND purchase_requests.status = $2';
          values = [userId, "pending"];
      }
      else{
          query = 'SELECT products.product_id ,\
              products.seller_id  ,\
              products.name as name,\
              products.description ,\
              products.price,\
              products.category_id,\
              products.created_at,\
              purchase_requests.buyer_id as buyer_id\
          FROM products JOIN purchase_requests ON products.product_id = purchase_requests.product_id\
          WHERE purchase_requests.buyer_id = $1 AND purchase_requests.status != $2';
          values = [userId,"pending"];
      }
    }

    pool.query(query, values)
      .then(result => {

        var products = [];

        for(var i=0;i<result.rows.length;i++){
          products.push(result.rows[i]);
        }

        console.log('User:', result.rows);
        res.json({ message: 'Products', 
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
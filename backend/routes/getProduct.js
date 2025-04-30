const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../db/db.js');

router.post('/getProduct', async (req, res) => {
  const { productId, isAll } = req.body;
  console.log(productId,isAll)
  try {

    var query,values;
    if(isAll){
      query = 'SELECT products.product_id ,\
                      products.seller_id  ,\
                      products.name as name,\
                      products.description ,\
                      products.price,\
                      products.category_id,\
                      products.created_at,\
                      categories.name as C_name\
       FROM products JOIN categories ON products.category_id = categories.category_id\
       WHERE products.status = $1';
        values = ["available"];
    }
    else{
      query = 'SELECT * FROM products WHERE "product_id" = $1';
      values = [productId];
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
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../db/db.js');

router.post('/updateProduct', async (req, res) => {
  const { product,userId } = req.body;
  console.log(product,product.product_id,product.seller_id,userId);
  try {

    var query,values;
    
    query = 'UPDATE products \
                SET \
                name = $1,\
                description = $2,\
                price = $3, \
                category_id = $4 \
            WHERE \
                product_id = $5 AND seller_id = $6';
    values = [product.name, product.description, product.price, product.category_id, product.product_id, userId];

    pool.query(query, values)
      .then(result => {

        var products = [];

        for(var i=0;i<result.rows.length;i++){
          products.push(result.rows[i]);
        }

        console.log('Updated product:', result.rows);
        res.json({ message: 'Product updated', 
        "products" : products});
      })
      .catch(err => {   
        console.error('UnAuthorized access', err);
        // res.status(500).send('UnAuthorized access');
        res.json({ message: 'UnAuthorized access'});
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
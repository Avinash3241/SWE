const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../db/db.js');

router.post('/acceptRequest', async (req, res) => {
  const { buyer_id, productId, user_id , final_price } = req.body;
  console.log(buyer_id,productId,user_id)
  try {

    var query,values;

    var content = '';

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
          users.address,\
          sellers.name AS seller_name \
        FROM products\
        JOIN purchase_requests \
          ON products.product_id = purchase_requests.product_id\
        JOIN users \
          ON purchase_requests.buyer_id = users.user_id\
        JOIN users AS sellers \
          ON products.seller_id = sellers.user_id\
        WHERE products.product_id = $1 \
        AND products.seller_id = $2';
    values = [productId, user_id];

    const result = await pool.query(query, values);
    var products = [];
    for(var i=0;i<result.rows.length;i++){
      products.push(result.rows[i]);
    }
    console.log(products);
    // var product = products[0];

    var query2 = 'UPDATE products SET status = $1, price = $2 WHERE product_id = $3 AND seller_id = $4';

    var values2 = ["sold",final_price,productId, user_id];

    const result2 = await pool.query(query2,values2);
    console.log("Updated the product");
            
    for(var i=0;i<products.length;i++){

        var product = products[i];

        var status = (product.buyer_id == buyer_id) ? "accepted" : "declined";

        var mcontent = (product.buyer_id == buyer_id) ?
        'Seller named '+ product.seller_name +' sold this product named '+product.product_name+' to you, Final Price: '+final_price :
        'The product named '+product.product_name+' has been sold for another user.';

        var q = 'INSERT INTO notifications(user_id, content, is_read) VALUES ($1,$2,$3)';
        var v = [product.buyer_id,mcontent,false];

        // var query3 = 'INSERT INTO notifications(user_id, content, is_read) VALUES ($1,$2,$3)';

        // var content = 'The product named '+product.product_name+' has been sold for another user.'

        // var values3 = [product.buyer_id,content,false];

        try {
          const result3 = await pool.query(q, v);
          // res.json({ message: 'Product Deleted'});
          console.log("Inserted the notification into buyer "+product.buyer_id);

          var query4 = 'UPDATE purchase_requests SET status = $1, updated_at = NOW() WHERE product_id = $2 AND buyer_id = $3';
          var values4 = [status, productId, product.buyer_id];

          const result4 = await pool.query(query4, values4);
          console.log("Deleted the purchase requests record for buyer_id",product.buyer_id);
        } catch (err) {
          console.log(err.message);
          res.status(500).send('Deletion of request in purchase requests failed');
        }
    }

    // console.log('Product:', result.rows);

    res.json({ 
        message: 'Product Deleted', 
        message1 : 'Product has been deleted',
        message2 : 'Notification has been sent to the users',
        "products" : products});    

  } catch (err) {
    console.error('Server error', err);
    // res.status(500).send('Server Error');
    res.json({ message: 'Server error'});
  }
});

module.exports = router;
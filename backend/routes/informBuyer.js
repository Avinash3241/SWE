const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../db/db.js');

router.post('/informBuyer', async (req, res) => {
  const { productId, Product_name, user_id } = req.body;
  console.log(productId,user_id)
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
                users.address\
            FROM products\
            JOIN purchase_requests \
                ON products.product_id = purchase_requests.product_id\
            JOIN users \
                ON purchase_requests.buyer_id = users.user_id\
            WHERE products.product_id = $1 \
            AND products.seller_id = $2';
    values = [productId, user_id];

    pool.query(query, values)
      .then(result => {
        var products = [];
        for(var i=0;i<result.rows.length;i++){
          products.push(result.rows[i]);
        }
        var product = products[0];

        var query2 = 'UPDATE products SET status = $1 WHERE product_id = $2 AND seller_id = $3';

        var values2 = ["removed",productId, user_id];


        pool.query(query2,values2)
        .then(result2 => {
            console.log("Deleted the product");
            
            for(var i=0;i<products.length;i++){

                var product = products[i];

                var query3 = 'INSERT INTO notifications(user_id, content, is_read) VALUES ($1,$2,$3)';

                var content = 'The product named '+product.product_name+' has been deleted by the Seller.'

                var values3 = [product.buyer_id,content,false];

                pool.query(query3, values3)
                .then(result3 => {
                    // res.json({ message: 'Product Deleted'});
                    console.log("Inserted the notification into buyer "+product.buyer_id);

                    var query4 = 'UPDATE purchase_requests SET status = $1 WHERE product_id = $2 AND buyer_id = $3';
                    var values4 = ["declined",productId, product.buyer_id];

                    pool.query(query4, values4)
                    .then(result4 => {
                        console.log("Declined the purchase requests record for buyer_id",product.buyer_id);
            
                    })
                    .catch(err => {
                        console.log(err.message);
                        res.status(500).send('Deletion of request in purchase requests failed');
                    });


                })
                .catch(err => {
                    console.log(err.message);
                    res.status(500).send("Failed to send the notification to the Buyer");
                });
            }

        })
        .catch(err => {
            console.log(err.message);
            res.status(500).send("Deleting the product failed");
        });

        // console.log('Product:', result.rows);

        res.json({ 
            message: 'Product Deleted', 
            message1 : 'Product has been deleted',
            message2 : 'Notification has been sent to the users',
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
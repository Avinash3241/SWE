const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../db/db.js');

router.post('/rejectRequest', async (req, res) => {
  const {buyer_id, productId, productname, user_id } = req.body;
  console.log(buyer_id, productId, user_id)
  try {

    var query3 = 'INSERT INTO notifications(user_id, content, is_read) VALUES ($1,$2,$3)';

    var content = 'Your requested for this product named '+productname+' has been declined by the Seller.'

    var values3 = [buyer_id,content,false];

    pool.query(query3, values3)
    .then(result3 => {
        // res.json({ message: 'Product Deleted'});
        console.log("Inserted the notification into buyer "+buyer_id);

        var query4 = 'UPDATE purchase_requests SET status = $1 WHERE product_id = $2 AND buyer_id = $3';
        var values4 = ["declined",productId, buyer_id];

        pool.query(query4, values4)
        .then(result4 => {
            console.log("Deleted the purchase requests record for buyer_id",buyer_id);

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
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
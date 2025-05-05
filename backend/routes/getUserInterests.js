const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../db/db.js');

router.post('/getUserInterests', async (req, res) => {
  const { userId } = req.body;

  try {
    const query = 'SELECT \
                        categories.name, \
                        CASE \
                            WHEN interests.user_id IS NOT NULL THEN true \
                            ELSE false \
                        END AS is_interested \
                    FROM categories \
                    LEFT JOIN interests \
                        ON categories.category_id = interests.category_id \
                        AND interests.user_id = $1';
;
    const values = [userId];
    pool.query(query, values)
    .then(result => {
        console.log(result.rows);
        if (result.rows.length === 0) {
            console.log('No interests found');
            res.json({ message: 'No interests Found'});
        } 
        else{
            console.log('interests:', result.rows);
            res.json({ 
                message: 'interests Found',
                categories: result.rows
            });
        }
    })
    .catch(err => {   
        console.error('Error in server', err);
        res.status(500).send('Error in server');
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
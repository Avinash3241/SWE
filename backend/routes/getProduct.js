const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../db/db.js');

router.post('/getProduct', async (req, res) => {
  const { productId, isAll, userId } = req.body;
  console.log('Product ID:', productId, 'isAll:', isAll, 'User ID:', userId);

  try {
    let query, values;
    if (isAll) {
      query = 'SELECT \
      products.product_id,\
      products.seller_id,\
      products.name AS name,\
      products.description,\
      products.price,\
      products.category_id,\
      products.created_at,\
      categories.name AS C_name\
  FROM \
      products\
  JOIN \
      categories ON products.category_id = categories.category_id\
  LEFT JOIN \
      interests ON interests.category_id = products.category_id AND interests.user_id = $2\
  WHERE \
      products.status = $1 AND products.seller_id != $2\
  ORDER BY \
      interests.user_id IS NOT NULL DESC, \
      products.created_at DESC  ';
      values = ['available', userId];
    } else {
      query = `
        SELECT 
          products.*,
          categories.name AS category_name,
          users.name AS seller_name,
          users.email AS seller_email
        FROM products
        LEFT JOIN categories ON products.category_id = categories.category_id
        LEFT JOIN users ON products.seller_id = users.user_id
        WHERE products.product_id = $1
      `;
      values = [productId];
    }

    const result = await pool.query(query, values);
    console.log('Product Details:', result.rows);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    res.status(200).json({ products: result.rows });
  } catch (err) {
    console.error('Error fetching product:', err.message);
    res.status(500).json({ error: 'Failed to fetch product details.' });
  }
});
module.exports = router;
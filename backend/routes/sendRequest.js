const express = require('express');
const router = express.Router();
const pool = require('../db/db.js');

router.post('/sendRequest', async (req, res) => {
  const { buyer_id, product_id } = req.body;

  if (!buyer_id || !product_id) {
    return res.status(400).json({ error: 'Buyer ID and Product ID are required.' });
  }

  try {
    // Check if the request already exists
    const checkQuery = `
      SELECT * FROM purchase_requests
      WHERE buyer_id = $1 AND product_id = $2 AND status = 'pending'
    `;
    const checkResult = await pool.query(checkQuery, [buyer_id, product_id]);

    if (checkResult.rows.length > 0) {
      return res.status(400).json({ error: 'Purchase request already exists for this product.' });
    }

    // Insert the new purchase request
    const insertQuery = `
      INSERT INTO purchase_requests (buyer_id, product_id, status)
      VALUES ($1, $2, 'pending')
      RETURNING *
    `;
    const insertResult = await pool.query(insertQuery, [buyer_id, product_id]);

    res.status(201).json({
      message: 'Purchase request sent successfully.',
      request: insertResult.rows[0],
    });
  } catch (err) {
    console.error('Error sending purchase request:', err.message);
    res.status(500).json({ error: 'Failed to send purchase request.' });
  }
});

module.exports = router;
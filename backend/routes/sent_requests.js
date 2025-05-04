const express = require('express');
const router = express.Router();
const pool = require('../db/db.js');

router.get('/sent_requests', async (req, res) => {
  const { buyerId } = req.query;
  console.log('Received buyerId:', buyerId);
  if (!buyerId) {
    return res.status(400).json({ error: 'Buyer ID is required.' });
  }

  try {
    const query = `
      SELECT 
        pr.request_id,
        pr.product_id,
        pr.status,
        pr.created_at,
        p.name AS product_name,
        p.description AS product_description,
        p.price AS product_price,
        c.name AS category_name
      FROM purchase_requests pr
      JOIN products p ON pr.product_id = p.product_id
      LEFT JOIN categories c ON p.category_id = c.category_id
      WHERE pr.buyer_id = $1
      ORDER BY pr.created_at DESC
    `;
    const values = [buyerId];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      console.log('No sent requests found for buyerId:', buyerId);
      return res.status(404).json({ message: 'No sent requests found.' });
    }

    console.log('Sent Requests:', result.rows);
    res.status(200).json({
      message: 'Sent requests fetched successfully.',
      requests: result.rows,
    });
  } catch (err) {
    console.error('Error fetching sent requests:', err.message);
    res.status(500).json({ error: 'Failed to fetch sent requests.' });
  }
});

module.exports = router;
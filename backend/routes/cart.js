const express = require('express');
const router = express.Router();
const pool = require('../db/db.js');

// Fetch cart items for a specific user
router.post('/getCartItems', async (req, res) => {
  const { userId } = req.body;

  try {
    const query = `
      SELECT 
        c.cart_id, 
        c.product_id, 
        p.name AS product_name, 
        p.price, 
        p.description, 
        p.seller_id, 
        p.status AS product_status
      FROM carts c
      JOIN products p ON c.product_id = p.product_id
      WHERE c.buyer_id = $1
    `;

    console.log('Fetching cart items for user:', userId);
    const values = [userId];
    const result = await pool.query(query, values);
    res.json({ cartItems: result.rows });
  } catch (err) {
    console.error('Error fetching cart items:', err);
    res.status(500).send('Server Error');
  }
});

// Delete selected cart items
router.post('/deleteCartItems', async (req, res) => {
  const { cartIds } = req.body;

  try {
    const query = 'DELETE FROM carts WHERE cart_id = ANY($1::int[])';
    const values = [cartIds];
    await pool.query(query, values);
    res.json({ message: 'Selected items deleted successfully' });
  } catch (err) {
    console.error('Error deleting cart items:', err);
    res.status(500).send('Server Error');
  }
});

// Send requests to sellers and create notifications
router.post('/sendRequests', async (req, res) => {
  const { userId, cartItems } = req.body;

  try {
    const notificationPromises = cartItems.map(async (item) => {
      const query = `
        INSERT INTO notifications (user_id, content)
        VALUES ($1, $2)
      `;
      const values = [item.seller_id, `User ${userId} is interested in your product: ${item.product_name}`];
      return pool.query(query, values);
    });

    await Promise.all(notificationPromises);
    res.json({ message: 'Requests sent successfully' });
  } catch (err) {
    console.error('Error sending requests:', err);
    res.status(500).send('Server Error');
  }
});

router.post('/addToCart', async (req, res) => {
  const { buyer_id, product_id } = req.body;

  try {
    const query = `
      INSERT INTO carts (buyer_id, product_id)
      VALUES ($1, $2)
      ON CONFLICT DO NOTHING
    `;
    await pool.query(query, [buyer_id, product_id]);
    res.status(201).json({ message: 'Product added to cart successfully.' });
  } catch (err) {
    console.error('Error adding product to cart:', err.message);
    res.status(500).json({ error: 'Failed to add product to cart.' });
  }
});

module.exports = router;
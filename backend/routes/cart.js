const express = require('express');
const router = express.Router();
const pool = require('../db/db.js');

// Fetch cart items for a specific user
router.post('/getCartItems', async (req, res) => {
  const { buyerId } = req.body;

  if (!buyerId) {
    return res.status(400).json({ error: 'Buyer ID is required.' });
  }

  try {
    const query = `
      SELECT 
        c.cart_id,
        c.product_id,
        c.added_at,
        p.name AS product_name,
        p.description AS product_description,
        p.price AS product_price,
        p.category_id,
        p.status AS product_status
      FROM carts c
      JOIN products p ON c.product_id = p.product_id
      WHERE c.buyer_id = $1
    `;
    const result = await pool.query(query, [buyerId]);

    res.status(200).json({ cartItems: result.rows });
  } catch (err) {
    console.error('Error fetching cart items:', err.message);
    res.status(500).json({ error: 'Failed to fetch cart items.' });
  }
});

// Delete selected cart items
router.post('/deleteCartItems', async (req, res) => {
  const { buyerId, cartIds } = req.body;

  if (!buyerId || !cartIds || cartIds.length === 0) {
    return res.status(400).json({ error: 'Buyer ID and Cart IDs are required.' });
  }

  try {
    const query = `
      DELETE FROM carts
      WHERE buyer_id = $1 AND cart_id = ANY($2::int[])
    `;
    await pool.query(query, [buyerId, cartIds]);

    res.status(200).json({ message: 'Cart items deleted successfully.' });
  } catch (err) {
    console.error('Error deleting cart items:', err.message);
    res.status(500).json({ error: 'Failed to delete cart items.' });
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

  if (!buyer_id || !product_id) {
    return res.status(400).json({ error: 'Buyer ID and Product ID are required.' });
  }

  try {
    // Check if the product is already in the cart for this buyer
    const checkQuery = `
      SELECT * FROM carts
      WHERE buyer_id = $1 AND product_id = $2
    `;
    const checkResult = await pool.query(checkQuery, [buyer_id, product_id]);

    if (checkResult.rows.length > 0) {
      return res.status(400).json({ error: 'Product is already in the cart.' });
    }

    // Add the product to the cart
    const query = `
      INSERT INTO carts (buyer_id, product_id)
      VALUES ($1, $2)
      RETURNING *
    `;
    const result = await pool.query(query, [buyer_id, product_id]);

    res.status(201).json({ message: 'Product added to cart.', cartItem: result.rows[0] });
  } catch (err) {
    console.error('Error adding to cart:', err.message);
    res.status(500).json({ error: 'Failed to add product to cart.' });
  }
});

module.exports = router;
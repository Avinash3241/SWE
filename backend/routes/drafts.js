const express = require("express");
const pool = require("../db/db.js");
const router = express.Router();

// GET route to fetch all drafts for a seller
router.get("/drafts", async (req, res) => {
  const sellerId = req.query.sellerId;

  if (!sellerId) {
    return res.status(400).json({ error: "Seller ID is required." });
  }

  try {
    const query = `
      SELECT p.product_id, p.name, p.description, p.price, c.name AS category_name, pm.media_url
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.category_id
      LEFT JOIN product_media pm ON p.product_id = pm.product_id
      WHERE p.seller_id = $1 AND p.status = 'draft'
      ORDER BY p.created_at DESC
    `;
    const result = await pool.query(query, [sellerId]);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching drafts:", err);
    res.status(500).json({ error: "Failed to fetch drafts." });
  }
});

// DELETE route to remove a draft
router.delete("/drafts/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    const query = "DELETE FROM products WHERE product_id = $1 AND status = 'draft'";
    const result = await pool.query(query, [productId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Draft not found or already removed." });
    }

    res.status(200).json({ message: "Draft removed successfully." });
  } catch (err) {
    console.error("Error removing draft:", err);
    res.status(500).json({ error: "Failed to remove draft." });
  }
});

module.exports = router;
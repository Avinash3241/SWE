const express = require("express");
const pool = require("../db/db.js");
const path = require("path");
const router = express.Router();

// GET route to fetch all drafts for a seller
router.get("/drafts", async (req, res) => {
  const sellerId = req.query.sellerId;

  if (!sellerId) {
    return res.status(400).json({ error: "Seller ID is required." });
  }

  try {
    const query = `
      SELECT p.product_id, p.name, p.description, p.price, c.name AS category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.category_id
      WHERE p.seller_id = $1 AND p.status = 'draft'
      ORDER BY p.created_at DESC
    `;
    const result = await pool.query(query, [sellerId]);

    // Add the media URL for each draft
    const drafts = result.rows.map((draft) => {
      const mediaUrl = `/uploads/${draft.product_id}.png`;
      return {
        ...draft,
        media_url: mediaUrl,
      };
    });
    // const drafts = result.rows.map((draft) => {
    //   const imagePath = path.join(__dirname, "../../uploads", `${draft.product_id}.png`);
    //   const mediaUrl = `/uploads/${draft.product_id}.png`;
    //   return {
    //     ...draft,
    //     media_url: mediaUrl, // Add the media URL
    //   };
    // });

    res.status(200).json(drafts);
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

    // Remove the associated image file
    const imagePath = path.join(__dirname, "../../uploads", `${productId}.png`);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting product image:", err);
      }
    });

    res.status(200).json({ message: "Draft removed successfully." });
  } catch (err) {
    console.error("Error removing draft:", err);
    res.status(500).json({ error: "Failed to remove draft." });
  }
});

module.exports = router;
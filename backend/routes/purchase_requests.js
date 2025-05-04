const express = require("express");
const pool = require("../db/db.js");
const router = express.Router();

// GET route to fetch all purchase requests for a seller
router.get("/purchase_requests", async (req, res) => {
  const sellerId = req.query.sellerId;

  if (!sellerId) {
    return res.status(400).json({ error: "Seller ID is required." });
  }

  try {
    const query = `
      SELECT 
        pr.request_id,
        pr.product_id,
        pr.buyer_id,
        pr.status,
        pr.created_at,
        p.name AS product_name,
        p.description AS product_description,
        p.price AS product_price,
        u.name AS buyer_name,
        u.email AS buyer_email,
        u.contact_info AS buyer_contact,
        u.address AS buyer_address
      FROM purchase_requests pr
      JOIN products p ON pr.product_id = p.product_id
      JOIN users u ON pr.buyer_id = u.user_id
      WHERE p.seller_id = $1
      ORDER BY pr.created_at DESC
    `;
    const result = await pool.query(query, [sellerId]);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching purchase requests:", err.message);
    res.status(500).json({ error: "Failed to fetch purchase requests." });
  }
});

// PUT route to update the status of a purchase request
router.put("/purchase_requests/:requestId", async (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body;

  if (!["accepted", "declined"].includes(status)) {
    return res.status(400).json({ error: "Invalid status value." });
  }

  try {
    const query = `
      UPDATE purchase_requests
      SET status = $1
      WHERE request_id = $2
      RETURNING *
    `;
    const result = await pool.query(query, [status, requestId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Purchase request not found." });
    }

    res.status(200).json({ message: "Purchase request updated successfully.", request: result.rows[0] });
  } catch (err) {
    console.error("Error updating purchase request:", err.message);
    res.status(500).json({ error: "Failed to update purchase request." });
  }
});

module.exports = router;
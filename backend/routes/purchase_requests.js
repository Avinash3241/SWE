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
    // Update the status of the purchase request
    const updateRequestQuery = `
      UPDATE purchase_requests
      SET status = $1
      WHERE request_id = $2
      RETURNING product_id
    `;
    const requestResult = await pool.query(updateRequestQuery, [status, requestId]);

    // // Insert a notification for the buyer

    // const insertNotificationQuery = `
    //   INSERT INTO notifications (user_id, content, created_at)
    //   VALUES ($1, $2, NOW())
    // `;
    // const productQuery = `
    //   SELECT p.name AS product_name, u.name AS seller_name
    //   FROM products p
    //   JOIN users u ON p.seller_id = u.user_id
    //   WHERE p.product_id = $1
    // `;
    // const productResult = await pool.query(productQuery, [requestResult.rows[0].product_id]);
    // const productName = productResult.rows[0].product_name;
    // const sellerName = productResult.rows[0].seller_name;
    // const notificationContent = `Your request for "${productName}" has been accepted by the seller "${sellerName}".`;

    await pool.query(insertNotificationQuery, [requestResult.rows[0].buyer_id, notificationContent]);

    if (requestResult.rowCount === 0) {
      return res.status(404).json({ error: "Purchase request not found." });
    }

    const productId = requestResult.rows[0].product_id;

    // If the request is accepted, update the product's status to 'sold'
    if (status === "accepted") {
      const updateProductQuery = `
        UPDATE products
        SET status = 'sold'
        WHERE product_id = $1
      `;
      await pool.query(updateProductQuery, [productId]);

      // If the request is accepted, update the status of other purchase requests for the same product to 'declined'
      const updateOtherRequestsQuery = `
      UPDATE purchase_requests
      SET status = 'declined'
      WHERE product_id = $1 AND request_id != $2
    `;
    await pool.query(updateOtherRequestsQuery, [productId, requestId]);
    }
    

    res.status(200).json({ message: `Purchase request ${status} successfully.` });
  } catch (err) {
    console.error("Error updating purchase request:", err.message);
    res.status(500).json({ error: "Failed to update purchase request." });
  }
});

module.exports = router;

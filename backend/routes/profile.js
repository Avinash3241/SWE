const express = require("express");
const multer = require("multer");
const path = require("path");
const pool = require("../db/db.js");
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

const upload = multer({ storage });

// Route to get user profile data, bought history, and sold history
router.get("/profile", async (req, res) => {
  const userId = req.query.userId;

  try {
    // Fetch user profile details
    const userQuery = `
      SELECT name, email, profile_picture, contact_info, address 
      FROM users 
      WHERE user_id = $1
    `;
    const userResult = await pool.query(userQuery, [userId]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const userProfile = userResult.rows[0];

    // Fetch bought history
    const boughtQuery = `
      SELECT t.transaction_id, t.final_price, t.transaction_date, 
             p.name AS product_name, p.description AS product_description, 
             u.name AS seller_name, u.email AS seller_email
      FROM transactions t
      JOIN products p ON t.product_id = p.product_id
      JOIN users u ON t.seller_id = u.user_id
      WHERE t.buyer_id = $1
      ORDER BY t.transaction_date DESC
    `;
    const boughtResult = await pool.query(boughtQuery, [userId]);
    const boughtHistory = boughtResult.rows;

    // Fetch sold history
    const soldQuery = `
      SELECT t.transaction_id, t.final_price, t.transaction_date, 
             p.name AS product_name, p.description AS product_description, 
             u.name AS buyer_name, u.email AS buyer_email
      FROM transactions t
      JOIN products p ON t.product_id = p.product_id
      JOIN users u ON t.buyer_id = u.user_id
      WHERE t.seller_id = $1
      ORDER BY t.transaction_date DESC
    `;
    const soldResult = await pool.query(soldQuery, [userId]);
    const soldHistory = soldResult.rows;

    // Combine all data into a single response
    res.status(200).json({
      profile: userProfile,
      boughtHistory,
      soldHistory,
    });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ error: "Error fetching profile" });
  }
});

// Route to update user profile data and upload profile picture
router.put("/profile", upload.single("profile_picture"), async (req, res) => {
  const userId = req.body.userId;
  const { contact_info, address } = req.body;
  const profilePicture = req.file ? req.file.filename : null;

  try {
    const updateQuery = `
      UPDATE users
      SET 
        contact_info = COALESCE($1, contact_info),
        address = COALESCE($2, address),
        profile_picture = COALESCE($3, profile_picture)
      WHERE user_id = $4
      RETURNING user_id
    `;

    const result = await pool.query(updateQuery, [
      contact_info,
      address,
      profilePicture,
      userId,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ error: "Error updating profile" });
  }
});

module.exports = router;
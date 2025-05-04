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
router.put("/", async (req, res) => {
  const { userId, contact_info, address, profile_picture } = req.body;
  console.log("Received data:", req.body);
  try {
    const updateQuery = `
      UPDATE users
      SET 
        contact_info = $1,
        address = $2,
        profile_picture = $3
      WHERE user_id = $4
      RETURNING profile_picture
    `;

    const result = await pool.query(updateQuery, [
      contact_info,
      address,
      profile_picture, // This should be null if the user wants to remove the picture
      userId,
    ]);
    console.log("Profile picture updated:", result.rows);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", profile_picture: result.rows[0].profile_picture });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ error: "Error updating profile" });
  }
});

module.exports = router;
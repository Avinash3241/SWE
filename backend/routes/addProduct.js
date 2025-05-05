const express = require("express");
const pool = require("../db/db.js");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../../frontend/public/uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); // Create the uploads folder if it doesn't exist
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Temporary filename
  },
});
const upload = multer({ storage });

// POST route to add or update a product
router.post("/addProduct", upload.single("product_image"), async (req, res) => {
  const { product_id, name, description, price, category, seller_id, status } = req.body;

  try {
    // Validate the price field
    if (!price || isNaN(price) || parseFloat(price) <= 0) {
      return res.status(400).json({ error: "Invalid price. Please provide a valid numeric value greater than 0." });
    }

    let productId;

    if (product_id) {
      // Update the existing product
      const updateQuery = `
        UPDATE products
        SET name = $1, description = $2, price = $3, category_id = $4, status = $5
        WHERE product_id = $6
      `;
      await pool.query(updateQuery, [name, description, price, category, status, product_id]);
      productId = product_id;
    } else {
      // Insert a new product
      const insertQuery = `
        INSERT INTO products (seller_id, name, description, price, category_id, status)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING product_id
      `;
      console.log(category);
      const result = await pool.query(insertQuery, [seller_id, name, description, price, category, status]); 
      productId = result.rows[0].product_id;
    }

    // Save the uploaded image as product_id.png
    if (req.file) {
      console.log(path.__dirname);
      const tempPath = path.join(__dirname, "../../frontend/public/uploads", req.file.filename);
      const targetPath = path.join(__dirname, "../../frontend/public/uploads", `${productId}.png`);

      fs.rename(tempPath, targetPath, (err) => {
        if (err) {
          console.error("Error saving product image:", err);
          return res.status(500).json({ error: "Failed to save product image" });
        }
        console.log(`Image saved as ${productId}.png`);
      });
    }

    res.status(201).json({
      message: status === "draft" ? "Product saved as draft" : "Product listed successfully",
      product_id: productId,
    });
  } catch (err) {
    console.error("Error saving product:", err);
    res.status(500).json({ error: "Failed to save product" });
  }
});

module.exports = router;
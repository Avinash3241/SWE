const express = require("express");
const pool = require("../db/db.js");
const router = express.Router();

// POST route to add or update a product
router.post("/addProduct", async (req, res) => {
  const { product_id, name, description, price, category, mediaType, mediaUrl, seller_id, status } = req.body;

  // console.log("Received product data:", req.body);

  // Validate required fields only if status is "available"
  if (status === "available") {
    if (!seller_id || !name || !description || !price || !category || !mediaUrl) {
      return res.status(400).json({ error: "Please fill in all required fields." });
    }
  }

  try {
    if (product_id) {
      // Update the existing draft
      const updateDraftQuery = `
        UPDATE products
        SET name = $1, description = $2, price = $3, category_id = $4, status = $5, created_at = $6
        WHERE product_id = $7
      `;
      await pool.query(updateDraftQuery, [
        name || "N/A",
        description || "N/A",
        price || 0,
        category || null,
        status || "draft",
        new Date(),
        product_id,
      ]);

      // Update media if provided
      if (mediaUrl) {
        const existingMediaQuery = `
          SELECT media_id FROM product_media WHERE product_id = $1
        `;
        const existingMediaResult = await pool.query(existingMediaQuery, [product_id]);

        if (existingMediaResult.rows.length > 0) {
          // Update existing media
          const updateMediaQuery = `
            UPDATE product_media
            SET media_url = $1, media_type = $2
            WHERE product_id = $3
          `;
          await pool.query(updateMediaQuery, [mediaUrl, mediaType, product_id]);
        } else {
          // Insert new media
          const insertMediaQuery = `
            INSERT INTO product_media (product_id, media_url, media_type)
            VALUES ($1, $2, $3)
          `;
          await pool.query(insertMediaQuery, [product_id, mediaUrl, mediaType]);
        }
      }

      return res.status(200).json({ message: "Draft updated successfully" });
    }

    // Insert a new product if no product_id is provided
    const productQuery = `
      INSERT INTO products (seller_id, name, description, price, category_id, status, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING product_id
    `;

    const productResult = await pool.query(productQuery, [
      seller_id,
      name || "N/A", // Default to "N/A" if not provided
      description || "N/A", // Default to "N/A" if not provided
      price || 0, // Default to 0 if not provided
      category || null, // Default to null if not provided
      status || "draft", // Default to "draft" if not provided
      new Date(),
    ]);

    const productId = productResult.rows[0].product_id;

    // Insert media URL into product_media table if provided
    if (mediaUrl) {
      const mediaQuery = `
        INSERT INTO product_media (product_id, media_url, media_type)
        VALUES ($1, $2, $3)
      `;
      await pool.query(mediaQuery, [productId, mediaUrl, mediaType]);
    }

    res.status(201).json({
      message: status === "draft" ? "Product saved as draft" : "Product listed successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save product" });
  }
});

module.exports = router;
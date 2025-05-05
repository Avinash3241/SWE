const express = require('express');
const db = require('../db/db.js');

const router = express.Router();

router.post('/updateUserInterests', async (req, res) => {
    let { userId, selectedCategories } = req.body;

    // Ensure userId is a number
    userId = parseInt(userId);
    if (!userId || !Array.isArray(selectedCategories)) {
        return res.status(400).json({ error: 'Invalid input data' });
    }

    try {
        // Start a transaction
        await db.query('BEGIN');

        // Use a single query to delete and insert new interests
        const query = `
            WITH category_ids AS (
                SELECT category_id 
                FROM categories 
                WHERE name = ANY($1)
            ),
            deleted AS (
                DELETE FROM interests 
                WHERE user_id = $2
            )
            INSERT INTO interests (category_id, user_id)
            SELECT category_id, $2 
            FROM category_ids
        `;

        await db.query(query, [selectedCategories, userId]);

        // Commit the transaction
        await db.query('COMMIT');

        res.status(200).json({ message: 'User interests updated successfully' });
    } catch (error) {
        // Rollback the transaction in case of an error
        await db.query('ROLLBACK');
        console.error('Error updating user interests:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;

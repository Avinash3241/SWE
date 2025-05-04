// backend/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'db',
  password: '1234',
  port: 5432, // Default PostgreSQL port
});

// pool.connect()
//   .then(client => {
//     return client.query('SELECT * from users')
//       .then(result => {
//         console.log('Database connected',result.rows[0]);
//         client.release();
//       })
//       .catch(err => {
//         client.release();
//         console.error('Query failed:', err.stack);
//       });
//   })
//   .catch(err => {
//     console.error('Database connection failed:', err.stack);
//   });

module.exports = pool;

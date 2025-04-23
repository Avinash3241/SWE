// backend/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'my_db',
  password: 'mypassword',
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

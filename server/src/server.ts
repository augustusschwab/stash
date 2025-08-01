import express from 'express';
import { pool } from './config/connection.js';

const app = express();
const port = 3000;

app.get('/api/transactions', async(_req, res) => {
   try {
    const transactions = await pool.query('SELECT * FROM transactions');
    res.json(transactions.rows);
   } catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Database connection failed.')
   }
});

app.listen(port, () => {
    console.log(`The server is listening on port ${port}`)
})

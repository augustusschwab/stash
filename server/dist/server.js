import express from 'express';
import { pool } from './config/connection.js';
import multer from 'multer';
import { parse } from 'fast-csv';
import { Readable } from 'stream';
import { formattedDates, amount, description } from './utils/clean-data.js';
const app = express();
const port = 3000;
app.get('/api/transactions', async (_req, res) => {
    try {
        const transactions = await pool.query('SELECT * FROM transactions');
        res.json(transactions.rows);
    }
    catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Database connection failed.');
    }
});
//Multer Storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.post('/api/upload', upload.array('files'), async function (req, res) {
    const cleanedData = [];
    const files = req.files;
    try {
        for (const file of files) {
            await new Promise((resolve, reject) => {
                const bufferStream = Readable.from(file.buffer);
                bufferStream
                    .pipe(parse({ headers: true, ignoreEmpty: true }))
                    .on('data', (row) => {
                    try {
                        //console.log('Parsed row:', row);
                        let date = formattedDates(row);
                        //console.log(`Formatted Date: ${date}`);
                        let amt = amount(row);
                        //console.log(`This is the transaction amount: ${amt}`);
                        let desc = description(row);
                        //console.log(`The description is: ${desc}`);
                        cleanedData.push({
                            date,
                            description: desc,
                            category: '',
                            account: '',
                            amount: amt,
                            verified: false,
                        });
                    }
                    catch (e) {
                        console.log('Bad row.', e);
                    }
                })
                    .on('error', reject)
                    .on('end', resolve);
            });
        }
        return res.json({ rows: cleanedData });
        //res.send('CSV parsed.');
    }
    catch (err) {
        console.error('Parse error:', err);
        return res.status(500).json({ error: 'Failed to parse upload' });
    }
});
app.listen(port, () => {
    console.log(`The server is listening on port ${port}`);
});

import express from 'express';
import { pool } from './config/connection.js';
import multer from 'multer';
import { parse } from 'fast-csv';
import { Readable } from 'stream';
import { formattedDates } from './utils/clean-data.js';

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

//Multer Storage
const storage = multer.memoryStorage();
const upload = multer({storage: storage});


app.post('/api/upload', upload.array('files'), function(req, res){
    const files = req.files as Express.Multer.File[];

    for (const file of files){
        const bufferStream = Readable.from(file.buffer);
        
        bufferStream
            .pipe(parse({headers: true}))
            .on('data', (row) => {
                console.log('Parsed row:', row);
                formattedDates(row);
                

            })
            .on('end', () => {
                console.log('Parse complete.');
            });
    }

    res.send('CSV parsed.');
} )

app.listen(port, () => {
    console.log(`The server is listening on port ${port}`)
})

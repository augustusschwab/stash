import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from a .env file into process.env

export const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
});
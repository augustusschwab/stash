-- DROP DATABASE
DROP DATABASE IF EXISTS stash_transactions_db;

-- CREATE DATABASE
CREATE DATABASE stash_transactions_db;

-- CONNECT TO DATABASE
\c stash_transactions_db;

-- CREATE A TABLE
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    description TEXT NOT NULL,
    type TEXT NOT NULL,
    account TEXT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT false
);
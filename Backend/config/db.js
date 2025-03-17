

/*
db.js is a database configuration file which handles connections to database
*/


import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

// Create a new PostgreSQL connection pool using environment variables for configuration.
// This pool will manage and reuse client connections to the PostgreSQL database,
// ensuring efficient database operations within the app.

console.log(
    process.env.POSTGRES_USER,
    process.env.POSTGRES_HOST,
   String(process.env.POSTGRES_DATABASE),
    String(process.env.POSTGRES_PASSWORD),
    Number(process.env.POSTGRES_PORT)
    ,"values are as above"
)

export const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: String(process.env.POSTGRES_DATABASE),
    password: String(process.env.POSTGRES_PASSWORD),
    port: Number(process.env.POSTGRES_PORT)
});


/**
 * ConnectDB(): 
 * Connects to the PostgreSQL database using the connection pool.
 * If the connection is successful, it logs a confirmation message.
 * If an error occurs during connection, it logs the error details.
 */
export const connectDB = async () => {
    try {
        await pool.connect();
        console.log('Connected to the database');

    } catch (error) {
        console.error('Error connecting to the database', error);
    }
}

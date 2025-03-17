

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

const connectionString = process.env.POSTGRES_URL
const caCert = process.env.SUPABASE_CA_CERT && process.env.SUPABASE_CA_CERT.replace(/\\n/g, '\n');

export const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false, 
  },
});

console.log(pool,"pool is ")
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

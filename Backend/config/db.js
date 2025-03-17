

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
    process.env.POSTGRES_HOST
    ,"values are as above",
    "POSTGRESQL connection String", process.env.POSTGRES_URL
)
const connectionString = 
(process.env.POSTGRES_URL) ||
`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DATABASE}`;

export const pool = new Pool({connectionString});

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

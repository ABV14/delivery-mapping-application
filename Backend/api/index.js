import serverless from 'serverless-http';
import app from '../index.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); 

let allowedOrigins = [];
if (process.env.ALLOWED_ORIGINS) {
  try {
    allowedOrigins = JSON.parse(process.env.ALLOWED_ORIGINS);
  } catch (error) {
    allowedOrigins = process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim());
  }
} else {
  allowedOrigins = [];
}
console.log('Allowed origins:', allowedOrigins);

app.use(cors({
  origin: (origin, callback) => {
    console.log("origigigi", origin)
    // If no origin is provided (like in some server-to-server requests), allow it
    if (!origin) return callback(null, true);

    // If the origin is in the allowedOrigins array, allow it
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  }
}));

export default serverless(app);

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import distanceRoute from './routes/distanceRoute.js';
import historyRoute from './routes/historyRoute.js';
import { connectDB } from './config/db.js';

dotenv.config(); // Load .env file into process.env

const app = express();

let allowedOrigins = [];
if (process.env.ALLOWED_ORIGINS) {
  try {
    // Try to parse the env variable as JSON, e.g. '["https://delivery-mapping-application-abv.vercel.app","http://localhost:5174/"]'
    allowedOrigins = JSON.parse(process.env.ALLOWED_ORIGINS);
  } catch (error) {
    // Fallback: split by comma and trim spaces if JSON parsing fails
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



app.use(express.json());
app.use(express.static('public'))


app.use('/distance', distanceRoute); // To use distance route for distance calculation
app.use('/history', historyRoute); // To retrive history of distance calculation for previous queries
connectDB(); // Connect to the database

app.get('/', (req, res) => {
  app.use(express.static('public'))
    res.send('Backend Started Running!!!!');
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
}
);

export default app;

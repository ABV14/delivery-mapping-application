import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import distanceRoute from './routes/distanceRoute.js';
import historyRoute from './routes/historyRoute.js';
import { connectDB } from './config/db.js';

dotenv.config(); // Load .env file into process.env
connectDB(); // Connect to the database

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : [];
console.log('Allowed origins:', allowedOrigins);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like curl or Postman) if desired:
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));



app.use(express.json());


app.use('/distance', distanceRoute); // To use distance route for distance calculation
app.use('/history', historyRoute); // To retrive history of distance calculation for previous queries
app.get('/', (req, res) => {
    res.send('Backend Started Running!!!!');
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
}
);

export default app;

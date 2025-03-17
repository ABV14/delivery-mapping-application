import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import distanceRoute from './routes/distanceRoute.js';
import historyRoute from './routes/historyRoute.js';
import { connectDB } from './config/db.js';

dotenv.config(); // Load .env file into process.env

const app = express();

console.log('Allowed origins:', process.env.ALLOWED_ORIGINS);

app.use(cors({
  origin: (origin, callback) => {
    console.log("origin", origin)
    // If no origin is provided (like in some server-to-server requests),
    //  allow it - Only for Local Developmet!!!!!
    if (!origin) return callback(null, true);

    // If the origin is in the allowedOrigins array, allow it
    if (process.env.ALLOWED_ORIGINS.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  }
}));



app.use(express.json());
app.use(express.static('public'))

app.get('/', (req, res) => {
  app.use(express.static('public'))
    res.send('Backend Started Running!!!!');
});

app.use('/distance', distanceRoute); // To use distance route for distance calculation
app.use('/history', historyRoute); // To retrive history of distance calculation for previous queries
await connectDB(); // Connect to the database

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
}
);

export default app;
